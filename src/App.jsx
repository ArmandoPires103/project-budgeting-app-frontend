import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Transactions from './transactions'

const App = () => {
  const [transactions, setTransactions] = useState([])

useEffect (() => {
  fetch("http://localhost:4000/transactions")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setTransactions(data.transactions);
  })
}, [])

  return (
  <div>
    <h1>Budgeting App</h1>
    <Transactions 
      transactions={transactions} 
      setTransactions={setTransactions}
      />
    </div>
  )
}

export default App
