import React from "react";
import { addresses } from "../../modules/addresses";
import "./PoolViewContract.css";
import { BiLinkExternal } from "react-icons/bi";
// import { Link } from "react-router-dom";

const PoolViewContract = () => {
  return (
    <div className="link-to-address">
      <a
        className="link"
        href={
          "https://bscscan.com/address/" + //"https://ropsten.etherscan.io/address/" for test
          addresses.pair_address
        }
        target="_blank"
      >
        View Contract
        <BiLinkExternal className="icon" />
      </a>
    </div>
  );
};

export default PoolViewContract;
