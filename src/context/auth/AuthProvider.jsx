import React, { useState } from 'react'
import { users } from '../../data/users';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null);

  const login = (email,password) => {
    const registeredUser = users.find((user)=>user.email === email && user.password === password);
    if(!registeredUser) return false;
    setUser(registeredUser);
    return true;
  }
  const logout = () =>{
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider