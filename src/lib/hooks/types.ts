import React from "react";

export type Field = {
  id: string;
  user_id: string;
  name: string;
  created_at: Date;
};

export type View = {
  label: "Gün" | "Hafta" | "Ay";
  selected: boolean;
  icon: React.ElementType;
};

export type Slot = {
  day: Date;
  hour: number;
  reservation?: string;
};
