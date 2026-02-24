import { createContext, useEffect, useMemo, useState } from "react";
import JoblyApi from "../api";

export const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = "jobly_token";
const USERNAME_STORAGE_KEY = "jobly_username";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_STORAGE_KEY));
  const [username, setUsername] = useState(localStorage.getItem(USERNAME_STORAGE_KEY));
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Keep JoblyApi.token in sync + persist in localStorage
  useEffect(() => {
    if (token) {
      JoblyApi.setToken(token);
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      JoblyApi.setToken(null);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (username) localStorage.setItem(USERNAME_STORAGE_KEY, username);
    else localStorage.removeItem(USERNAME_STORAGE_KEY);
  }, [username]);

  // For now we just mark auth "loaded" immediately.
  // Later you can fetch current user here using token + username.
  useEffect(() => {
    setIsLoadingAuth(false);
  }, []);

  async function login(credentials) {
    const newToken = await JoblyApi.login(credentials);
    setToken(newToken);
    setUsername(credentials.username);
  }

  function logout() {
    setToken(null);
    setUsername(null);
  }

  const value = useMemo(
    () => ({
      token,
      username,
      isLoggedIn: !!token,
      isLoadingAuth,
      login,
      logout,
    }),
    [token, username, isLoadingAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}