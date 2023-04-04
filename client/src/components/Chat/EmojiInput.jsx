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
    <div className="w-full p-2 relative max-md:p-0">
      <div className="w-full">
        <div className="w-full mt-auto max-md:mb-3">
          <div className="flex gap-x-2 max-md:mx-2 mt-2">
            <input
              type="text"
              className="w-full h-max p-2 bg-transparent border border-gray-500 rounded text-stone-200 outline-none focus:ring-2 focus:ring-gray-600 transition-all"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message..."
            />
            <span
              className="absolute right-20 -translate-x-1 translate-y-1 -mr-1 top-5 text-white/60 select-none cursor-pointer max-md:top-2 max-md:translate-y-0"
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
        <div
          className={`${
            isOpen ? "opacity-100 h-[350px]" : "opacity-0"
          } overflow-hidden absolute -top-72 h-0 -translate-y-16 right-5 transition-all duration-700 max-md:relative max-md:top-0 max-md:right-0 max-md:translate-y-0 max-md:w-full`}
        >
          <EmojiPicker
            theme="dark"
            lazyLoadEmojis={true}
            onEmojiClick={(e) => setNewMessage((prev) => (prev += e.emoji))}
            height={350}
            width={"auto"}
          />
        </div>
      </div>
    </div>
  );
};

export default EmojiInput;
