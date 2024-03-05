import React, { useEffect } from 'react'
import { useState } from "react"
import { useParams } from 'react-router-dom'
import './TransactionDetail.css'

const TransactionDetails = () => {
    // USEPARAMS HOOK TO ALLOW ACCESS TO URL PARAMETERS
    const { id } = useParams();
    // USESTATE HOOK TO MANAGE STATE OF TRANSACTION DETAILS
    const [transactionDetail, setTransactionsDetail] = useState()
    // USEEFFECT HOOK TO FETCH TRANSACTION DETAILS WHEN ID CHANGES
    useEffect(() => {
        fetch(`http://localhost:4000/transactions/${id}`)
        .then((res) => res.json())
        .then((data) => setTransactionsDetail(data.transaction))
    }, [id])
    // IF TRANSACTIONDETAIL IS NOT AVAILABLE, RETURN NULL
    if (!transactionDetail) return null
    
    return (
      <div className="transaction-details-container">
        <h1 className="transaction-details-title">Transaction Details</h1>
        <p className="transaction-details-item"><b>Item:</b> {transactionDetail.item_name}</p>
        <p className="transaction-details-item"><b>Date:</b> {transactionDetail.date}</p>
        <p className="transaction-details-item"><b>Amount:</b> {transactionDetail.amount}</p>
        <p className="transaction-details-item"><b>From:</b> {transactionDetail.from}</p>
        <p className="transaction-details-item"><b>Category:</b> {transactionDetail.spent}</p>
        <p className="transaction-details-item"><b>Memo:</b> {transactionDetail.memo}</p>
      </div>
    );
  };

export default TransactionDetails