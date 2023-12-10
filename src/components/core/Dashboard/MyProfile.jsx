import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../common/IconButton";
import { RiEditBoxLine } from "react-icons/ri";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  console.log(user);
  const navigate = useNavigate();
  return (
    <div className="text-white ">
      <h1 className="text-3xl font-medium mb-10">MY Profile</h1>
      <div className="flex items-center justify-between py-8 px-8 bg-[#161d29] rounded-lg">
        <div className="flex max-[460px]:flex-wrap gap-x-4">
          <img
            src={user?.image}
            alt={`Profile-${user?.name}`}
            className="rounded-[50%] max-w-[80px] object-contain"
          />
          <div>
            <p className="font-medium text-lg">{user?.name}</p>
            <p className="text-slate-400">{user?.email}</p>
          </div>
        </div>

        <IconButton
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconButton>
      </div>

      <div className="mt-10 p-8 flex flex-col gap-y-6 bg-[#161d29] rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">About</h1>
          <IconButton
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconButton>
        </div>
        <p className="text-slate-400">
          {user?.additionalDetails?.about
            ? user?.additionalDetails?.about
            : "Write somthing About yourself "}
        </p>
      </div>

      <div className="mt-10 flex flex-col p-8 gap-y-6 bg-[#161d29] rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium">Personal Details</h1>
          <IconButton
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconButton>
        </div>

        <div className="flex max-w-[550px] justify-between">
          <div className="flex flex-col gap-y-1 px-2 w-full">
            <p className="text-sm text-slate-400">First Name</p>
            <p className="mb-3 font-medium"> {user?.name.split(" ")[0]}</p>
            <p className="text-sm text-slate-400">Email</p>
            <p className="mb-3 font-medium">{user?.email}</p>
            <p className="text-sm text-slate-400">Gender</p>
            <p className="font-medium">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>

          <div className="flex flex-col gap-y-1 px-2 w-full">
            <p className="text-sm text-slate-400">Last Name</p>
            <p className="mb-3 font-medium">
              {user?.name.split(" ")[1] ? user?.name.split(" ")[1] : "..."}
            </p>
            <p className="text-sm text-slate-400">Phone Number</p>
            <p className="mb-3 font-meidum">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
            <p className="text-sm text-slate-400">Date Of Birth</p>
            <p className=" font-medium">
              {user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
