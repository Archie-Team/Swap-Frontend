import React from 'react'
import '../TokenFormStyle.css'
import BULC from '../../assets/images/BULKLogo.svg'



const BULCPool = ({onChangeInputHandler}) => {

    const changeInputHandler = (e) => {
        onChangeInputHandler({ name: e.target.name, value: e.target.value });
      };

  return (
    <div className='token-container'>
        <div className='amount'>
            <div className="logo">
                <img src={BULC} alt="" />
                <p className="">BULC</p>
            </div>
            <div className="form-group">
                <input type="number" onChange={changeInputHandler} name="BULCPool" id="" placeholder='BULC' />
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