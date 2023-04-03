import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { login } from "../Api/auth";

const reducer = (state, action) => {
  switch (action.type) {
    case "e":
      return { ...state, email: action.payload.email };
    case "p":
      return { ...state, password: action.payload.password };
    default:
      return { state };
  }
};

const Login = () => {
  const [state, loginForm] = useReducer(reducer, {
    email: "",
    password: "",
  });
  const formData = new FormData();
  const submit = (e) => {
    e.preventDefault();
    formData.append("email", state.email);
    formData.append("password", state.password);
    return login(formData);
  };
  return (
    <div className="w-full flex justify-center flex-col items-center h-screen">
      <form
        className="w-max flex flex-col justify-center gap-y-3 p-3 rounded shadow shadow-white/20"
        onSubmit={submit}
      >
        <span className="text-transparent bg-clip-text text-2xl font-medium text-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          Login
        </span>
        <div>
          <input
            type="email"
            className="bg-gray-500 text-white/80 font-medium placeholder:text-white p-2 border border-gray-300 outline-none focus:ring-4 dark:focus:ring-indigo-300 rounded transition-all"
            placeholder="Email"
            value={state.email}
            onChange={(e) =>
              loginForm({ type: "e", payload: { email: e.target.value } })
            }
            required
          />
        </div>
        <div>
          <input
            type="password"
            className="bg-gray-500 text-white/80 font-medium placeholder:text-white p-2 border border-gray-300 outline-none focus:ring-4 dark:focus:ring-indigo-300 rounded transition-all"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              loginForm({ type: "p", payload: { password: e.target.value } })
            }
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full transition-all focus:ring-2 dark:focus:ring-indigo-500 rounded font-medium text-white bg-gray-500/60 p-2"
          >
            Login
          </button>
        </div>
        <Link
          className="text-blue-400 ml-auto underline text-lg"
          to="/register"
        >
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
