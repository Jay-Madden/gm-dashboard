export function minutesAgo(minutes: number) {
  return Date.now() - 1000 * 60 * minutes;
}

export function hoursAgo(hours: number) {
  return Date.now() - 1000 * 60 * 60 * hours;
}

export function daysAgo(days: number) {
  return Date.now() - 1000 * 60 * 60 * 24 * days;
}
