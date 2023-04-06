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
        const splitImg =
          `${import.meta.env.VITE_SERVER_URL}/` + msg.file?.split("/")[1];
        return (
          <div className="w-full flex flex-col" key={i} ref={scrollMessage}>
            <div
              className={`flex flex-col gap-y-1 ${
                msg.senderId === currentUser
                  ? "ml-auto items-end"
                  : "mr-auto items-start"
              }`}
            >
              {splitImg !== `${import.meta.env.VITE_SERVER_URL}/undefined` ? (
                <img
                  src={splitImg}
                  alt={splitImg}
                  className="w-48 h-40 object-cover rounded"
                />
              ) : null}
              <div
                className={`rounded text-base font-semibold w-max ${
                  !msg.message.length ? "p-0" : "p-2.5"
                } ${
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
