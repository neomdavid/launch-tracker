import { getUpcomingLaunches } from "./data/upcomingLaunches.js";
import { formatTime } from "./util/localTimeConverter.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let upcoming = true;
async function renderLauncherPage() {
  const upcomingLaunches = await getUpcomingLaunches();

  console.log(upcomingLaunches);

  let launchListHTML =``;


  upcomingLaunches.forEach((upcomingLaunch)=>{
  
    const [rocketName, groupName] = upcomingLaunch.name.split(' | ');
    const [date, time] = formatTime(upcomingLaunch.net);
    console.log(upcomingLaunch.name);
    
   const upcomingLaunchDate = dayjs(upcomingLaunch.net);
   const now = dayjs();

   if(upcoming){
    if(upcomingLaunchDate.isAfter(now)){
      launchListHTML+=`
      <div class="launch-outer-container">
        <div class="floating-dot"></div>
        <div class="floating-details-container">
          <div class="date">${date}</div>
          <div class="time">${time}</div>
        </div>
        <a href="details.html?id=${upcomingLaunch.id}"><div class="launch-container">
          <div class="rocket-name">${rocketName}</div>
          <div class="group">${groupName}</div>
          <div class="details-container">
            <div class="details">Details</div>
            <img src="images/right-arrow.svg">
          </div>
        
        </div>
        </a>
      </div>
      `
    }
   
   } else{
    if(!upcomingLaunchDate.isAfter(now)){
      launchListHTML+=`
      <div class="launch-outer-container">
        <div class="floating-dot"></div>
        <div class="floating-details-container">
          <div class="date">${date}</div>
          <div class="time">${time}</div>
        </div>
        <a href="details.html?id=${upcomingLaunch.id}"><div class="launch-container">
          <div class="rocket-name">${rocketName}</div>
          <div class="group">${groupName}</div>
          <div class="details-container">
            <div class="details">Details</div>
            <img src="images/right-arrow.svg">
          </div>
        
        </div>
        </a>
      </div>
      `
    }
   }

    
  });

  document.querySelector('.js-launch-list-container').innerHTML=launchListHTML;

  const upcomingButton = document.querySelector('.js-upcoming-container');
  
  upcomingButton.addEventListener('click',(button)=>{
    previousButton.classList.remove('clicked');
    upcomingButton.classList.add('clicked');
    upcoming = true;

    renderLauncherPage();
  });
  
  const previousButton = document.querySelector('.js-previous-container');previousButton.addEventListener('click',(button)=>{
    upcomingButton.classList.remove('clicked');
    previousButton.classList.add('clicked');
    upcoming = false;
    renderLauncherPage();
  });

}
renderLauncherPage();