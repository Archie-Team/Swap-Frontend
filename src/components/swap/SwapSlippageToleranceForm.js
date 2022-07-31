import React, { useState } from "react";
import "./SwapSlippageToleranceForm..css";
const SwapSlippageToleranceForm = ({ onSubmitslippageToleranceAmount }) => {
  const [slippageTolerance, setSlippageTolerance] = useState("");

  function submitslippageToleranceAmount(e) {

    onSubmitslippageToleranceAmount(slippageTolerance);
  }

  function changeInputHandler(e) {
    setSlippageTolerance(e.target.value);
  }

  return (
    <form className="slippage-tolerance__form">
      <label htmlFor="Slippage Tolerance">Slippage Tolerance</label>

      <div className="form-group">
        <input
          type="text"
          value={slippageTolerance}
          onChange={changeInputHandler}
          name="slippageTolerance"
          placeholder="1.00"
        />
        %
        <button onClick={submitslippageToleranceAmount} type="button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SwapSlippageToleranceForm;
