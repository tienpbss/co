import { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }, [])
  return (
    <AuthContext.Consumer value={ [currentUser, setCurrentUser] }>
      {children}
    </AuthContext.Consumer>
  )
}

export default AuthProvider
