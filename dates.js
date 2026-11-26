// Turns "2026-11-26 01:08" into "November 26 01:08 AM", like an old blog's timestamp.
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function formatDate(text) {
  const [day, time = "00:00"] = text.trim().split(/\s+/);
  const [y, m, d] = day.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const hour12 = h % 12 || 12;
  return `${MONTHS[m - 1]} ${String(d).padStart(2, "0")} ` +
    `${String(hour12).padStart(2, "0")}:${String(min).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}
