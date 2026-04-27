"use client";

import ConstructionPageUi from "@/components/shared/construction-page/ConstructionPageUi";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { UpdateProfile } from "@/components/ui/profile/UpdateProfileModal";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Key, Mail } from "lucide-react";

import React from "react";

const Profile = () => {
  const user = useAppSelector(useCurrentUser);

  const underConstruction = true;

  if (underConstruction) {
    return (
      <ConstructionPageUi
        discription="We’re working hard to bring you an improved profile experience. Please
              check back soon 🚀"
      />
    );
  }

  return (
    <div className="h-[80vh]">
      <div className="max-w-screen-2xl px-5 mx-auto flex justify-between items-center">
        {/* User Info */}
        <div className="flex gap-x-5 items-center">
          <UserAvatar userName={user?.name || "User"} className="size-20" />
          <div>
            <h1 className="text-2xl">{user?.name}</h1>
            <p className="mt-0.5 text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-x-2">
          <UpdateProfile />
          <Button variant={"outline"}>
            <Mail />
            Change email
          </Button>
          <Button>
            <Key />
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
