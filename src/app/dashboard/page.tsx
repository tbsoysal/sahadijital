"use client"

import { DailyCalendar } from "@/components/dashboard/calendar/DailyCalendar";
import { MonthlyCalendar } from "@/components/dashboard/calendar/MonthlyCalendar";
import { WeeklyCalendar } from "@/components/dashboard/calendar/WeeklyCalendar";
import { useDashboardContext } from "@/context/DashboardContext";

export default function Dashboard() {
  const { selectedView } = useDashboardContext();

  if (selectedView?.label === "Gün") return <DailyCalendar />;
  else if (selectedView?.label === "Hafta") return <WeeklyCalendar />;
  else return <MonthlyCalendar />;
}
