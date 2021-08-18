import React, {useContext, useState } from 'react'
import { EthContext } from "../contract/contract";

const Main = () => {
  const { bscToEthTransfer ,amount,ethToBscTransfer,handleChange} = useContext(EthContext);
  // const [amount,setAmount] = useState('');
  // console.log("bscToEthTransfer",bscToEthTransfer);

  return (
    <div className="main-container">
      <div className="container-card">
        <div className="erc-container">
          <div className="erc-balance-container">
            <h2>BIRD ERC20 Balance </h2>
            <h2>0:00</h2>
          </div>
          <div className="input-main-container">
            <div className="input-container">
              <label htmlFor="erc20value">From</label>
              <input
                className="input-amount"
                type="number"
                placeholder="ERC20"
                id="erc20value"
                value={amount}
              />
            </div>
            <i class="arrow-icon fas fa-exchange-alt"></i>
            <div className="input-container">
              <label htmlFor="bep20value">To</label>
              <input
                className="input-amount"
                type="number"
                placeholder="BEP20"
                id="bep20value"
                value={amount}
              />
            </div>
          </div>
          <button className="swap-btn" onClick={ethToBscTransfer}>Swap</button>
        </div>
        <div className="erc-container">
          <div className="erc-balance-container">
            <h2>BIRD BEP20 Balance </h2>
            <h2>0:00</h2>
          </div>
          <div className="input-main-container">
            <div className="input-container">
              <label htmlFor="erc20">From</label>
              <input
                className="input-amount"
                type="number"
                placeholder="ERC20"
                id="erc20"
                value={amount} 
                onChange={handleChange}
              />
            </div>
            <i class="arrow-icon fas fa-exchange-alt"></i>
            <div className="input-container">
              <label htmlFor="bep20">To</label>
              <input
                className="input-amount"
                type="number"
                placeholder="BEP20"
                id="bep20"
                value={amount} 
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="swap-btn" onClick={bscToEthTransfer}>Swap</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
