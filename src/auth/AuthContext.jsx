import { createContext, useEffect, useMemo, useState } from "react";
import JoblyApi from "../api";

export const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = "jobly_token";
const USERNAME_STORAGE_KEY = "jobly_username";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_STORAGE_KEY));
  const [username, setUsername] = useState(localStorage.getItem(USERNAME_STORAGE_KEY));

  // Sync token to API + localStorage
  useEffect(() => {
    JoblyApi.token = token || null;

    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  }, [token]);

  // Sync username to localStorage
  useEffect(() => {
    if (username) localStorage.setItem(USERNAME_STORAGE_KEY, username);
    else localStorage.removeItem(USERNAME_STORAGE_KEY);
  }, [username]);

  async function login(credentials) {
    const newToken = await JoblyApi.login(credentials);
    setToken(newToken);
    setUsername(credentials.username);
  }

  async function register(formData) {
    const newToken = await JoblyApi.register(formData);
    setToken(newToken);
    setUsername(formData.username);
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
      login,
      register, // ✅ THIS is what Register.jsx needs
      logout,
    }),
    [token, username]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}