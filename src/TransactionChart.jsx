// TransactionChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const TransactionChart = ({ transactionDetail }) => {
  // Extracting data from transactionDetail
  const { item_name, amount } = transactionDetail;

  // Chart data
  const data = {
    labels: [item_name],
    datasets: [
      {
        label: 'Amount',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [amount]
      }
    ]
  };

  // Chart options
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  return (
    <div className="transaction-chart">
      <h2>Transaction Amount Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionChart;
