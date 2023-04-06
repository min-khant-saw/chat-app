import React from "react";

const NotFound = () => {
  return (
    <div className="text-white text-4xl w-full h-screen flex flex-col justify-center items-center">
      <img src="/chat.png" alt="404" className="w-80 h-auto object-cover" />
      <span>404 Not Found</span>
    </div>
  );
};

export default NotFound;
