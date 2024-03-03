// TransactionChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS } from 'chart.js/auto'

const TransactionChart = ({chartData}) => {
return (
  <div className="transaction-chart">
    <Bar data={chartData} />
  </div>
  );
};

export default TransactionChart;
