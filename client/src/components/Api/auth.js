import server from "./axiosClient";

const register = async (formData) => {
  try {
    await server.post("/register", formData);
    return (window.location.href = "/");
  } catch (error) {
    console.log(error);
  }
};

const login = async (formData) => {
  try {
    await server.post("/login", formData);
    return (window.location.href = "/");
  } catch (error) {
    console.log(error);
  }
};

export { register, login };
