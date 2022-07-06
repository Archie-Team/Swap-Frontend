import React from 'react'
import { CommaFormat } from '../../modules/commaFormat'
import './TotalValue.css'

const TotalValue = ({totalValue}) => {
  return (
    <div className='total-value__container'>
        <p className='title'>Total Value Locked (TVL)</p>
        <p className='amount'>${CommaFormat(totalValue)}</p>
    </div>
  )
}

export default TotalValue