import React, { useState } from 'react';

const CoinContext = React.createContext({
  account: '',
  onLogout: () => {},
  onLogin: () => {}
});

export const CoinContextProvider = (props) => {
  const [account, setAccount] = useState('');

  const logoutHandler = () => {
    setAccount(null);
  };

  const loginHandler = (account) => {
    setAccount(account);
  };

  return (
    <CoinContext.Provider
      value={{
        account: account,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContext;