import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeElapsedInText(isoDate: string): string {
  const inputDate = new Date(isoDate);
  const currentDate = new Date();

  const diffInMs = currentDate.getTime() - inputDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInMonth = secondsInDay * 30; // Average days in a month
  const secondsInYear = secondsInDay * 365; // Average days in a year

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
  } else if (diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} ${days > 1 ? "days" : "day"} ago`;
  } else if (diffInSeconds < secondsInYear) {
    const months = Math.floor(diffInSeconds / secondsInMonth);
    return `${months} ${months > 1 ? "months" : "month"} ago`;
  } else {
    const years = Math.floor(diffInSeconds / secondsInYear);
    return `${years} ${years > 1 ? "years" : "year"} ago`;
  }
}

export function capitalize(input: string) {
  return input.replace(/^./, (char) => char.toUpperCase());
}

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO date string.");
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
