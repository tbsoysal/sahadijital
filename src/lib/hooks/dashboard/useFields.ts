import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export type Field = {
  id: string;
  name: string;
  is_active: boolean;
};

export function useFields() {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  useEffect(() => {
    const fetchFields = async () => {
      const { data, error } = await supabase
        .from("fields")
        .select("id, name, is_active")
        .order("name");

      if (!error && data) {
        setFields(data);
        setSelectedField(data[0] ?? null);
      }
    };

    fetchFields();
  }, []);

  return {
    fields,
    selectedField,
    setSelectedField,
  };
}
