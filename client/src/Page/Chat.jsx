import React, { useContext, useEffect, useState } from "react";
import { UserID } from "../App";
import { addMessage, getAllUser } from "../components/Api/chat/ChatUser";
import Chatting from "../components/Chat/Chatting";
import Conversation from "../components/Conversation/Conversation";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  const [socket, setSocket] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const currentUser = useContext(UserID);
  const [chatUser, setChatUser] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [message, setMessage] = useState([]);
  const [chat, setChat] = useState(null);
  const [status, setStatus] = useState([]);
  const [sendMessage, setSendMessage] = useState();
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getAllUser(setAllUsers);
  }, []);

  useEffect(() => {
    setSocket(io("ws://localhost:3000"));
    socket?.emit("new-user-add", currentUser);
    socket?.on("get-users", (active) => {
      setStatus(active);
    });
  }, [currentUser]);

  useEffect(() => {
    if (sendMessage) {
      socket?.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  const formData = new FormData();
  const createMessage = (e) => {
    e.preventDefault();
    if (newMessage.length || newFile !== null) {
      formData.append("chatId", chat?._id);
      formData.append("senderId", currentUser);
      formData.append("message", newMessage);
      formData.append(
        "image",
        newFile === null ? "Storage/undefined" : newFile
      );
      const receiverId = chat?.members?.find((id) => id !== currentUser);
      const fileChecker =
        newFile === null ? "Storage/undefined" : "Storage/" + newFile.name;
      setSendMessage({
        chatId: chat?._id,
        senderId: currentUser,
        message: newMessage,
        file: fileChecker,
        receiverId,
      });
      setMessage((msg) => {
        return [
          ...msg,
          {
            chatId: chat?._id,
            senderId: currentUser,
            message: newMessage,
            file: fileChecker,
          },
        ];
      });
      setNewFile(null);
      setNewMessage("");
      return addMessage(formData);
    }
  };

  useEffect(() => {
    socket?.on("recieve-message", (data) => {
      setReceiveMessage(data);
    });
  }, [createMessage, sendMessage]);
  return (
    <div className="w-full flex justify-start flex-row">
      <div
        className={`bg-gray-700 h-screen sticky max-md:fixed left-0 top-0 overflow-hidden transition-all duration-500 whitespace-nowrap z-20 ${
          isOpen ? "w-[500px] max-md:w-full" : "w-0"
        }`}
      >
        <div>
          <div className="flex flex-col p-2 border-b">
            <span className="text-white">
              <span className="text-yellow-300 mr-2">You:</span>
              <span className="font-bold text-slate-200">
                {allUsers
                  ?.filter((id) => id?._id == currentUser)
                  .map((d) => d.userName)}
              </span>
            </span>
            <span className="text-green-300">
              {allUsers?.find((user) =>
                status.find((s) => s.userId === user._id)
              )
                ? "Online"
                : "Offline"}
            </span>
          </div>
          <Conversation
            users={allUsers}
            status={status}
            currentUser={currentUser}
            setChatUser={setChatUser}
          />
        </div>
      </div>
      <div className="fixed z-20 right-3 top-[19px] text-xl text-stone-200">
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setIsOpen(!isOpen)}
          size="1x"
          cursor="pointer"
        />
      </div>
      <div className="w-full z-10">
        <Chatting
          chatUser={chatUser}
          currentUser={currentUser}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          createMessage={createMessage}
          setMessage={setMessage}
          message={message}
          chat={chat}
          setChat={setChat}
          status={status}
          setNewFile={setNewFile}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
