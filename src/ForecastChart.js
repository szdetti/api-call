import React, { memo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
);

const ForecastChart = memo(({ forecast }) => {
  if (!forecast || forecast.length === 0) return null; // Handle empty forecast

  const data = {
    labels: forecast.map((day) => day.date),
    datasets: [
      {
        label: "3-Day Forecast (°C)",
        data: forecast.map((day) => day.avgTemp),
        backgroundColor: "rgb(250, 238, 172)",
        borderColor: "rgb(244, 222, 96)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Temperature (°C)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
});

export default ForecastChart;
