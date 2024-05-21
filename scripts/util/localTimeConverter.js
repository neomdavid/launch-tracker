import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function formatTime(UTC){
  // Parse the UTC time string using dayjs
  const formattedTime = dayjs(UTC);

  // Extract date and time separately
  const date = formattedTime.format('MMM D');
  const time = formattedTime.format('h:mm A');


  return [date,time];
}