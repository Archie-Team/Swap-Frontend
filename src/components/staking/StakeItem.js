import React, { useEffect, useState } from "react";
import "./StakeItem.css";

const Stake = ({ stake,onChangeStakeItem,unselectedStakeAmount }) => {
const [value, setValue] = useState('')
const changeStakeItem =(e) => {
  setValue(e.target.value)
  onChangeStakeItem({value:e.target.value,choice:stake.choice})
}

useEffect(() => {
  if(value !== 0){
    setValue(unselectedStakeAmount)
  }  
}, [unselectedStakeAmount])


  return (
    <div className="stake_form_field">
      <div>
        <div className="stake_form-group">
          <label className="stake-title">
            {stake.monthNumber} Months - {stake.APRAmountPersent}% APR
          </label>
          <input
            data-index="2"
            id="stake_field_1"
            name="stake_field_1"
            placeholder="0"
            type="number"
            value={value}
            onChange={changeStakeItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Stake;
