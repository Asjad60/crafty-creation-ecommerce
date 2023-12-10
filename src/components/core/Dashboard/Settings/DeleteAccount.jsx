import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/settingsAPI";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const handleDeleteAccount = () => {
    dispatch(deleteAccount(token, navigate));
  };

  return (
    <div className="text-pink-200 flex gap-4 bg-[#340019] p-10 rounded-lg mt-10">
      <div className="min-w-[60px] max-h-[60px] rounded-full bg-[#691432] flex items-center justify-center">
        <AiFillDelete className="text-2xl text-pink-500" />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-medium text-xl">Delete Account</h2>
        <div className="max-w-[553px]">
          <p>Would you like to delete account?</p>
          <p>
            This account contains Paid Courses. Deleting your account will
            remove all the contain associated with it.
          </p>
        </div>

        <button
          className="text-red-700 self-start "
          onClick={handleDeleteAccount}
        >
          I Want To Delete My Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
