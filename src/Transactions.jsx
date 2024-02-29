import React from 'react';
import { Link } from 'react-router-dom';
import './Transactions.css'

const Transactions = ({ transactions, setTransactions }) => {
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
    <div className="transactions-container"> {/* Apply transactions container style */}
      <h1 className='transaction-header'>Transactions</h1>
      {transactions.map(({ id, item_name, amount, date, from, category }) => (
      <div className='transaction-item'>
      <div className="transaction-all-details" key={id}> {/* Apply transaction item style */}
          <h3 className="transaction-title">Item Name: {item_name}</h3> {/* Apply transaction title style */}
          <p className="transaction-details">Date: {date}</p> {/* Apply transaction details style */}
          <p className="transaction-details">Amount: {amount}</p> {/* Apply transaction details style */}
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