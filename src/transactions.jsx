import React from 'react';

const Transactions = ({ transactions, setTransactions }) => {
  return (
    <div>
      <h1>Transactions</h1>
      {transactions.map(({ id, item_name, amount, date, from, category }) => (
        <div key={id}>
          <h3>Item Name: {item_name}</h3>
          <p>Amount: {amount}</p>
          <p>Date: {date}</p>
          <p>From: {from}</p>
          <p>Category: {category}</p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
