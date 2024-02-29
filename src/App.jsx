import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Transactions from './Transactions'
import TransactionDetails from './TransactionDetail'
import TransactionForm from './TransactionForm'
import { Link } from 'react-router-dom'
import {Routes, Route} from "react-router-dom"
import './App.css'

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [toggleDetails, setToggleDetails] = useState({ show: false, id:null})
  const [toggleForm, setToggleForm]= useState(false)
  const [edit, setEdit] = useState({ show: false, id:null})

useEffect (() => {
  fetch("http://localhost:4000/transactions")
  .then((res) => res.json())
  .then((data) => {
    setTransactions(data.transactions);
  })
}, [])

return (
  <div>
  <header className="w3-container w3-xlarge w3-padding-24">
     <a href="#" className="w3-left w3-button w3-white">
      Budgeting App
    </a>
    <Link to="/new">
    <a href="#about" className="w3-right w3-button w3-white">
      Create Transaction
    </a>
    </Link>
  </header>
  
  <Routes>
    <Route path="/"
    element={
    <Transactions 
      transactions={transactions} 
      setTransactions={setTransactions}
      setToggleDetails={setToggleDetails}
      edit={edit}
      setEdit={setEdit}
      />
      }
    />
    <Route 
      path="/:id" 
      element={
    <TransactionDetails 
      toggleDetails={toggleDetails}
      />
    }
    />
    <Route path="/edit/:id" element={
      <TransactionForm
        edit={edit}
        setEdit={setEdit}
        setTransactions={setTransactions}
        setToggleForm={setToggleForm}
        />
    }
    />
     <Route path="/new" element={
      <TransactionForm
        edit={edit}
        setEdit={setEdit}
        setTransactions={setTransactions}
        setToggleForm={setToggleForm}
      />
    }
      />
  </Routes>
  </div>
  )
}

export default App
