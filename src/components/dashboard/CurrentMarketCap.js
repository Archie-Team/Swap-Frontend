import React from 'react'
import { useState } from 'react'
import { CommaFormat } from '../../modules/formatNumbers'
import './CurrentMarketCap.css'

const CurrentMarketCap = () => {
    const [currentMarketCap, setCurrentMarketCap] = useState(200000000)

  return (
    <div className='bullcoin-state current-market-cap__container'>
        <p>Current Market Cap <span className="dash-span">-</span> <span> $ {CommaFormat(currentMarketCap)}</span></p>
    </div>
  )
}

export default CurrentMarketCap