import { createContext, useState, useContext, useEffect } from 'react'
import * as authApi from '../api/auth.js'

export const authContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (formData) => {
    setLoading(true);
    const response = await authApi.login(formData);
    if (response?.data) setUser(response.data);
    setLoading(false);
    return response;
  }

  const signUp = async (formData) => {
    setLoading(true);
    const response = await authApi.signUp(formData);
    if (response?.data) setUser(response.data);
    setLoading(false);
    return response;
  }

  const logout = async () => {
    setLoading(true);
    const response = await authApi.logout();
    setUser(null);
    setLoading(false);
    return response;
  }

  useEffect(() => {
    authApi.getCurrentUser(setUser, setLoading);
  }, []);


  return (
    <authContext.Provider value={{ user, setUser, loading, login, signUp, logout }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider;

export const useAuth = () => {
  return useContext(authContext);
}