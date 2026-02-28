import { profileService } from "@/lib/services/profileService";

export function useDashboard() {

  let firstName: string = "";
  let lastName: string = "";
  let businessName: string = "";

  const getUserInfo = async () => {
    try {
      const profile = await profileService.getUserInfo();
      firstName = await profile.full_name.split(" ")[0];
      lastName = await profile.full_name.split(" ")[1];
      businessName = await profile.business_name;
    } catch (error) {
      if (error instanceof Error)
        throw error.message;
      throw "Profil bilgileri alınırken bir hata oluştu";
    }

    return {
      businessName,
      firstName,
      lastName,
    }
  }

  return {
    getUserInfo
  }
}
