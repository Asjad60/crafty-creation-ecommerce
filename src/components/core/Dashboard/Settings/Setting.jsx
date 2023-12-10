import React from "react";
import ChangeProfile from "./ChangeProfile";
import ProfileInformation from "./ProfileInformation";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const Setting = () => {
  return (
    <div>
      <h1 className="text-3xl text-white font-semibold mb-10">Edit Profile</h1>
      <ChangeProfile />
      <ProfileInformation />
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
};

export default Setting;
