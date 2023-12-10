import React from "react";
import "./ProfileDropdown.css";
import { useDispatch, useSelector } from "react-redux";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authApi";

function ProfileDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { ref, isVisible, setIsVisible } = useOnClickOutside(false);

  return (
    <button onClick={() => setIsVisible(true)} className="profile-btn">
      <div className="profile-img">
        <img
          src={user?.image}
          alt={`profile ${user?.name}`}
          className="user-img"
        />
        <AiOutlineCaretDown className="self-center text-slate-400" />
      </div>
      {isVisible && (
        <div
          className="profile-dropdown z-[2000]"
          onClick={(e) => e.stopPropagation()}
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setIsVisible(false)}>
            <div className="dashboard-link">
              <VscDashboard style={{ fontSize: "1rem", marginRight: "4px" }} />
              Dashboard
            </div>
          </Link>
          <div
            className="logout-btn"
            onClick={() => {
              dispatch(logout(navigate));
              setIsVisible(false);
            }}
          >
            <VscSignOut style={{ fontSize: "1rem", marginRight: "4px" }} />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}

export default ProfileDropdown;
