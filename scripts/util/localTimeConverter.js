import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function formatTime(UTC){
  // Parse the UTC time string using dayjs
  const formattedTime = dayjs(UTC);

  // Extract date and time separately
  const date = formattedTime.format('MMM D');
  const time = formattedTime.format('h:mm A');


  return [date,time];
}

export function padNumber(number) {
  return String(number).padStart(2, '0');
}

// Function to calculate the time difference
export function calculateTimeDifference(targetDate) {
  // Calculate the difference between the target date and the current date
  const now = dayjs();
  const diff = targetDate.diff(now);

  // Convert the difference to days, hours, minutes, and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: padNumber(days),
    hours: padNumber(hours),
    minutes: padNumber(minutes),
    seconds: padNumber(seconds)
  };
}