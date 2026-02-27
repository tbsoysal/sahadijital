export type Reservation = {
  business_id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  end_time: string;
  field_id: string;
  id: string;
  note: string | null;
  paid: boolean;
  price: number;
  start_time: string;
  status: string
};

export type ReservationFormData = {
  customerName: string;
  customerPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  price: string;
  paid: boolean;
  note?: string;
};

export type Field = {
  id: string;
  name: string;
  is_active: boolean;
};

export type UserData = {
  userId: string;
  businessId: string;
};

export type SelectedSlot = {
  day: Date,
  hour: number,
  reservation?: Reservation
} | null;
