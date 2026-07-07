/** Pure SLA/date helpers, extracted from the tracker so they can be unit tested. */

/**
 * Parse an AI-estimated SLA string (e.g. "7–15 working days", "48 hours")
 * into a day count. Ranges resolve to their upper bound; hour-based SLAs are
 * converted to whole days; unparseable input falls back to 15 days.
 */
export function parseSLADays(sla: string): number {
  const match = sla.match(/(\d+)/g);
  if (!match) return 15;
  const value = parseInt(match[match.length - 1], 10);
  // "24/48 hours" style SLAs would otherwise read as 24+ days
  if (/hour|घंट/i.test(sla)) return Math.max(1, Math.ceil(value / 24));
  return value;
}

/** Whole days elapsed since an ISO date string, never negative. */
export function daysElapsed(dateStr: string, now: number = Date.now()): number {
  const diff = now - new Date(dateStr).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}
