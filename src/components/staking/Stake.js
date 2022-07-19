import React from "react";
import "./Stake.css";

const Stake = ({ monthNumber, APRAmountPersent }) => {
  return (
    <div class="stake_form_field">
      <div>
        <div className="stake_form-group">
          <label class="stake-title">
            {monthNumber} Months - {APRAmountPersent}% APR
          </label>

          <input
            data-index="2"
            id="stake_field_1"
            name="stake_field_1"
            placeholder="0"
            type="text"
            autocomplete="off"
          />
        </div>
      </div>
      <p class="stake_balance">
        Balance: <span class="balance_bulc">--</span>
      </p>
    </div>
  );
};

export default Stake;
