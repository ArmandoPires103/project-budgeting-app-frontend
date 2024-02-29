import React, { useEffect } from 'react'
import { useState } from "react"
import { useParams } from 'react-router-dom'

const TransactionDetails = () => {
    const { id } = useParams();
    const [transactionDetail, setTransactionsDetail] = useState()

    useEffect(() => {
        fetch(`http://localhost:4000/transactions/${id}`)
        .then((res) => res.json())
        .then((data) => setTransactionsDetail(data.transaction))
    })
    if (!transactionDetail) return null
  return (
    <div>
        <h1>transactionDetails</h1>
        <p>{transactionDetail.item_name}</p>
        <p>{transactionDetail.amount}</p>
        </div>
  )
}

export default TransactionDetails