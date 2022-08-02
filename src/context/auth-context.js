import React, { useState } from "react";

const AuthContext = React.createContext({
  account: "",
  networkId: 0,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  const [account, setAccount] = useState("");
  const [networkId, setNetworkId] = useState(0);


  const logoutHandler = () => {
    setAccount(null);
  };

  const loginHandler = (account) => {
    setAccount(account);
  };

  const setNetworkIdHandler = (id) => {
    setNetworkId(id);
  };

  return (
    <AuthContext.Provider
      value={{
        account: account,
        networkId : networkId,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSetNetworkId: setNetworkIdHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
