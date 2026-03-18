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

export type Reservation = {
  id: string;
  field_id: string;
  reservation_date: Date;
  start_time: number;
  end_time: number;
  price: number;
  is_paid: boolean;
  customer_name: string;
};

export type Slot = {
  day: Date;
  hour: number;
  reservation?: string;
};
