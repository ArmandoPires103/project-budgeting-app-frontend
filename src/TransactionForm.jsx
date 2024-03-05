import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './TransactionForm.css'

const TransactionForm = ({setTransactions}) => {
    // USENAVIGATE HOOK ALLOWS NAVIGATION WITHOUT PROPS
    const navigate = useNavigate();
    // USE PARAMS HOOK ALLOWS ACCESS TO URL PARAMETERS
    const { id } = useParams();
    // USESTATE HOOK TO MAKE FORM STATE
    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: "",
        date: "",
        from: "",
        category: "",
        memo: ""
    })
    // FUNCTION TO HANDLE INPUT CHANGE IN FORM
    function handleChange(e) {
        setTransaction({ ...transaction, [e.target.id]: e.target.value});
    }
    // FUNCTION TO HANDLE FORM SUBMISSION
    function handleSubmit(e){
        e.preventDefault();
        // CONVERT AMOUNT TO A NUMBER
        transaction.amount = +transaction.amount
        if (id) {
          // IF ID EXISTS, PERFORM A PUT REQUEST TO UPDATE THE TRANSACTION
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
            // IF ID DOESN'T EXIST, PERFORM A POST REUEST TO CREATE A NEW TRANSACTION
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
    // FUNCTION HANDLE CANCELLATION OF FORM SUBMISSION
    function handleCancel(){
        navigate("/")
    }
    // USEEFFECT HOOK TO FETCH TRANSACTION DATA WHEN ID CHANGES
    useEffect(() => {
        if (id) {
          fetch(`http://localhost:4000/transactions/${id}`)
            .then((res) => res.json())
            .then((data) => setTransaction(data.transaction));
        } else {
          // IF ID IS NOT PROVIDED RESET FORM
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
      <label htmlFor="spent">
        Category:
        <input
          onChange={handleChange}
          type="text"
          id="spent"
          name="spent"
          value={transaction.spent}
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