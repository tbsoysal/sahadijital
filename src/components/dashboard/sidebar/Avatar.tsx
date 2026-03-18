import { useDashboardContext } from "@/context/DashboardContext";

export default function Avatar() {
  const { userData } = useDashboardContext();
  const firstName = userData.firstName;
  const lastName = userData.lastName;

  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A6F4C5] bg-[#D1FADF]">
      <span className="text-sm font-semibold text-[#0A8F44]">{initials}</span>
    </div>
  );
}
