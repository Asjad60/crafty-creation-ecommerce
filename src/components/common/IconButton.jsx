import React from "react";

function IconButton({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`flex gap-x-2 items-center py-2 px-4 ${
        outline
          ? "bg-transparent border border-yellow-400 text-yellow-400"
          : "bg-yellow-500"
      }  rounded-md text-slate-900 font-semibold ${customClasses}`}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
export default IconButton;
