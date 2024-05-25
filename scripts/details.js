import { getLaunchObjectByID } from "./data/upcomingLaunches.js";
import { calculateTimeDifference, padNumber } from "./util/localTimeConverter.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  let launchObject = getLaunchObjectByID(id);

  console.log(launchObject);
  const date = dayjs(launchObject.net);
  console.log(date.day());

  function updateCountdown() {
    const targetDate = dayjs(launchObject.net);
    const timeDiff = calculateTimeDifference(targetDate);
    
    document.querySelector('.time-box.days .value').textContent = padNumber(timeDiff.days);
    document.querySelector('.time-box.hours .value').textContent = padNumber(timeDiff.hours);
    document.querySelector('.time-box.minutes .value').textContent = padNumber(timeDiff.minutes);
    document.querySelector('.time-box.seconds .value').textContent = padNumber(timeDiff.seconds);
  }

  const initialTimeDiff = calculateTimeDifference(date);
  
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
      <div class="c-code">CHN</div>
      <div class="name">Space Launch Complex 4E</div>
    <div class="date-time">May 22, 2024 - 16:00 PST</div>
    <div class="mission"></div>

    </div>
    <div class="provider-container">
    <div class="provider-image-container">
      <a href="http://www.spacex.com/"><img src="images/spacex.png"></a>
    </div>
    <div class="name">SpaceX</div>
    <div class="admin">Elon Musk</div>
    <div class="code">USA</div>
    <div class="description">
      <div>Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX operates from many pads, on the East Coast of the US they operate from SLC-40 at Cape Canaveral Space Force Station and historic LC-39A at Kennedy Space Center. They also operate from SLC-4E at Vandenberg Space Force Base, California, usually for polar launches. Another launch site is being developed at Boca Chica, Texas.</div>
    </div>
    <div class="successful-fail-container">
      <div class="successful">Successful Launches: <span>320</span></div>
      <div class="failed">Failed Launches: <span>0</span></div>
    </div>
    </div>
    <div class="rocket-details-container">
    <div class="rocket-image-container"><img src="images/falcon9.jpeg"></div>
    <div class="rocket-stats-container">
      <div class="name">Falcon 9 Block 5</div>
      <div class="upper-stats-container">
        <div class="left-container">
          <div class="family">
            <div class="left">Family</div>
            <div class="right">Falcon 9</div>
          </div>
          <div class="variant">
            <div class="left">Variant</div>
            <div class="right">Group 5</div>
          </div>
          <div class="maiden-flight">
            <div class="left">Maiden Flight</div>
            <div class="right">2017-05-25</div>
          </div>
          
        </div>
        <div class="right-container">
          <div class="launch-mass">
            <div class="left">Launch Mass</div>
            <div class="right">1000kg</div>
          </div>
          <div class="launch-cost">
            <div class="left">Launch Cost</div>
            <div class="right">9B$</div>
          </div>
          <div class="thrust">
            <div class="left">Thrust</div>
            <div class="right">162</div>
          </div>
        </div>
      </div>
      <div class="lower-stats-container">
        <div class="left-container">
          <div class="max-stage">
            <div class="left">Max Stage</div>
            <div class="right">3</div>
          </div>
          <div class="length">
            <div class="left">Length</div>
            <div class="right">18.0</div>
          </div>
          <div class="diameter">
            <div class="left">Diameter</div>
            <div class="right">1.2</div>
          </div>
        </div>
        <div class="right-container">
          <div class="leo-capacity">
            <div class="left">LEO Capacity</div>
            <div class="right">300</div>
          </div>
          <div class="gto-capacity">
            <div class="left">GTO Capacity</div>
            <div class="right"></div>
          </div>
          <div class="apogee">
            <div class="left">Apogee</div>
            <div class="right"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  `

  document.querySelector('.details-container').innerHTML = detailsHTML;

  // Update the countdown timer every second
  setInterval(updateCountdown, 1000);

