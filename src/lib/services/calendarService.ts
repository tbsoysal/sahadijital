import { supabase } from "../supabase/client";

export const calendarService = {
  fetchFields: async (userId: string) => {
    const { data: fields, error } = await supabase
      .from("fields")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return fields;
  },

  fetchReservation: async ({
    field_id,
    date,
    starthour,
    endhour,
  }: {
    field_id: string | undefined;
    date: Date;
    starthour: number;
    endhour: number;
  }) => {
    if (field_id) {
      const { data: reservation, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("field_id", field_id)
        .eq("reservation_date", date)
        .eq("start_time", starthour)
        .eq("end_time", endhour);

      if (error) throw undefined;
      return reservation;
    }
    return null;
  },
};
