import server from "./axiosClient";

const register = async (formData) => {
  try {
    const data = await server.post("/register", formData);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (formData) => {
  try {
    const data = await server.post("/login", formData);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export { register, login };
