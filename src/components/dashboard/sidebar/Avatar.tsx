import { useDashboardContext } from "@/context/DashboardContext";

export default function Avatar() {
  const { userData } = useDashboardContext();
  const firstName = userData.firstName;
  const lastName = userData.lastName;

  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div
      className="flex items-center justify-center rounded-full border"
      style={{
        width: 36,
        height: 36,
        backgroundColor: "#D1FADF",
        borderColor: "#A6F4C5",
      }}
    >
      <span
        className="font-semibold"
        style={{
          color: "#0A8F44",
          fontSize: "14px",
        }}
      >
        {initials}
      </span>
    </div>
  );
}
