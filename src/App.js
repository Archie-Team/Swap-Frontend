import "./App.css";
import { Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PageLayout from "./components/layout/PageLayout";
import Swap from "./pages/Swap";
import Staking from "./pages/Staking";
import Pool from "./pages/Pool";
import { authActions } from "./store/auth-slice";
import { walletActions } from "./store/wallet-slice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { getCurrentAccount, getCurrentNetworkId } from "./store/wallet-actions";

function App() {
  const { ethereum } = window;
  const dispatch = useDispatch();

  const handleChainChanged = (chainId) => {
    dispatch(walletActions.setCurrentNetworkId(chainId));
    window.location.reload();
  };

  const handleAccountsChanged = (accounts) => {
    accounts[0]
      ? dispatch(authActions.login(accounts[0]))
      : dispatch(authActions.logout(0));
  };

  useEffect(() => {
    if (!ethereum) {
      toast.error("Please Install Metamask!");
    }

    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);
  }, []);

  useEffect(() => {
    //check current account and network
      dispatch(getCurrentNetworkId());
      dispatch(getCurrentAccount())
  }, []);


  return (
    <PageLayout className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/trade" exact>
          <Swap />
        </Route>
        <Route path="/farm" exact>
          <Staking />
        </Route>
        <Route path="/pool" exact>
          <Pool />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </PageLayout>
  );
}

export default App;
