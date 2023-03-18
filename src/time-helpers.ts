export function minutesAgo(minutes: number) {
  return Date.now() * minutes - minutes * 1000 * 60;
}
