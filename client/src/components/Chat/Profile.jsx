import React from "react";

const Profile = ({ chatUser, active }) => {
  return (
    <div className="flex flex-col p-2 border-b border-gray-500 bg-transparent">
      <span className="text-white">{chatUser?.userName}</span>
      <span className={`${active ? "text-green-300" : "text-white/70"}`}>
        {active ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default Profile;
