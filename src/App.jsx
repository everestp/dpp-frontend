import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // ✅ Correct import
import abi from './contract/chai.json';
import Buy from './components/Buy/Buy';
import Memo from './components/Memo/Memo';


function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xC95a4bB33b180d3f639697d16485Dfc6c9362dE5";
      const contractAbi = abi.abi;

      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        // Request account access
        await ethereum.request({ method: "eth_requestAccounts" });

        // ✅ Correct instantiation
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        setState({ provider, signer, contract });

      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    };

    connectWallet();
    



  
  }, []);
  console.log(state)
  
  return (
    <>
    <Buy state={state}/>
    <Memo state={state}/>
    
    </>
  );
}

export default App;
