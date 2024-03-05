import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Transactions.css'

const Transactions = ({ transactions, setTransactions }) => {
  // A USESTATE TO HOLD TOTAL OF TRANSACTIONS
  const [totalAmount, setTotalAmount] = useState(0);
  // USEEFFECT TO CALCULATE
  useEffect(() => {
    let total = 0;
    transactions.forEach(transaction => {
      total += transaction.amount
    });
    setTotalAmount(total)
  }, [transactions])

  // CSS TOTAL CHANGER

  let totalNum = ''
  if (totalAmount > 100) {
    totalNum = 'green'
  } else if (totalAmount >= 0) {
    totalNum = 'yellow'
  } else {
    totalNum = 'red'
  }

  if (transactions.length === 0) return null;

  function handleDelete(id) {
    const options = {
      method: "DELETE"
    };
    fetch (`http://localhost:4000/transactions/${id}`, options)
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions))
  }

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