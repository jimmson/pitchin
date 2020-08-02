import { createContext } from "react";
import history from "./history";
import axios from "./axios";

export const login = async (email, password) => {
  const res = await axios.post("/api/auth/login", {
    email,
    password,
  });

  const { token, exp, admin } = res.data;

  localStorage.setItem("jwtToken", token);
  localStorage.setItem("jwtExpires", exp);
  localStorage.setItem("jwtAdmin", admin);

  history.push("/");
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("jwtExpires");
  localStorage.removeItem("jwtAdmin");

  history.push("/auth");
};

export const isLoggedInAdmin = () => {
  return isLoggedIn() && localStorage.getItem("jwtAdmin") === "true";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("jwtToken");
};

export const LoggedInContext = createContext({
  data: isLoggedInAdmin(),
  set: () => {},
});
