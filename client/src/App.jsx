import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import server from "./components/Api/axiosClient";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Chat from "./Page/Chat";

export const UserID = createContext();

const App = () => {
  const [id, setId] = useState("");
  useEffect(() => {
    server
      .get("/profile")
      .then((res) => setId(res.data))
      .catch((err) => setId(err.message));
  }, []);
  return (
    <div className="w-full bg-gray-800 min-h-screen">
      <UserID.Provider value={id}>
        <Routes>
          <Route
            path="/"
            element={
              id === "Request failed with status code 401" ? (
                <>No user</>
              ) : (
                <Chat />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserID.Provider>
    </div>
  );
};

export default App;
