import React from "react";

const Message = ({ message, currentUser }) => {
  return (
    <div className="mt-3 w-full flex justify-between flex-col gap-y-3 overflow-auto">
      {message?.map((msg, i) => {
        return (
          <div className="w-full" key={i}>
            <span
              className={`p-3 rounded text-base font-semibold w-max ${
                msg.senderId === currentUser
                  ? "float-right text-black bg-slate-200"
                  : "float-left text-white bg-gray-700"
              }`}
            >
              {msg.message}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
