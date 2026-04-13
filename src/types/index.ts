import React from "react";

export type Field = {
  id: string;
  user_id: string;
  name: string;
  created_at: Date;
  default_price: number;
  start_hour: number;
  end_hour: number;
};

export type View = {
  label: "Gün" | "Hafta" | "Ay";
  selected: boolean;
  icon: React.ElementType;
};

export type Reservation = {
  id: string;
  created_at: string;
  field_id: string;
  customer_name: string;
  customer_phone: string;
  reservation_date: string;
  start_time: string;
  end_time: string;
  price: number;
  is_paid: boolean;
  description?: string;
  status: "confirmed" | "pending" | "rejected";
  subscription_id?: string;
};

export type Subscription = {
  id: string;
  field_id: string;
  customer_name: string;
  customer_phone: string;
  day_of_week: number; // 0 = Pazar, 1 = Pazartesi, ..., 6 = Cumartesi
  start_time: string; // HH:MM:SS
  end_time: string; // HH:MM:SS
  price_per_session: number;
  description?: string;
  status: "active" | "cancelled";
  end_date: string; // yyyy-MM-dd
  created_at: string;
};

export type Slot = {
  day: Date;
  hour: number;
  reservation?: Reservation;
};

export type ClosedHour = {
  id: string;
  field_id: string;
  closed_date: string;
  hour: number;
  created_at: string;
};
