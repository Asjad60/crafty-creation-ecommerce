import React from "react";

const ErrorPage = () => {
  return (
    <div className="text-white min-h-[calc(100vh-3.6rem)] grid place-items-center">
      <div className="flex gap-x-2 items-center">
        <h1 className=" text-4xl font-semibold">404</h1>{" "}
        <p className="font-medium text-xl"> Page Not Found</p>
      </div>
    </div>
  );
};

export default ErrorPage;
