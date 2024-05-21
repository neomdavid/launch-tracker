import { getUpcomingLaunches } from "./data/upcomingLaunches.js";



getUpcomingLaunches().then((result)=>{
  result.forEach((data)=>{
    console.log(data);
  })
});