import { getLaunchObjectByID } from "./data/upcomingLaunches.js";
import { calculateTimeDifference, padNumber } from "./util/localTimeConverter.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

(async () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');

  let launchObject = getLaunchObjectByID(id);

  const date = dayjs(launchObject.net);

  const initialTimeDiff = calculateTimeDifference(date);

  console.log(launchObject);

  const rocket = await fetchRocket(launchObject.rocket.configuration.url);

  console.log(launchObject.rocket.configuration.url);

  console.log(rocket);

  const agency = launchObject.mission.agencies[0];
  let providerContainerHTML = '';

  if (agency) {
    const agencyInfoUrl = agency.info_url ?? '';
    const agencyLogoUrl = agency.logo_url ?? '';

    providerContainerHTML = `
      <div class="provider-container">
        <div class="provider-image-container">
          ${agencyInfoUrl ? `<a href="${agencyInfoUrl}"><img src="${agencyLogoUrl}"></a>` : ''}
        </div>
        <div class="name">${agency.name ?? ''}</div>
        <div class="admin">${agency.administrator ?? ''}</div>
        <div class="code">${agency.country_code ?? ''}</div>
        <div class="description">
          <div>${agency.description ?? ''}</div>
        </div>
        <div class="successful-fail-container">
          <div class="successful">Successful Launches: <span>${agency.successful_launches ?? ''}</span></div>
          <div class="failed">Failed Launches: <span>${agency.failed_launches ?? ''}</span></div>
        </div>
      </div>
    `;
  }

  const detailsHTML = `
    <div class="image-container">
      <img src="${launchObject.image}">
    </div>
    <div class="details">
      <div class="rocket-name">${launchObject.name}</div>
      <div class="timer">
        <div class="time-box days">
          <div class="value">${padNumber(initialTimeDiff.days)}</div>
          <div class="label">DAYS</div>
        </div>
        <div class="time-box hours">
          <div class="value">${padNumber(initialTimeDiff.hours)}</div>
          <div class="label">HOURS</div>
        </div>
        <div class="time-box minutes">
          <div class="value">${padNumber(initialTimeDiff.minutes)}</div>
          <div class="label">MINUTES</div>
        </div>
        <div class="time-box seconds">
          <div class="value">${padNumber(initialTimeDiff.seconds)}</div>
          <div class="label">SECONDS</div>
        </div>
      </div>
      <div class="c-code">${launchObject.pad.country_code}</div>
      <div class="name">${launchObject.pad.location.name}</div>
      <div class="date-time">${date}</div>
      <div class="mission"></div>
    </div>
    ${providerContainerHTML}
    <div class="rocket-details-container">
      <div class="rocket-image-container"><img src="${rocket.image_url ?? ''}"></div>
      <div class="rocket-stats-container">
        <div class="name">${checkNullAndReturn(rocket.name)}</div>
        <div class="upper-stats-container">
          <div class="left-container">
            <div class="family">
              <div class="left">Family</div>
              <div class="right">${checkNullAndReturn(rocket.family)}</div>
            </div>
            <div class="variant">
              <div class="left">Variant</div>
              <div class="right">${checkNullAndReturn(rocket.variant)}</div>
            </div>
            <div class="maiden-flight">
              <div class="left">Maiden Flight</div>
              <div class="right">${checkNullAndReturn(rocket.maiden_flight)}</div>
            </div>
          </div>
          <div class="right-container">
            <div class="launch-mass">
              <div class="left">Launch Mass</div>
              <div class="right">${checkNullAndReturn(rocket.launch_mass, 'kg')}</div>
            </div>
            <div class="launch-cost">
              <div class="left">Launch Cost</div>
              <div class="right">$${checkNullAndReturn(rocket.launch_cost)}</div>
            </div>
            <div class="thrust">
              <div class="left">Thrust</div>
              <div class="right">${checkNullAndReturn(rocket.to_thrust, 'N')}</div>
            </div>
          </div>
        </div>
        <div class="lower-stats-container">
          <div class="left-container">
            <div class="max-stage">
              <div class="left">Max Stage</div>
              <div class="right">${checkNullAndReturn(rocket.max_stage)}</div>
            </div>
            <div class="length">
              <div class="left">Length</div>
              <div class="right">${checkNullAndReturn(rocket.length, 'm')}</div>
            </div>
            <div class="diameter">
              <div class="left">Diameter</div>
              <div class="right">${checkNullAndReturn(rocket.diameter, 'm')}</div>
            </div>
          </div>
          <div class="right-container">
            <div class="leo-capacity">
              <div class="left">LEO Capacity</div>
              <div class="right">${checkNullAndReturn(rocket.leo_capacity, 'kg')}</div>
            </div>
            <div class="gto-capacity">
              <div class="left">GTO Capacity</div>
              <div class="right">${checkNullAndReturn(rocket.gto_capacity, 'kg')}</div>
            </div>
            <div class="apogee">
              <div class="left">Apogee</div>
              <div class="right">${checkNullAndReturn(rocket.apogee, 'km')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('.details-container').innerHTML = detailsHTML;

  // Update the countdown timer every second
  setInterval(updateCountdown, 1000);
  function updateCountdown() {
    const targetDate = dayjs(launchObject.net);
    const timeDiff = calculateTimeDifference(targetDate);

    if (timeDiff.days <= 0 && timeDiff.hours <= 0 && timeDiff.minutes <= 0 && timeDiff.seconds <= 0) {
      document.querySelector('.time-box.days .value').textContent = "-";
      document.querySelector('.time-box.hours .value').textContent = "-";
      document.querySelector('.time-box.minutes .value').textContent = "-";
      document.querySelector('.time-box.seconds .value').textContent = "-";
    } else {
      document.querySelector('.time-box.days .value').textContent = padNumber(timeDiff.days);
      document.querySelector('.time-box.hours .value').textContent = padNumber(timeDiff.hours);
      document.querySelector('.time-box.minutes .value').textContent = padNumber(timeDiff.minutes);
      document.querySelector('.time-box.seconds .value').textContent = padNumber(timeDiff.seconds);
    }
  }

  async function fetchRocket(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  };

  function checkNullAndReturn(value, unit) {
    if (unit) {
      return value ? value + unit : '';
    } else {
      return value ? value : '';
    }
  };

})();
