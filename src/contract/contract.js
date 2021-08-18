import React, { useState } from 'react'

import Web3 from "web3";
import ercContractAbi from './ercContractAbi.json'
import bscContractAbi from './bscContractAbi.json'


export const EthContext = React.createContext({})

export default function EthProvider(props) {
  const [accounts, setAccounts] = useState('');
  const [ethereum, setEthereum] = useState('');
  const [onboardButton, setOnboardButton] = useState(false)
  const [onboarding, setOnboarding] = useState(false)
  const [amount,setAmount] = useState('');


 const forwarderOrigin = "http://localhost:9010";
// eth token

 const erc_contract_address = "0x6Acf6987f25F0cD0FeA0F62fB049B31dF3227E0f";

// bsc token

const bsc_contract_address = "0x7591B56aA403b4c6E6F7bfb2D53A915e8aDC93d3";

// bsc contract
// const bsc_bridge_contract_address = "0xab7094B03EC08461993aFA09a650fbd05881E40D";


   const initialize = async () => {
  let accounts;
  const isMetaMaskConnected = () => accounts && accounts.length > 0;

  //Created check function to see if the MetaMask extension is installed
   const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;

    return Boolean(ethereum && ethereum.isMetaMask);
  };

   const MetamaskClientCheck = async () => {
    //Now we check to see if Metmask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      //onboardButton.innerText = 'Click here to install MetaMask!';
      onClickInstall();
    } else if (!isMetaMaskConnected()) {
      //If MetaMask is installed we ask the user to connect to their wallet
      //onboardButton.innerText = 'Connect';
      onClickConnect();
    } else {
      //callRegister();
    }
  };

  // const onboarding = new MetamaskOnboarding({ forwarderOrigin });
  MetamaskClientCheck();
  checkConnected();
  ethTokenBalance();
  bscTokenBalance();
  setInterval(function () {
    bscTokenBalance();
  }, 5000);
  setInterval(function () {
    ethTokenBalance();
  }, 5000);
};

 const checkConnected = async () => {
  /* web3.eth.getAccounts().then(function(result){
			$('.user_address').text(result[0]);
			const myAddress = result[0];
			return result[0]
			console.log(myAddress);
		}); */
  accounts = await ethereum.request({ method: "eth_requestAccounts" });
  var userAddr = accounts[0];
  console.log("userAddr",userAddr);
};

//This will start the onboarding proccess
 const onClickInstall = () => {
  onboardButton.innerText = "Onboarding in progress";
  onboardButton.disabled = true;
  //On this object we have startOnboarding which will start the onboarding process for our end user
  onboarding.startOnboarding();
};

 const ethTokenBalance = async () => {
  try {
    //Will Start the MetaMask Extension
    accounts = await ethereum.request({ method: "eth_requestAccounts" });

    var walletAddr = accounts[0];

    //var web3 = new Web3(Web3.givenProvider);
    var web3 = new Web3(
      "https://rinkeby.infura.io/v3/e71dbab6e6a0441a8b112984b59a080e"
    );

    var EthToken = new web3.eth.Contract(
      ercContractAbi,
      erc_contract_address
    );

    await EthToken.methods.balanceOf(walletAddr).call(function (err, result) {
      if (result) {
        var showBalance = result / 1000000000000000000;
        showBalance = showBalance.toFixed(2);
        ("#eth_bal").html(showBalance);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

 const bscTokenBalance = async () => {
  try {
    //Will Start the MetaMask Extension
    accounts = await ethereum.request({ method: "eth_requestAccounts" });

    var walletAddr = accounts[0];

    // var web3 = new Web3(Web3.givenProvider);
    var web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

    var EthToken = new web3.eth.Contract(
		bscContractAbi,
      bsc_contract_address
    );

    await EthToken.methods.balanceOf(walletAddr).call(function (err, result) {
      if (result) {
        var showBalance = result / 1000000000000000000;
        showBalance = showBalance.toFixed(2);
        // ("#bsc_bal").html(showBalance);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

 const ethToBscTransfer = async () => {
  try {
    //Will Start the MetaMask Extension
    accounts = await ethereum.request({ method: "eth_requestAccounts" });

    var walletAddr = accounts[0];

    var chainId = await ethereum.request({ method: "eth_chainId" });

    chainId = parseInt(chainId, 16);

    if (chainId !== 4) {
      alert("Please select Rinkeby Ethereum Chain");
      return false;
    }

    let inputVal = document.getElementById("eth_to_bsc");
    let inputAmt = inputVal.value;
    setAmount(inputAmt);
    var web3 = new Web3(Web3.givenProvider);

    var EthToken = new web3.eth.Contract(
      ercContractAbi,
      erc_contract_address
    );

    var weiAmt = 1000000000000000000 * amount;
    var hexaDecimal = "0x" + weiAmt.toString(16);
    var toAddress = "0xe129D77Ec3bCDC7c6F51A87E4b8d0C068123470a";
    await EthToken.methods
      .transfer(toAddress, hexaDecimal)
      .send({ from: walletAddr }, function (err, result) {
        if (err !== null) {
          console.log(err);
        } else {
          var ethShowLink = "https://rinkeby.etherscan.io/tx/" + result;

          console.log(ethShowLink);
        }
        console.log(result);
      });
  } catch (error) {
    console.log(error);
  }
};

const handleChange = (event) => {
  setAmount(event.target.value);
}


 const bscToEthTransfer = async () => {
  try {
    //Will Start the MetaMask Extension
    accounts = await ethereum.request({ method: "eth_requestAccounts" });

    var chainId = await ethereum.request({ method: "eth_chainId" });
    chainId = parseInt(chainId, 16);

    if (chainId !== 97) {
      alert("Please connect to Binance Smart Chain Testnet");
      return false;
    }

    var walletAddr = accounts[0];
    // let inputVal = document.getElementById("bsc_to_eth_amt");
    let inputVal;
    let inputAmt = inputVal.value;
    setAmount(inputAmt);
    var web3 = new Web3(Web3.givenProvider);

    var BscBridge = new web3.eth.Contract(
		bscContractAbi,
      bsc_contract_address
    );

    var weiAmt = 1000000000000000000 * amount;
    var hexaDecimal = "0x" + weiAmt.toString(16);

    await BscBridge.methods
      .burn(hexaDecimal)
      .send({ from: walletAddr }, function (err, result) {
        if (err !== null) {
        } else {
          var ethShowLink = "https://bscscan.com/tx/" + result;
          console.log(ethShowLink);
        }
        console.log(result);
      });
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

 const onClickConnect = async () => {
  try {
    //Will Start the MetaMask Extension
    accounts = await ethereum.request({ method: "eth_requestAccounts" });
    var userAddr = accounts[0];
    console.log("userAddr",userAddr);
    //addrVal.innerHTML = accounts[0];
    //callRegister();
  } catch (error) {
    console.error(error);
  }
};

<button onClick={window.initialize}>
  Activate Lasers
</button>

// window.addEventListener("DOMContentLoaded", initialize);

return (
  <EthContext.Provider
    value={{bscToEthTransfer,amount,ethToBscTransfer,handleChange}}
  >
    {props.children}
  </EthContext.Provider>
)
}

