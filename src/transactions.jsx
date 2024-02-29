import React from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>Transactions</h1>
      {transactions.map(({ id, item_name, amount, date, from, category }) => (
        <div key={id}>
          <h3>Item Name: {item_name}</h3>
          <p>Date: {date}</p>
          <p>Amount: {amount}</p>
          <Link to={`/${id}`}>
            <button>Details</button>
          </Link>
          <Link to={`/edit/${id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
