import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const AuthContext = createContext([]);

function AuthProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(user);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
    if (currentUser) axios.defaults.headers.Authorization = `Bearer ${currentUser.token}`
  }, [currentUser])
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
