import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  image: null,
  token: null,
  login: () => {},
  logout: () => {},
});
