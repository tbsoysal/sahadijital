import { calendarService } from "@/lib/services/calendarService";
import { profileService } from "@/lib/services/profileService";
import { useEffect, useState } from "react";
import { Field, View } from "@/types";
import { VIEWS } from "@/lib/constants";

export function useDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fields, setFields] = useState<Field[] | undefined>();
  const [selectedField, setSelectedField] = useState<Field | undefined>();
  const [selectedView, setSelectedView] = useState<View>(VIEWS[1]);
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    businessName: "",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const profile = await profileService.fetchProfile();
        const nameParts = profile.full_name?.split(" ") || ["", ""];
        setUserData({
          id: profile.id,
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" "), // handles middle names
          businessName: profile.business_name || "",
        });
      } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error("Profil bilgileri alınırken bir hata oluştu");
      }
    };

    const fetchFields = async (userId: string) => {
      if (!userData.id) return;

      try {
        const fields = await calendarService.fetchFields(userId);
        if (fields.length < 2) {
          setSelectedField(fields[0]);
        }
        setFields(fields);
      } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error("Saha bilgileri alınırken bir hata oluştu");
      }
    };

    getUserInfo();
    fetchFields(userData.id);
  }, [userData.id]);

  return {
    userData,
    isSidebarOpen,
    setIsSidebarOpen,
    fields,
    selectedField,
    setSelectedField,
    selectedView,
    setSelectedView,
  };
}
