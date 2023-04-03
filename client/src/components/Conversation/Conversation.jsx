import React from "react";

const Conversation = ({ users, currentUser, setChatUser, status }) => {
  const onlineUserCheck = (user) => {
    const onlineUsers = status?.find((id) => id?.userId === user?._id);
    return onlineUsers;
  };
  return (
    <div className="w-full p-2 flex flex-col">
      {users
        ?.filter((id) => id._id !== currentUser)
        .map((user, i) => {
          return (
            <React.Fragment key={i}>
              <div
                className={`flex flex-col p-2 border-b border-gray-500 ${
                  onlineUserCheck(user) ? "order-1" : "order-2"
                }`}
                onClick={() => setChatUser(user)}
              >
                <span className="text-white">{user.userName}</span>
                <span
                  className={`${
                    onlineUserCheck(user) ? "text-green-300" : "text-white/70"
                  }`}
                >
                  {onlineUserCheck(user) ? "Online" : "Offline"}
                </span>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Conversation;
