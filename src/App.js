import "./App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PageLayout from "./components/layout/PageLayout";
import Swap from "./pages/Swap";
import Staking from "./pages/Staking";
import Pool from "./pages/Pool";
import { AuthContextProvider } from "./context/auth-context";

function App() {

  return (
    <AuthContextProvider>
      <PageLayout className="App">
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
    </AuthContextProvider>
  );
}

export default App;
