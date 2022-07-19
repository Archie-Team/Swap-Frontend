import React from 'react'
import './PoolStatus.css'
import { CommaFormat } from '../../modules/formatNumbers'

const Status = ({totalTokenSupply,marketCap,totalFrozen}) => {
 

  return (
    <div className='pool-status__container'>
        <p>BULC Status</p>
        <div className="seprator-line"></div>
        <div className='status-details'>
            <div>
                <p>Total Token Supply</p>
                <p className='amount'>{CommaFormat(totalTokenSupply)}</p>
            </div>
            <div>
                <p>Market Cap</p>
                <p className='amount'>${CommaFormat(marketCap)}</p>
            </div>
            <div>
                <p>Total Frozen</p>
                <p className='amount'>{CommaFormat(totalFrozen)}</p>
            </div>
        </div>
    </div>
  )
}

export default Status