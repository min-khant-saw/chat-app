const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const upload = require("./Controller/FileSystem/storage");
const path = require("path");
const app = express();

require("dotenv").config();

mongoose.connect(`${process.env.MONGO_DB}`);

app.use(express.static(path.join(__dirname, "Storage")));

app.use(upload.single("image"));

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());

const user = require("./Router/user.js");
const profile = require("./Router/profile");
const users = require("./Router/allUser");
const chat = require("./Router/chat");
const message = require("./Router/message");

app.use("/api", user);
app.use("/api/profile", profile);
app.use("/api/users", users);
app.use("/api/chat", chat);
app.use("/api/message", message);

app.listen(process.env.PORT, () => {
  console.log(`Listening on: http://localhost:${process.env.PORT}`);
});

let activeUsers = [];

const socketServer = require("socket.io");
const io = new socketServer.Server(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.clear();
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", data?.receiverId);
    console.log("Data: ", data);

    activeUsers.find((user) =>
      console.log("User :", user.userId === receiverId)
    );
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});
