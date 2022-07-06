import React from 'react'
import '../TokenFormStyle.css'
import {logos} from '../../modules/varibales'

const BULCPool = () => {
  return (
    <div className='token-container'>
        <div className='amount'>
            <div className="logo">
                <img src={logos.BULC} alt="" />
                <p className="">BULC</p>
            </div>
            <div className="form-group">
                <input type="number" name="" id="" placeholder='BULC' />
            </div>
        </div>
        <div className='balance'>
            <p>Balance :</p>
            <p className='balance-amount'>--</p>
        </div>
    </div>
  )
}

export default BULCPool