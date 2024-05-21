import { getUpcomingLaunches } from "./data/upcomingLaunches.js";
import { formatTime } from "./util/localTimeConverter.js";

(async ()=>{
  const upcomingLaunches = await getUpcomingLaunches();

  console.log(upcomingLaunches);

  let launchListHTML =``;

  upcomingLaunches.forEach((upcomingLaunch)=>{
  
    const [rocketName, groupName] = upcomingLaunch.name.split(' | ');
    const [date, time] = formatTime(upcomingLaunch.window_start);

    launchListHTML+=`
    <div class="launch-outer-container">
      <div class="floating-dot"></div>
      <div class="floating-details-container">
        <div class="date">${date}</div>
        <div class="time">${time}</div>
      </div>
      <div class="launch-container">
        <div class="rocket-name">${rocketName}</div>
        <div class="group">${groupName}</div>
        <div class="details-container">
          <div class="details">Details</div>
          <img src="images/right-arrow.svg">
        </div>
      
      </div>
    </div>
    `
  });

  document.querySelector('.js-launch-list-container').innerHTML=launchListHTML;

})();