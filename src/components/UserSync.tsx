"use client";

import { syncUser } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

function UserSync() {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const handleSync = async () => {
      try {
        await syncUser();
      } catch (error) {
        console.log("Error in handle sync: ", error);
      }
    };

    handleSync();
  }, [isLoaded, isSignedIn]);

  return null;
}

export default UserSync;
