import React, { useState } from "react";
import "./Buy.css"; // ✅ Import external styling
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    amount :"",
   
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const buyChai = async (event) => {
    event.preventDefault();
    console.log("Buying chai for:", formData);
  
    const {contract} = state;
    const {name ,message} = formData
    console.log(name)
    console.log(message)
    console.log(contract)
    const amountIneth =(formData.amount/502346.83).toFixed(5)
    if(amountIneth==0){
      amountIneth =0.00001
    }
    console.log("this is the amoubt ui eht",amountIneth)
    const amount = {value:ethers.utils.parseEther(`${amountIneth}`)}
    const transaction = await contract.buyChai(name,message ,amount)
console.log("This is th e amount in Rs",amount)
    await transaction.wait();
    console.log("trannsaction is Done")
  };

  return (
    <div className="buy-container">
      <h1>Dapp for Supporting Creator</h1>
      <h2>Buy me a COffee ☕</h2>
      <form onSubmit={buyChai}>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Enter your name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="message">Message</label>
        <input 
          type="text" 
          id="message" 
          name="message" 
          placeholder="Enter a message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        />
 <label htmlFor="message">Amount -Rs</label>
        <input 
          type="number" 
          id="amount" 
          name="amount" 
          placeholder="Enter a amount in Rs" 
          value={formData.amount} 
          onChange={handleChange} 
          required 
        />
        <button type="submit"  disabled={!state.contract}>Pay</button>
      </form>
    </div>
  );
};

export default Buy;