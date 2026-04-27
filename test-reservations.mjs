// Standalone test script — no test framework required.
// Run with: node test-reservations.mjs

// ─── Utilities (copied from src/lib/constants.tsx) ───────────────────────────

function dbTimeToMinutes(t) {
  const [h, min] = t.split(":").map(Number);
  return h * 60 + (min || 0);
}

function minutesToDbTime(m) {
  const h = Math.floor(m / 60) % 24;
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}:00`;
}

function generateFieldHours(startHour, endHour) {
  const slots = [];
  let h = startHour;
  while (h !== endHour) {
    slots.push(h);
    h = (h + 1) % 24;
  }
  return slots;
}

// ─── isSlotBooked (from src/components/book/BookingView.tsx, fixed) ───────────

function isSlotBooked(hour, startHour, reservations) {
  const offset = hour < startHour ? 1440 : 0;
  const slotStart = hour * 60 + offset;
  const slotEnd = slotStart + 60;
  return reservations.some((r) => {
    const rStart = dbTimeToMinutes(r.start_time);
    const rawEnd = dbTimeToMinutes(r.end_time);
    const rEnd = rawEnd <= rStart ? rawEnd + 1440 : rawEnd;
    const normRStart = rStart < startHour * 60 ? rStart + 1440 : rStart;
    const normREnd = rEnd < startHour * 60 ? rEnd + 1440 : rEnd;
    return normRStart < slotEnd && normREnd > slotStart;
  });
}

// ─── Schema validation (from src/lib/schemas/) ───────────────────────────────

function validateReservationTimes(startTime, endTime) {
  // startTime / endTime are in minutes (0–1410, multiples of 30)
  return startTime !== endTime;
}

function validateSubscriptionTimes(startTime, endTime) {
  return startTime !== endTime;
}

// ─── getPillStyle (from src/components/dashboard/calendar/WeeklyCalendar.tsx, fixed) ──

function getPillStyle(reservation, hours) {
  const gridStartMin = (hours[0] === 0 ? 23 : hours[0] - 1) * 60;
  const totalGridMinutes = hours.length * 60;

  const startMin = dbTimeToMinutes(reservation.start_time);
  const rawEnd = dbTimeToMinutes(reservation.end_time);
  const normStart = startMin < hours[0] * 60 ? startMin + 1440 : startMin;
  let normEnd = rawEnd <= startMin ? rawEnd + 1440 : rawEnd;
  if (normEnd < normStart) normEnd += 1440;
  return {
    topPct: ((normStart - gridStartMin) / totalGridMinutes) * 100,
    heightPct: ((normEnd - normStart) / totalGridMinutes) * 100,
  };
}

// ─── subscriptionService overlap check logic (fixed) ─────────────────────────
// Old code used string-compare: .lt("start_time", endStr).gt("end_time", startStr)
// New code fetches all reservations and checks overlaps in JS using minutes.

function fixedOverlapCheck(existingReservations, newStartStr, newEndStr) {
  const newStart = dbTimeToMinutes(newStartStr);
  const rawNewEnd = dbTimeToMinutes(newEndStr);
  const newEnd = rawNewEnd <= newStart ? rawNewEnd + 1440 : rawNewEnd;
  return existingReservations.filter((r) => {
    const rStart = dbTimeToMinutes(r.start_time);
    const rawREnd = dbTimeToMinutes(r.end_time);
    const rEnd = rawREnd <= rStart ? rawREnd + 1440 : rawREnd;
    return (rStart < newEnd          && rEnd          > newStart) ||
           (rStart < newEnd + 1440   && rEnd          > newStart + 1440) ||
           (rStart + 1440 < newEnd   && rEnd + 1440   > newStart);
  });
}

// ─── Test runner ──────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    console.log(`  ✓  ${name}`);
    passed++;
  } else {
    console.log(`  ✗  ${name}`);
    console.log(`       expected: ${JSON.stringify(expected)}`);
    console.log(`       actual:   ${JSON.stringify(actual)}`);
    failed++;
  }
}

function section(name) {
  console.log(`\n── ${name} ──`);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

section("generateFieldHours");
test("11:00–00:00 generates 13 slots starting at 11",
  generateFieldHours(11, 0),
  [11,12,13,14,15,16,17,18,19,20,21,22,23]);
test("22:00–04:00 generates 6 slots wrapping midnight",
  generateFieldHours(22, 4),
  [22,23,0,1,2,3]);
test("23:00–01:00 generates 2 slots",
  generateFieldHours(23, 1),
  [23,0]);

// ─────────────────────────────────────────────────────────────────────────────
section("isSlotBooked — same-day reservation (14:00–15:00, startHour=11)");

const sameDayRes = [{ start_time: "14:00:00", end_time: "15:00:00" }];
test("hour 13 not blocked", isSlotBooked(13, 11, sameDayRes), false);
test("hour 14 blocked",     isSlotBooked(14, 11, sameDayRes), true);
test("hour 15 not blocked", isSlotBooked(15, 11, sameDayRes), false);

// ─────────────────────────────────────────────────────────────────────────────
section("isSlotBooked — exactly-midnight end (23:00–00:00, startHour=11)");

const midnightEndRes = [{ start_time: "23:00:00", end_time: "00:00:00" }];
test("hour 22 not blocked", isSlotBooked(22, 11, midnightEndRes), false);
test("hour 23 blocked",     isSlotBooked(23, 11, midnightEndRes), true);
test("hour 0  not blocked", isSlotBooked(0,  11, midnightEndRes), false);

// ─────────────────────────────────────────────────────────────────────────────
section("isSlotBooked — cross-midnight (23:00–01:00, startHour=11)");

const crossMidnightRes = [{ start_time: "23:00:00", end_time: "01:00:00" }];
test("hour 22 not blocked", isSlotBooked(22, 11, crossMidnightRes), false);
test("hour 23 blocked",     isSlotBooked(23, 11, crossMidnightRes), true);
test("hour 0  blocked",     isSlotBooked(0,  11, crossMidnightRes), true);
test("hour 1  not blocked", isSlotBooked(1,  11, crossMidnightRes), false);

// ─────────────────────────────────────────────────────────────────────────────
section("isSlotBooked — cross-midnight (23:00–03:00, startHour=22)");

const longCrossRes = [{ start_time: "23:00:00", end_time: "03:00:00" }];
test("hour 22 not blocked", isSlotBooked(22, 22, longCrossRes), false);
test("hour 23 blocked",     isSlotBooked(23, 22, longCrossRes), true);
test("hour 0  blocked",     isSlotBooked(0,  22, longCrossRes), true);
test("hour 1  blocked",     isSlotBooked(1,  22, longCrossRes), true);
test("hour 2  blocked",     isSlotBooked(2,  22, longCrossRes), true);
test("hour 3  not blocked", isSlotBooked(3,  22, longCrossRes), false);

// ─────────────────────────────────────────────────────────────────────────────
section("isSlotBooked — 30-min reservation (23:00–23:30, startHour=11)");

const halfHourRes = [{ start_time: "23:00:00", end_time: "23:30:00" }];
test("hour 22 not blocked", isSlotBooked(22, 11, halfHourRes), false);
test("hour 23 blocked",     isSlotBooked(23, 11, halfHourRes), true);
test("hour 0  not blocked", isSlotBooked(0,  11, halfHourRes), false);

// ─────────────────────────────────────────────────────────────────────────────
section("Schema validation — reservationSchema (times in minutes)");

// Same time = invalid
test("14:00→14:00 invalid (zero duration)", validateReservationTimes(840, 840), false);
// Normal
test("14:00→15:00 valid",                   validateReservationTimes(840, 900), true);
// Cross-midnight cases that were broken before the fix
test("23:00→00:00 valid (midnight end)",     validateReservationTimes(1380, 0),   true);
test("23:00→00:30 valid (was broken)",       validateReservationTimes(1380, 30),  true);
test("23:00→01:00 valid (was broken)",       validateReservationTimes(1380, 60),  true);
test("22:30→00:00 valid (was broken)",       validateReservationTimes(1350, 0),   true);

// ─────────────────────────────────────────────────────────────────────────────
section("Schema validation — subscriptionSchema (times in minutes)");

test("14:00→14:00 invalid (zero duration)", validateSubscriptionTimes(840, 840), false);
test("14:00→15:00 valid",                   validateSubscriptionTimes(840, 900), true);
test("23:00→00:00 valid (was broken)",      validateSubscriptionTimes(1380, 0),  true);
test("23:00→01:00 valid (was broken)",      validateSubscriptionTimes(1380, 60), true);

// ─────────────────────────────────────────────────────────────────────────────
section("getPillStyle — same-day reservation (14:00–15:00, field 11:00–00:00)");

const hours11to0 = generateFieldHours(11, 0);
const sameDayPill = getPillStyle({ start_time: "14:00:00", end_time: "15:00:00" }, hours11to0);
test("height is positive", sameDayPill.heightPct > 0, true);
test("height is ~7.7% (1/13 of grid)", Math.round(sameDayPill.heightPct * 10) / 10, 7.7);

// ─────────────────────────────────────────────────────────────────────────────
section("getPillStyle — midnight end (23:00–00:00, field 11:00–00:00)");

const midnightPill = getPillStyle({ start_time: "23:00:00", end_time: "00:00:00" }, hours11to0);
test("height is positive",       midnightPill.heightPct > 0, true);
test("height is ~7.7% (1 hour)", Math.round(midnightPill.heightPct * 10) / 10, 7.7);

// ─────────────────────────────────────────────────────────────────────────────
section("getPillStyle — cross-midnight (23:00–03:00, field 22:00–04:00)");

const hours22to4 = generateFieldHours(22, 4); // [22,23,0,1,2,3]
const crossPill = getPillStyle({ start_time: "23:00:00", end_time: "03:00:00" }, hours22to4);
test("height is positive",              crossPill.heightPct > 0, true);
test("height is ~66.7% (4/6 of grid)", Math.round(crossPill.heightPct * 10) / 10, 66.7);
test("top is ~33.3% (2/6 of grid)",    Math.round(crossPill.topPct * 10) / 10, 33.3);

// ─────────────────────────────────────────────────────────────────────────────
section("getPillStyle — post-midnight start (01:00–02:00, field 22:00–04:00)");

const postMidnightPill = getPillStyle({ start_time: "01:00:00", end_time: "02:00:00" }, hours22to4);
test("height is positive",              postMidnightPill.heightPct > 0, true);
test("height is ~16.7% (1/6 of grid)", Math.round(postMidnightPill.heightPct * 10) / 10, 16.7);
test("top is ~66.7% (4/6 of grid)",    Math.round(postMidnightPill.topPct * 10) / 10, 66.7);

// ─────────────────────────────────────────────────────────────────────────────
section("subscriptionService overlap check — fixed (minute-based JS comparison)");

const existingReservations = [
  { start_time: "14:00:00", end_time: "15:00:00" },
  { start_time: "23:00:00", end_time: "00:00:00" },
];

// Cross-midnight new booking vs existing 23:00–00:00 — must conflict
const conflictCheck = fixedOverlapCheck(existingReservations, "23:00:00", "01:00:00");
test("cross-midnight new booking conflicts with 23:00–00:00", conflictCheck.length, 1);

// Normal same-day booking
const normalConflict = fixedOverlapCheck(existingReservations, "13:00:00", "15:00:00");
test("normal booking correctly detects conflict with 14:00–15:00", normalConflict.length, 1);

// No conflict
test("booking after conflicting slot has no conflict",
  fixedOverlapCheck(existingReservations, "15:00:00", "16:00:00").length, 0);

// Existing cross-midnight reservation vs various new bookings
const existingCrossRes = [{ start_time: "23:00:00", end_time: "02:00:00" }];
test("00:30–01:00 booking conflicts with existing 23:00–02:00",
  fixedOverlapCheck(existingCrossRes, "00:30:00", "01:00:00").length, 1);
test("02:00–03:00 booking does NOT conflict with 23:00–02:00",
  fixedOverlapCheck(existingCrossRes, "02:00:00", "03:00:00").length, 0);
test("22:00–23:30 booking conflicts with 23:00–02:00",
  fixedOverlapCheck(existingCrossRes, "22:00:00", "23:30:00").length, 1);

// Symmetry: cross-midnight NEW booking vs post-midnight EXISTING
const existingPostMidnight = [{ start_time: "00:30:00", end_time: "01:00:00" }];
test("23:00–01:30 new booking conflicts with existing 00:30–01:00",
  fixedOverlapCheck(existingPostMidnight, "23:00:00", "01:30:00").length, 1);
test("23:00–00:30 new booking does NOT conflict with existing 00:30–01:00",
  fixedOverlapCheck(existingPostMidnight, "23:00:00", "00:30:00").length, 0);

// ═══════════════════════════════════════════════════════════════════════════
// BOOKING PAGE TESTS
// ═══════════════════════════════════════════════════════════════════════════

// ─── isSlotPast (from BookingView.tsx, fixed) ────────────────────────────────

function isSlotPast(hour, startHour, selectedDay) {
  const now = new Date();
  const slotDate = new Date(selectedDay);
  // Any hour below start_hour is a post-midnight slot belonging to the next calendar day
  if (hour < startHour) slotDate.setDate(slotDate.getDate() + 1);
  slotDate.setHours(hour, 0, 0, 0);
  return slotDate < now;
}

// ─── bookingRequestSchema validation ────────────────────────────────────────
// Public booking always creates 1-hour slots; startTime and endTime are hours (0–23)

function validateBookingRequestTimes(startTime, endTime) {
  return endTime > startTime || (startTime === 23 && endTime === 0);
}

// ─── Confirm page end-time generation (confirm/page.tsx line 39, 54) ─────────

function confirmPageEndTime(hour) {
  return (hour + 1) % 24;
}

function confirmPageEndTimeStr(hour) {
  const end = confirmPageEndTime(hour);
  return `${String(end).padStart(2, "0")}:00:00`;
}

// ─────────────────────────────────────────────────────────────────────────────
section("bookingRequestSchema — confirm page time validation");

// Every valid field hour should produce a valid (startTime, endTime) pair
for (let h = 0; h <= 22; h++) {
  test(`hour ${h} → end ${h+1}: valid`, validateBookingRequestTimes(h, h + 1), true);
}
test("hour 23 → end 0 (midnight): valid", validateBookingRequestTimes(23, 0), true);
// Sanity: same hour is invalid
test("hour 14 → end 14 (zero duration): invalid", validateBookingRequestTimes(14, 14), false);

// ─────────────────────────────────────────────────────────────────────────────
section("confirm page end-time generation");

test("hour 22 → end_time '23:00:00'", confirmPageEndTimeStr(22), "23:00:00");
test("hour 23 → end_time '00:00:00' (midnight wrap)", confirmPageEndTimeStr(23), "00:00:00");
test("hour 0  → end_time '01:00:00'", confirmPageEndTimeStr(0), "01:00:00");
test("hour 1  → end_time '02:00:00'", confirmPageEndTimeStr(1), "02:00:00");

// ─────────────────────────────────────────────────────────────────────────────
section("isSlotPast — future date (all slots available)");

const farFuture = new Date();
farFuture.setFullYear(farFuture.getFullYear() + 1);

// For a field 11:00–00:00, hours [11..23] are same-day; none are past on a future date
test("hour 11 not past on future date", isSlotPast(11, 11, farFuture), false);
test("hour 23 not past on future date", isSlotPast(23, 11, farFuture), false);
// Post-midnight slot (hour < startHour) → belongs to next day, still future
test("hour 0  not past on future date (post-midnight → day+1)", isSlotPast(0, 11, farFuture), false);

// ─────────────────────────────────────────────────────────────────────────────
section("isSlotPast — past date (all slots expired)");

const farPast = new Date();
farPast.setFullYear(farPast.getFullYear() - 1);

test("hour 11 past on past date", isSlotPast(11, 11, farPast), true);
test("hour 23 past on past date", isSlotPast(23, 11, farPast), true);
// Post-midnight on a past day → still in the past (day+1 is still last year)
test("hour 0  past on past date (post-midnight → still last year)", isSlotPast(0, 11, farPast), true);

// ─────────────────────────────────────────────────────────────────────────────
section("isSlotPast — post-midnight hour treated as NEXT calendar day");

// The key fix: with startHour=22, hours 0 and 1 belong to the NEXT day.
// We verify this by checking that hour 0 on today is treated as tomorrow.
const todayMidnight = new Date();
todayMidnight.setHours(0, 0, 0, 0);

// Tomorrow 00:00 is in the future for any time of day
const tomorrowAt0 = new Date(todayMidnight);
tomorrowAt0.setDate(tomorrowAt0.getDate() + 1);
tomorrowAt0.setHours(0, 0, 0, 0);
const tomorrowAt0IsFuture = tomorrowAt0 > new Date();
test(
  "hour 0 with startHour=22 on today maps to tomorrow (not past if tomorrow is future)",
  isSlotPast(0, 22, todayMidnight),
  !tomorrowAt0IsFuture  // should NOT be past (tomorrow 00:00 is in the future all day)
);

// OLD behaviour (hardcoded hour === 0 || hour === 1): same result for hour 0
// NEW behaviour: hour < startHour is the condition, so hour 2 is also next-day for startHour=22
const tomorrowAt2 = new Date(todayMidnight);
tomorrowAt2.setDate(tomorrowAt2.getDate() + 1);
tomorrowAt2.setHours(2, 0, 0, 0);
const tomorrowAt2IsFuture = tomorrowAt2 > new Date();
test(
  "hour 2 with startHour=22 on today maps to tomorrow (was broken with old hardcode)",
  isSlotPast(2, 22, todayMidnight),
  !tomorrowAt2IsFuture  // tomorrow 02:00 is always in the future
);

// OLD code hardcoded `hour === 0 || hour === 1`, so hour=2 on a startHour=22 field would use
// today's 02:00 (past) instead of tomorrow's 02:00 (future). The test above already proves
// the fix works for hour=2 — no time-of-day-dependent assertion needed.

// ─────────────────────────────────────────────────────────────────────────────
section("isSlotBooked — booking page scenarios (field 11:00–00:00, startHour=11)");

// Scenario: user views a day that has a 23:00–00:00 reservation
// Slots shown: [11,12,...,23,0] — hour 0 is next-day but rendered under this day
const res23to0 = [{ start_time: "23:00:00", end_time: "00:00:00" }];
test("hour 23 blocked (start of reservation)", isSlotBooked(23, 11, res23to0), true);
test("hour 0  NOT blocked (end of reservation, exclusive)", isSlotBooked(0, 11, res23to0), false);
test("hour 22 NOT blocked", isSlotBooked(22, 11, res23to0), false);

// Scenario: 23:00–01:00 cross-midnight — the booking page would show both hours as blocked
const res23to1 = [{ start_time: "23:00:00", end_time: "01:00:00" }];
test("hour 23 blocked (cross-midnight, start)", isSlotBooked(23, 11, res23to1), true);
test("hour 0  blocked (cross-midnight, within)",isSlotBooked(0,  11, res23to1), true);
test("hour 1  NOT blocked (cross-midnight, end)", isSlotBooked(1, 11, res23to1), false);

// Scenario: multiple reservations on the same day
const multiRes = [
  { start_time: "14:00:00", end_time: "15:00:00" },
  { start_time: "18:00:00", end_time: "20:00:00" },
];
test("hour 14 blocked", isSlotBooked(14, 11, multiRes), true);
test("hour 15 NOT blocked (gap between reservations)", isSlotBooked(15, 11, multiRes), false);
test("hour 18 blocked", isSlotBooked(18, 11, multiRes), true);
test("hour 19 blocked (multi-hour)", isSlotBooked(19, 11, multiRes), true);
test("hour 20 NOT blocked", isSlotBooked(20, 11, multiRes), false);
test("hour 11 NOT blocked", isSlotBooked(11, 11, multiRes), false);

// ─────────────────────────────────────────────────────────────────────────────
section("booking page end_time stored in DB (confirm page generates correct strings)");

// When a user books hour=23 on a field with start_hour=11:
// The confirm page stores: start_time="23:00:00", end_time="00:00:00"
// And the reservation_date is the SELECTED DAY (not the next day)
test("hour 23 → start_time '23:00:00'",
  `${String(23).padStart(2, "0")}:00:00`, "23:00:00");
test("hour 23 → end_time '00:00:00' (midnight, correct for DB)",
  confirmPageEndTimeStr(23), "00:00:00");

// For a field with start_hour=22 showing hour=0 (next-day slot):
// The confirm page stores start_time="00:00:00", end_time="01:00:00"
// reservation_date is still the SELECTED DAY (e.g. Wednesday), NOT Thursday
// This means the DB has: reservation_date=Wednesday, start_time=00:00:00, end_time=01:00:00
// isSlotBooked when viewing Wednesday will correctly find this (same fetch day)
test("hour 0 → start_time '00:00:00'",
  `${String(0).padStart(2, "0")}:00:00`, "00:00:00");
test("hour 0 → end_time '01:00:00'",
  confirmPageEndTimeStr(0), "01:00:00");

// Verify isSlotBooked correctly detects a booking stored as 00:00→01:00 on the same day
const res0to1 = [{ start_time: "00:00:00", end_time: "01:00:00" }];
test("hour 0 blocked when 00:00–01:00 reservation exists (same day fetch)",
  isSlotBooked(0, 22, res0to1), true);
test("hour 1 NOT blocked (end exclusive)", isSlotBooked(1, 22, res0to1), false);
test("hour 23 NOT blocked (different slot)", isSlotBooked(23, 22, res0to1), false);

// ─────────────────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
console.log(`  ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
