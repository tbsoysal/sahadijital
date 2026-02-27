import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Field } from "@/lib/hooks/dashboard/types";


export function useFields() {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [businessName, setBusinessName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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

    const fetchUserInfo = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      setFirstName(user?.user_metadata.first_name);
      setLastName(user?.user_metadata.last_name);
      setBusinessName(user?.user_metadata.business_name);
    };

    fetchUserInfo();
    fetchFields();
  }, []);

  return {
    fields,
    selectedField,
    businessName,
    isSidebarOpen,
    firstName,
    lastName,
    setIsSidebarOpen,
    setSelectedField,
  };
}
