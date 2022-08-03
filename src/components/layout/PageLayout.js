import Header from "./Header";
import { Fragment, useContext, useEffect } from "react";
import "./PageLayout.css";
// import { networksId } from "../../modules/networks";
// import NetworkMessage from "./NetworkMessage";
import AuthContext from "../../context/auth-context";
import { getCurrentChainId } from "../../modules/web3Client";

const PageLayout = (props) => {
  const authCtx = useContext(AuthContext);

  useEffect (() => {
    const initialNetworkId= async() => {
      await getCurrentChainId().then((res) => {
        authCtx.onSetNetworkId(res);
      });
    }
    initialNetworkId()      
  }, [])
  

  return (
    <Fragment>
      <Header />
        <main className="main">{props.children}</main>
    </Fragment>
  );
};

export default PageLayout;
