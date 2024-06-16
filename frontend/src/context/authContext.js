import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const userLocalStr = JSON.parse(localStorage.getItem('user'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return userLocalStr?.accessToken ? true : false;
  });
  const [user, setUser] = useState(() => {
    return (userLocalStr?.accessToken) ? userLocalStr : null
  })

  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user)
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  // Get shared context
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };