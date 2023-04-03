import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";

const EmojiInput = ({
  newMessage,
  setNewMessage,
  setIsOpen,
  isOpen,
  createMessage,
}) => {
  return (
    <div className="w-full p-2">
      <div className="w-full flex justify-center gap-x-2">
        <div className="w-full mt-auto relative">
          <div className="flex gap-x-2">
            <input
              type="text"
              className="w-full h-max p-2 bg-transparent border border-gray-500 rounded text-stone-200 outline-none focus:ring-2 focus:ring-gray-600 transition-all"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message..."
            />
            <span
              className="absolute right-20 -mr-1 top-2 text-white/60 select-none cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FontAwesomeIcon icon={faSmile} size="xl" />
            </span>
            <button
              className="bg-slate-600 rounded p-2 px-5"
              onClick={createMessage}
            >
              <FontAwesomeIcon icon={faPaperPlane} color="white" />
            </button>
          </div>
        </div>
        <div className={`${isOpen ? "block" : "hidden"}`}>
          <EmojiPicker
            theme="dark"
            lazyLoadEmojis={true}
            onEmojiClick={(e) => setNewMessage((prev) => (prev += e.emoji))}
          />
        </div>
      </div>
    </div>
  );
};

export default EmojiInput;
