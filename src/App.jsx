import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Transactions from './Transactions'
import TransactionDetails from './TransactionDetail'
import TransactionForm from './TransactionForm'
import TransactionChart from './TransactionChart'
import { Link } from 'react-router-dom'
import {Routes, Route} from "react-router-dom"
import './App.css'

const App = () => {
  // DEFINE USESTATE FOR TRANSACTIONS
  const [transactions, setTransactions] = useState([])
  
  // DEFINE USESTATE FOR CHART DATA/ MADE A FORM
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [{
      label: "Amount Gained",
      data: [],
    }]
  });
  // UPDATE CHART DATA WHEN TRANSACTION CHANGES
  useEffect(() => {
    // Update userData state based on transactions
    setUserData({
      labels: transactions.map((data) => data.item_name),
      datasets: [{
        label: "Amount Gained",
        data: transactions.map((data) => data.amount),
        backgroundColor:["blue", "red", "red", "red"],
      }]
    });
  }, [transactions])
  // FETCH TRANSACTIONS DATA FROM SERVER
  useEffect(() => {
    fetch("http://localhost:4000/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);


return (
  <div>
  <header className="w3-container w3-xlarge w3-padding-24">
    <Link to="/">
     <a href="#" className="w3-left w3-button w3-white">
      Budgeting App
    </a>
    </Link>
    <Link to="/new">
    <a href="#about" className="w3-right w3-button w3-white">
      Add Transaction
    </a>
    </Link>
  </header>
  
  <Routes>
        <Route path="/" element={<Transactions transactions={transactions} setTransactions={setTransactions} />} />
        <Route path="/:id" element={<TransactionDetails />} />
        <Route path="/edit/:id" element={<TransactionForm setTransactions={setTransactions} />} />
        <Route path="/new" element={<TransactionForm setTransactions={setTransactions} />} />
      </Routes>
      {/* <div className='chart-container'> */}
        <TransactionChart chartData={userData} />
      {/* </div> */}
      
    </div>
  );
}

export default App;
