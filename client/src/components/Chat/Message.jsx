import React, { useEffect, useRef } from "react";
import { format } from "timeago.js";

const Message = ({ message, currentUser }) => {
  const scrollMessage = useRef(null);
  useEffect(() => {
    scrollMessage?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);
  return (
    <div className="mt-3 w-full flex justify-between flex-col gap-y-3 overflow-auto">
      {message?.map((msg, i) => {
        return (
          <div className="w-full flex flex-col" key={i} ref={scrollMessage}>
            <div
              className={`flex flex-col gap-y-1 ${
                msg.senderId === currentUser
                  ? "ml-auto items-end"
                  : "mr-auto items-start"
              }`}
            >
              <div
                className={`p-2.5 rounded text-base font-semibold w-max ${
                  msg.senderId === currentUser
                    ? "float-right text-black bg-slate-200"
                    : "float-left text-white bg-gray-700"
                }`}
              >
                {msg.message}
              </div>
              <small className="h-full text-white/75 text-xs">
                {format(msg.createdAt)}
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
