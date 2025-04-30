import React, { useState } from "react";
import "./Buy.css"; // ✅ Import external styling
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    amount :""
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
    const amount = {value:ethers.utils.parseEther(`${formData.amount}`)}
    const transaction = await contract.buyChai(name,message ,amount)
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
 <label htmlFor="message">Amount</label>
        <input 
          type="number" 
          id="amount" 
          name="amount" 
          placeholder="Enter a amount" 
          value={formData.amount} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Buy Coffee ☕</button>
      </form>
    </div>
  );
};

export default Buy;