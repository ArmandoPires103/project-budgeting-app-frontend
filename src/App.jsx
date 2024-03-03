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
  const [transactions, setTransactions] = useState([])
  
  // BARCHART
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [{
      label: "Amount Gained",
      data: [],
    }]
  });

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

  useEffect(() => {
    // Update userData state based on transactions
    setUserData({
      labels: transactions.map((data) => data.date),
      datasets: [{
        label: "Amount Gained or lost",
        data: transactions.map((data) => data.dates),
        backgroundColor:["red"]
      }]
    });
  }, [transactions])

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
    <Route path="/"
    element={
    <Transactions 
      transactions={transactions} 
      setTransactions={setTransactions}
      />
      }
    />
    <Route 
    path="/:id" 
    element={
    <div>
      <TransactionDetails />
      <div className='chart-details'>
        <div style={{ width: 900 }}>

        </div>
      <TransactionChart chartData={userData} />
      </div>
    </div>
    }
    />
    <Route path="/edit/:id" element={
      <TransactionForm
        setTransactions={setTransactions}
        />
    }
    />
     <Route path="/new" element={
      <TransactionForm
        setTransactions={setTransactions}
      />
    }      
    />
  </Routes>
    
  </div>
  )
}

export default App
