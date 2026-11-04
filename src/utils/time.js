import { useEffect, useState } from "react";

const MONTH_MS = 1000 * 60 * 60 * 24 * 30.44;

// "Now" only exists on the client: rendering it at build time would bake a
// stale date into the static HTML and cause a hydration mismatch.
export function useNow() {
  const [now, setNow] = useState(null);
  useEffect(() => setNow(new Date()), []);
  return now;
}

export const formatMonth = (date, locale) =>
  date.toLocaleDateString(locale, { month: "short", year: "numeric" });

export const formatRange = (start, end, locale, t) =>
  `${formatMonth(start, locale)} — ${
    end ? formatMonth(end, locale) : t("time.present")
  }`;

// Returns "" for ongoing periods until the client knows the current date.
export const formatDuration = (start, end, now, t) => {
  const until = end || now;
  if (!until) return "";

  const totalMonths = Math.max(1, Math.round((until - start) / MONTH_MS));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return [
    years > 0 && t("time.years", { count: years }),
    months > 0 && t("time.months", { count: months }),
  ]
    .filter(Boolean)
    .join(" ");
};
