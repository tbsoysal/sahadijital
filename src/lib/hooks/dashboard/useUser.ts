import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { UserData } from "./types";


let cachedUser: UserData | null = null;
let fetchPromise: Promise<UserData | null> | null = null;

export function useUser() {
  const [currUser, setCurrUser] = useState<UserData | null>(
    cachedUser,
  );
  const [loading, setLoading] = useState(!cachedUser);

  useEffect(() => {
    // If already cached use it
    if (cachedUser) {
      setCurrUser(cachedUser);
      setLoading(false);
      return;
    }

    // If already fetching, wait for that promise
    if (fetchPromise) {
      fetchPromise.then((data) => {
        setCurrUser(data);
        setLoading(false);
      });
      return;
    }
    // Fetch once
    fetchPromise = (async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          return null;
        }
        console.count("🚀 Supabase API Call Get Business ID");
        const { data: userData, error: userDataError } = await supabase
          .from("users")
          .select("business_id")
          .eq("auth_id", user.id)
          .single();

        if (userDataError || !userData?.business_id) {
          return null;
        }

        const result: UserData = {
          userId: user.id,
          businessId: userData.business_id,
        };

        // Cache the result
        cachedUser = result;
        setCurrUser(result);
        setLoading(false);
        return result;
      } catch (err) {
        console.error("Error fetching user business:", err);
        setLoading(false);
        return null;
      } finally {
        fetchPromise = null; // Clear promise after fetch
      }
    })();

    fetchPromise.then((data) => {
      setCurrUser(data);
      setLoading(false);
    });
  }, []);

  return { currUser, loading };
}
