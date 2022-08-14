import React, { useState } from "react";

const AuthContext = React.createContext({
  account: "",
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  const [account, setAccount] = useState("");


  const logoutHandler = () => {
    setAccount(null);
  };

  const loginHandler = (account) => {
    setAccount(account);
  };

  return (
    <AuthContext.Provider
      value={{
        account: account,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
