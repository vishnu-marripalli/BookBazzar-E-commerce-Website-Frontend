import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ApiCall from '../lib/ApiCall';
Chart.register(ArcElement, Tooltip, Legend);

const OrderStatsChart = () => {
  const [orderData, setOrderData] = useState({
    pending: { count: 0, totalAmount: 0 },
    successful: { count: 0, totalAmount: 0 },
  });

  // Fetch data function
  const fetchOrderStats = async () => {
    try {
      const res = await ApiCall({
        // url: 'http://localhost:8000/api/v1/order/orderstats',
        url: 'https://bookbazzar-backend.onrender.com/api/v1/order/orderstats',
        method: 'POST',
        data: { role: 'User' },
      });
      console.log(res.data)
      setOrderData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch order stats:", error);
    }
  };

  useEffect(() => {
    fetchOrderStats();
  }, []);

  const data = {
    labels: ['Pending Orders', 'Successful Orders'],
    datasets: [
      {
        label: 'Order Count',
        data: [orderData.pending.count, orderData.successful.count],
        backgroundColor: ['#937DC2', '#4CAF50'],
        borderColor: ['#000000', '#000000'],
        borderWidth: 1,
      },
      {
        label: 'Total Amount',
        data: [orderData.pending.totalAmount, orderData.successful.totalAmount],
        backgroundColor: ['#FFCC00', '#00CC99'],
        borderColor: ['#000000', '#000000'],
        borderWidth: 1,
        hidden: true, // Display only when toggled on
      },
    ],
  };

  return (
    <div className="bg-white p-4 m-auto my-5 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-black text-2xl font-semibold text-center mb-4">
        Order Statistics
      </h2>
      <Doughnut data={data} options={{
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#000000',
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const { label, raw } = tooltipItem;
                return `${label}: ${raw} ${tooltipItem.datasetIndex === 0 ? 'orders' : '₹'}`;
              },
            },
          },
        },
      }} />
    </div>
  );
};

export default OrderStatsChart;
