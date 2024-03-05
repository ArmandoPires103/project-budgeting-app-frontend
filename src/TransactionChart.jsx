import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS } from 'chart.js/auto'

// DEFINE FUNCTION COMPONENT 
const TransactionChart = ({chartData}) => {
  console.log(chartData)
return (
  <div className="transaction-chart">
    <Bar data={chartData} />
  </div>
  );
};

export default TransactionChart;
