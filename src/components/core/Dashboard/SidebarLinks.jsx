import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { resetProductState } from "../../../slices/productSlice";

function SidebarLinks({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetProductState())}
      className={`px-8 py-2 font-medium text-slate-300 ${
        matchRoute(link?.path)
          ? "bg-[rgba(255,95,95,0.2)] border-l-2 border-l-yellow-500"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}

export default SidebarLinks;
