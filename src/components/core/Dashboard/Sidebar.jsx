import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLinks from "./SidebarLinks";
import { logout } from "../../../services/operations/authApi";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { RiCloseFill } from "react-icons/ri";

function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModel] = useState(null);
  const [transformed, setTransformed] = useState(false);

  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[93vh] min-w-[220px] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`min-w-[220px] flex flex-col border-r-[1px] border-r-[#2C333F] min-h-[calc(100vh-3.6rem)] bg-[#161d29] md:relative py-10 transition-all duration-200 ease-in-out ${
          transformed ? "left-0" : "absolute left-[-100%] md:left-0"
        }`}
      >
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link?.type && user?.accountType !== link?.type) return null;
            return (
              <SidebarLinks key={link.id} link={link} iconName={link.icon} />
            );
          })}

          <div className="mx-auto h-[1px] mt-6 mb-6 w-10/12 bg-yellow-50"></div>

          <div className="flex flex-col ">
            <SidebarLinks
              link={{ name: "Settings", path: "dashboard/settings" }}
              iconName="VscSettingsGear"
            />
          </div>

          <button
            onClick={() =>
              setConfirmationModel({
                text1: "Are you sure",
                text2: "You Will Be Logged Out Of Your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModel(null),
              })
            }
            className="px-8 py-2 font-medium text-slate-300 self-start w-full"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span className="">Logout</span>
            </div>
          </button>
        </div>
      </div>

      <button
        className="flex items-start absolute top-1 left-1 z-[2000] text-4xl font-medium text-white md:hidden"
        onClick={() => setTransformed(!transformed)}
      >
        {transformed ? (
          <RiCloseFill />
        ) : (
          <HiMiniBars3BottomLeft className="text-slate-300" />
        )}
      </button>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default Sidebar;
