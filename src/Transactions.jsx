import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Transactions.css'
//  DEFINE FUNCTION TRANSACTIONS
const Transactions = ({ transactions, setTransactions }) => {
  // A USESTATE TO HOLD TOTAL OF TRANSACTIONS
  const [totalAmount, setTotalAmount] = useState(0);
  // USEEFFECT HOOK TO RUN SOME CODE AFTER EVERY RENDER
  useEffect(() => {
    // DECLARE A VARIABLE TOTAL AND INITIALIZE IT TO 0
    let total = 0;
    // ITERATE THROUGH EACH TRANSACTIONS IN TRANSACTIONS ARRAY
    transactions.forEach(transaction => {
      // ADD THE AMOUNT OF EACH TRANSACTION TO THE TOTAL
      total += transaction.amount
    });
    // UPDATE THE TOTALAMOUNT STATE WITH THE CALCULATED TOTAL
    setTotalAmount(total)
    // USEEFFECT WILL RUN WHENEVER THE TRANSACTIONS ARRAY CHANGES
  }, [transactions])

  // CSS TOTAL CHANGER
  // DETERMINE THE CSS CLASS FOR THE TOTAL AMOUNT CASED ON TOTALAMOUNT
  let totalNum = ''
  if (totalAmount > 100) {
    totalNum = 'green'
  } else if (totalAmount >= 0) {
    totalNum = 'yellow'
  } else {
    totalNum = 'red'
  }

  // IF THERE ARE NO TRANSACTIONS, RETURN NULL
  if (transactions.length === 0) return null;

  // FUCNTION TO DELETE TRANSACTIONS
  function handleDelete(id) {
    // DEFINE OPTIONS FOR THE FETCH REQUEST
    const options = {
      method: "DELETE"
    };
    // SEND A DELETE REQUEST TO SERVER TO DELETE THE TRANSACTION WITH THE ID
    fetch (`http://localhost:4000/transactions/${id}`, options)
      // PARSE THE RESPONSE AS JSON
      .then((res) => res.json())
      // UPDATE THE TRANSACTIONS STATE WITH THE UPDATED DATA 
      .then((data) => setTransactions(data.transactions))
  }
  // RENDER TRANSACTION COMPONENT
  return (
    <div className="transactions-container"> 
      <h1 className='transaction-header'>Transactions</h1>
      <div className='total-amount'>
        Total Amount: <span className={`${totalNum}`}>{totalAmount}</span>
      </div>
      {transactions.map(({ id, item_name, amount, date}) => (
      <div className='transaction-item' key={id}>
      <div className="transaction-all-details" >
          <h3 className="transaction-title">Item Name: {item_name}</h3>
          <p className="transaction-details">Date: {date}</p> 
          <p className="transaction-details">Amount: {amount}</p> 
      </div>
      <div className='transaction-buttons'>
          <Link to={`/${id}`}>
            <button className="transaction-button">Details</button> 
          </Link>
          <Link to={`/edit/${id}`}>
            <button className="transaction-button">Edit</button> 
          </Link>
          <button className="transaction-button delete-button" onClick={() => handleDelete(id)}>Delete</button> 
      </div>
      </div>
    ))} 
      
    </div>
  );
};

export default Transactions;