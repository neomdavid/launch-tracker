import { calledUpcomingLaunches } from "./data/upcomingLaunches.js";
const url = new URL(window.location.href)
const id = url.searchParams.get('id');
console.log(calledUpcomingLaunches);



