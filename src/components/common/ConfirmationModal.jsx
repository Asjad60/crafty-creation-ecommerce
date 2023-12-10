import React from "react";
import IconButton from "./IconButton";

function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] bg-[rgba(255,255,255,.1)] backdrop-blur-[2px] text-white grid place-items-center  overflow-auto">
      <div className="bg-[#161d29] max-w-[350px] w-11/12 flex flex-col gap-y-4 p-6 rounded-lg border">
        <p className="font-medium text-2xl">{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div className="flex gap-4">
          <IconButton
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />

          <button
            onClick={modalData?.btn2Handler}
            className="rounded-md bg-slate-200 py-[8px] px-[20px] font-semibold text-slate-800"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
