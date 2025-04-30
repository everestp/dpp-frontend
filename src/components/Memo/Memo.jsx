import React, { useState ,useEffect } from 'react'
import './Memo.css'
const Memo = ({state}) => {
  const [memos ,setMemos] = useState([])
  const {contract}= state;
  useEffect(() => {
   const memoMessage =  async()=>{
    
     const memos = await contract.getMemos()
     setMemos(memos)
   }
  contract && memoMessage();
   
  }, [contract])
  
  return (
    <div>
<table className="memo-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Message</th>
      <th>From</th>
      <th>Timestamp</th>
    </tr>
  </thead>
  <tbody>
    {memos.map((memo) => (
      <tr key={memo.timestamp}>
        <td>{memo.name}</td>
        <td>{memo.message}</td>
        <td>{memo.from}</td>
        <td>{new Date(memo.timestamp * 1000).toLocaleString()}</td>
      </tr>
    ))}
  </tbody>
</table>

   
    
         
        
    </div>
  )
}

export default Memo