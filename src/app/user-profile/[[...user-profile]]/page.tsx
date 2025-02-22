"use client";

import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex h-screen items-center justify-center">
    <UserProfile path="/user-profile" routing="path" />
  </div>
);

export default UserProfilePage;
