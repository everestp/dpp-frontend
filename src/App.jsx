import './App.css';
import { useState, useEffect } from 'react';
import { Contract, ethers } from 'ethers'; // ✅ Correct import
import abi from './contract/chai.json';
import Buy from './components/Buy/Buy';
import Memo from './components/Memo/Memo';


function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
   
  });
 const [account ,setAccount] = useState("None")
 const [balance,setBalance]= useState("0")
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
 window.ethereum.on("chainChanged",()=>{
  window.location.reload();
 })
 window.ethereum.on("accountChanged",()=>{
  window.location.reload();
 })
        // ✅ Correct instantiation
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const balance = await provider.getBalance("0xE9b7Fc2F89eFE7d4ADd3b05284b4dE8ad40a9660")
      setBalance(balance)
        setState({ provider, signer, contract});
        setAccount(contract.address)

      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    };

    connectWallet();
    



  
  }, [state,balance]);
  console.log(state)
  
  return (
    <>
    <h1>Total donation recived in Rs: <span style={{color :"blue"}}>{((ethers.utils.formatEther(balance))*502346.83).toFixed(2)}</span> </h1>
     <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px"
}}>
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#f0f4f8",
    padding: "12px 20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "Segoe UI, sans-serif",
    fontSize: "16px",
    color: "#333"
  }}>
    <span style={{ fontSize: "20px" }}>🔗</span>
    <p style={{ margin: 0 }}>
      {account ? `Connected Account: ${account}` : "Not Connected"}
    </p>
  </div>
</div>


    <Buy state={state}/>
    <Memo state={state}/>
    
    </>
  );
}

export default App;
