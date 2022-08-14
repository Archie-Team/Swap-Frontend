import Header from "./Header";
import { Fragment, useEffect } from "react";
import "./PageLayout.css";
import { useDispatch } from "react-redux";
import {  getCurrentNetworkId } from '../../store/network-actions';


const PageLayout = (props) => {
  const dispatch = useDispatch();

  useEffect (() => {
    const initialNetworkId= async() => {
      dispatch(getCurrentNetworkId())
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
