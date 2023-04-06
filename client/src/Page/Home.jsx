import React from "react";
import { Link } from "react-router-dom";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex justify-between w-max items-center gap-x-16 max-md:flex-col">
        <div className="max-md:order-2">
          <ul className="flex justify-center flex-col gap-y-1">
            <li className="text-white font-medium text-lg">
              <FontAwesomeIcon icon={faCircleCheck} color="green" size="1x" />
              <span className="mx-3">Easy to Chat</span>
            </li>
            <li className="text-white font-medium text-lg">
              <FontAwesomeIcon icon={faCircleCheck} color="green" size="1x" />
              <span className="mx-3">Good Security</span>
            </li>
            <li className="text-white font-medium text-lg">
              <FontAwesomeIcon icon={faCircleCheck} color="green" size="1x" />
              <span className="mx-3">Have Fun Emoji</span>
            </li>
            <li className="w-full mt-2 flex justify-center">
              <Link
                className="bg-orange-200 p-1 rounded px-2 w-full text-center text-gray-800"
                to="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <img
            src="/chat.png"
            alt="chat"
            className="w-72 h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
