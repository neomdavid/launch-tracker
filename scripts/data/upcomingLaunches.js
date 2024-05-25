export async function getUpcomingLaunches(){
  const response = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/');
  const json = await response.json();
  localStorage.setItem('upcomingLaunches', JSON.stringify(json.results));
  return json.results;
}

export const calledUpcomingLaunches = JSON.parse(localStorage.getItem('upcomingLaunches'));
