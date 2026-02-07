import { cn } from "@/lib/utils";
import { JSX, useState } from "react";

type View = {
  label: "Gün" | "Hafta" | "Ay";
  selected: boolean;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

type Props = {
  currView: View;
  onChange: (view: View) => void;
};

export function ViewMenu() {
  const [currView, setCurrView] = useState<View>(VIEWS[0]);

  return (
    <ul className="mb-4">
      {VIEWS.map((item) => {
        item.selected = currView === item;

        return (
          <li key={item.label}>
            <button
              onClick={() => setCurrView(item)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors",
                "text-base font-medium",
                item.selected ? "bg-primary text-white" : "hover:bg-gray-100",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const VIEWS: View[] = [
  {
    label: "Gün",
    selected: false,
    icon: (props) => (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 2.5H2.5M17.5 17.5H2.5M4.16667 10C4.16667 9.22342 4.16667 8.83517 4.29353 8.52883C4.46269 8.12048 4.78715 7.79602 5.19553 7.62687C5.50182 7.5 5.8901 7.5 6.66667 7.5H13.3333C14.1099 7.5 14.4982 7.5 14.8045 7.62687C15.2128 7.79602 15.5373 8.12048 15.7065 8.52883C15.8333 8.83517 15.8333 9.22342 15.8333 10C15.8333 10.7766 15.8333 11.1648 15.7065 11.4712C15.5373 11.8795 15.2128 12.204 14.8045 12.3732C14.4982 12.5 14.1099 12.5 13.3333 12.5H6.66667C5.8901 12.5 5.50182 12.5 5.19553 12.3732C4.78715 12.204 4.46269 11.8795 4.29353 11.4712C4.16667 11.1648 4.16667 10.7766 4.16667 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Hafta",
    selected: false,
    icon: (props) => (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 2.5V17.5M12.5 2.5V17.5M6.5 2.5H13.5C14.9002 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86503C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9002 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9002 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86503 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9002 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86503C3.01217 3.39462 3.39462 3.01217 3.86503 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Ay",
    selected: false,
    icon: (props) => (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 7.5H17.5M2.5 12.5H17.5M10 2.5V17.5M6.5 2.5H13.5C14.9002 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86503C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9002 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9002 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86503 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9002 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86503C3.01217 3.39462 3.39462 3.01217 3.86503 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];
