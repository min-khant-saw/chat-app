import server from "../axiosClient";

const getAllUser = async (setUser) => {
  try {
    const user = await server.get("/users");
    return setUser(user.data);
  } catch (error) {
    console.log(error.message);
  }
};

const getChat = async (firstUser, secondUser, setChat) => {
  try {
    const chat = await server.get(`/chat/${firstUser}/${secondUser}`);
    return setChat(chat.data);
  } catch (error) {
    console.log(error.message);
  }
};

const getMessage = async (chatId, setMessage) => {
  try {
    const message = await server.get(`/message/${chatId}`);
    return setMessage(message.data);
  } catch (error) {
    console.log(error.message);
  }
};

const setNewChat = async (formData) => {
  try {
    const chat = await server.post("/chat", formData);
    return chat.data;
  } catch (error) {
    console.log(error.message);
  }
};

const addMessage = async (formData) => {
  try {
    const message = await server.post("message", formData);
    return console.log(message.data);
  } catch (error) {
    console.log(error.message);
  }
};

export { getAllUser, getChat, getMessage, setNewChat, addMessage };
