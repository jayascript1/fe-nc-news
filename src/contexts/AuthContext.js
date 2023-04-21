import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const users = [
    { username: 'cooljmessy' },
    { username: 'weegembump' },
    { username: 'happyamy2016' }
  ];

  const login = (username) => {
    const user = users.find((user) => user.username === username);
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const authValue = {
    currentUser,
    login,
    logout
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};
