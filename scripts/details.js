import { getLaunchObjectByID } from "./data/upcomingLaunches.js";
import { calculateTimeDifference, padNumber } from "./util/localTimeConverter.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

(async ()=>{
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');

  let launchObject = getLaunchObjectByID(id);

  const date = dayjs(launchObject.net);

  const initialTimeDiff = calculateTimeDifference(date);

  console.log(launchObject);

  const rocket = await fetchRocket(launchObject.rocket.configuration.url);

  console.log(launchObject.rocket.configuration.url);

  console.log(rocket);

  const detailsHTML= ` 
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
        <div class="label">HOUR</div>
      </div>
      <div class="time-box minutes">
        <div class="value">${padNumber(initialTimeDiff.minutes)}</div>
        <div class="label">MINUTE</div>
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
    <div class="provider-container">
    <div class="provider-image-container">
      <a href="${launchObject.mission.agencies[0].info_url}"><img src="${launchObject.mission.agencies[0].logo_url}"></a>
    </div>
    <div class="name">${launchObject.mission.agencies[0].name}</div>
    <div class="admin">${launchObject.mission.agencies[0].administrator}</div>
    <div class="code">${launchObject.mission.agencies[0].country_code}</div>
    <div class="description">
      <div>${launchObject.mission.agencies[0].description}</div>
    </div>
    <div class="successful-fail-container">
      <div class="successful">Successful Launches: <span>${launchObject.mission.agencies[0].successful_launches}</span></div>
      <div class="failed">Failed Launches: <span>${launchObject.mission.agencies[0].failed_launches}</span></div>
    </div>
    </div>
    <div class="rocket-details-container">
    <div class="rocket-image-container"><img src="${rocket.image_url}"></div>
    <div class="rocket-stats-container">
      <div class="name">${rocket.name}</div>
      <div class="upper-stats-container">
        <div class="left-container">
          <div class="family">
            <div class="left">Family</div>
            <div class="right">${rocket.family}</div>
          </div>
          <div class="variant">
            <div class="left">Variant</div>
            <div class="right">${rocket.variant}</div>
          </div>
          <div class="maiden-flight">
            <div class="left">Maiden Flight</div>
            <div class="right">${rocket.maiden_flight}</div>
          </div>
          
        </div>
        <div class="right-container">
          <div class="launch-mass">
            <div class="left">Launch Mass</div>
            <div class="right">${rocket.launch_mass.toString()+"000 kg"}</div>
          </div>
          <div class="launch-cost">
            <div class="left">Launch Cost</div>
            <div class="right">$${rocket.launch_cost}</div>
          </div>
          <div class="thrust">
            <div class="left">Thrust</div>
            <div class="right">${rocket.to_thrust}N</div>
          </div>
        </div>
      </div>
      <div class="lower-stats-container">
        <div class="left-container">
          <div class="max-stage">
            <div class="left">Max Stage</div>
            <div class="right">${rocket.max_stage}</div>
          </div>
          <div class="length">
            <div class="left">Length</div>
            <div class="right">${rocket.length}</div>
          </div>
          <div class="diameter">
            <div class="left">Diameter</div>
            <div class="right">${rocket.diameter}m</div>
          </div>
        </div>
        <div class="right-container">
          <div class="leo-capacity">
            <div class="left">LEO Capacity</div>
            <div class="right">${rocket.leo_capacity}kg</div>
          </div>
          <div class="gto-capacity">
            <div class="left">GTO Capacity</div>
            <div class="right">${rocket.gto_capacity}kg</div>
          </div>
          <div class="apogee">
            <div class="left">Apogee</div>
            <div class="${rocket.apogee? rocket.apogee+'km':''}"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  `

  document.querySelector('.details-container').innerHTML = detailsHTML;

   // Update the countdown timer every second
   setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const targetDate = dayjs(launchObject.net);
    const timeDiff = calculateTimeDifference(targetDate);
    
    document.querySelector('.time-box.days .value').textContent = padNumber(timeDiff.days);
    document.querySelector('.time-box.hours .value').textContent = padNumber(timeDiff.hours);
    document.querySelector('.time-box.minutes .value').textContent = padNumber(timeDiff.minutes);
    document.querySelector('.time-box.seconds .value').textContent = padNumber(timeDiff.seconds);
  }

  async function fetchRocket(url){
    const response = await fetch(url);
    const json = await response.json();
    return json;
  };


})();
  