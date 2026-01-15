const rtf = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

export function timeEarly(date: Date | string) {
  const now = new Date();
  const past = new Date(date);

  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.34524, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let value = seconds;
  let unit: Intl.RelativeTimeFormatUnit = "second";

  for (const [limit, nextUnit] of intervals) {
    if (Math.abs(value) < limit) {
      unit = nextUnit;
      break;
    }
    value /= limit;
  }

  return rtf.format(-Math.round(value), unit);
}

export function timeAgo(date: string) {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;

  return `${Math.floor(seconds / 86400)} days ago`;
}