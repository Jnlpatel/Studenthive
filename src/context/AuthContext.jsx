import { createContext, useState, useEffect } from 'react';
import * as api from '../api/fakeApi';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => { api.getProfile().then(setUser).catch(() => {}); }, []);

  const login = data => api.login(data).then(res => { setUser(res.user); return res; });
  const register = data => api.register(data).then(res => { setUser(res.user); return res; });
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); };
  const updateProfile = data =>
       api.updateProfile(data).then(u => {
        setUser(u);
        return u;
      });
  return <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>{children}</AuthContext.Provider>;
}
