import Header from "./Header";
import { Fragment,useContext } from "react";
import "./PageLayout.css";
import { networksId } from "../../modules/networks";
import NetworkMessage from "./NetworkMessage";
import AuthContext from "../../context/auth-context";

const PageLayout = (props) => {
   const authCtx = useContext(AuthContext)

  return (
    <Fragment>
      <Header />
      {authCtx.networkId === networksId.testNetworkId ? (
        <main className="main">{props.children}</main>
      ) : (
        <NetworkMessage />
      )}{" "}
    </Fragment>
  );
};

export default PageLayout;
