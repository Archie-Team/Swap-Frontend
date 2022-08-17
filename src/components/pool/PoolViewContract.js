import React from 'react'
import { addresses } from '../../modules/addresses'
import './PoolViewContract.css'
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";

const PoolViewContract = () => {
    
  return (
    <div className="link-to-address">
          <Link
            className="link"
            to={{
              pathname:
                "https://ropsten.etherscan.io/address/" +
                addresses.pair_address,
            }}
            target="_blank"
          >
            View Contract
            <BiLinkExternal className="icon" />
          </Link>
        </div>
  )
}

export default PoolViewContract
