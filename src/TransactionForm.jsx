import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './TransactionForm.css'

const TransactionForm = ({setTransactions}) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: "",
        date: "",
        from: "",
        category: "",
        memo: ""
    })
    function handleChange(e) {
        setTransaction({ ...transaction, [e.target.id]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        transaction.amount = +transaction.amount
        if (id) {
            const options = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(transaction),
            };
      
            fetch(`http://localhost:4000/transactions/${id}`, options)
              .then((res) => res.json())
              .then((data) => setTransactions(data.transactions))
              .then(() => navigate("/"));
         
            } else {
            const options = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(transaction),
            };
      
            fetch("http://localhost:4000/transactions/", options)
              .then((res) => res.json())
              .then((data) => setTransactions(data.transactions))
              .then(() => navigate("/"));
          }
        }

    function handleCancel(){
        navigate("/")
    }
    
    useEffect(() => {
        if (id) {
          fetch(`http://localhost:4000/transactions/${id}`)
            .then((res) => res.json())
            .then((data) => setTransaction(data.transaction));
        } else {
          setTransaction({
            item_name:"",
            amount:"",
            date:"",
            from:"",
            category:"",
            memo:""
          });
        }
      }, [id]);


  return (
    <div className="transaction-form">
    <h1>Transaction Form</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="item_name">
       Item Name:
       <input
       onChange={handleChange}
       type="text"
       id="item_name"
       name="item_name"
       value={transaction.item_name}
       />
      </label>
      <label htmlFor="amount">
        Amount:
        <input
          onChange={handleChange}
          type="number"
          id="amount"
          name="amount"
          value={transaction.amount}
        />
      </label>
      <label htmlFor="date">
        Date:
        <input
          onChange={handleChange}
          type="text"
          id="date"
          name="date"
          value={transaction.date}
        />
      </label>
      <label htmlFor="from">
        From:
        <input
          onChange={handleChange}
          type="text"
          id="from"
          name="from"
          value={transaction.from}
        />
      </label>
      <label htmlFor="category">
        Category:
        <input
          onChange={handleChange}
          type="text"
          id="category"
          name="category"
          value={transaction.category}
        />
      </label>
      <label htmlFor="memo">
        Memo:
        <input
          onChange={handleChange}
          type="text"
          id="memo"
          name="memo"
          value={transaction.memo}
        />
      </label>
      <button>Submit</button>
    </form>
    <button onClick={handleCancel}>Cancel</button>
  </div>
);
};
export default TransactionForm