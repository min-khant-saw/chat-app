import React, { useEffect, useState } from "react";
import Message from "./Message";
import EmojiInput from "./EmojiInput";
import Profile from "./Profile";
import { getChat, getMessage, setNewChat } from "../Api/chat/ChatUser";

const Chatting = ({
  chatUser,
  currentUser,
  newMessage,
  setNewMessage,
  createMessage,
  message,
  setMessage,
  chat,
  setChat,
  status,
  receiveMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const formData = new FormData();
  useEffect(() => {
    getChat(currentUser, chatUser?._id, setChat);
  }, [chatUser]);
  useEffect(() => {
    if (chatUser && chat === null) {
      formData.append("user1", currentUser);
      formData.append("user2", chatUser?._id);
      setNewChat(formData);
    }
    getMessage(chat?._id, setMessage);
  }, [chat, chatUser]);
  useEffect(() => {
    if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
      setMessage((msg) => {
        return [...msg, receiveMessage];
      });
      console.log(receiveMessage);
    }
  }, [receiveMessage]);
  const active = () => {
    const onlineUser = status?.some((id) => id?.userId == chatUser._id);
    return onlineUser;
  };

  return (
    <div className="w-full flex flex-col justify-between min-h-screen">
      {chatUser ? (
        <>
          <div className="p-2">
            <div className="sticky top-0 right-0 z-10 bg-gray-800">
              <Profile chatUser={chatUser} active={active()} />
            </div>
            <div>
              <Message message={message} currentUser={currentUser} />
            </div>
          </div>
          <div className="sticky bottom-0 left-0 bg-gray-800">
            <EmojiInput
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              createMessage={createMessage}
            />
          </div>
        </>
      ) : (
        <div className="text-center text-white text-2xl font-semibold flex flex-col justify-center items-center h-screen">
          No Conversation here...
        </div>
      )}
    </div>
  );
};

export default Chatting;
