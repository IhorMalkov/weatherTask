import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const TemperatureChart: React.FC = () => {
  const dailyData = useSelector((state: RootState) => state.weather.dailyData);

  const chartData = {
    labels: dailyData.map((data) => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: dailyData.map((data) => data.temperature),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        min: 0,
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default TemperatureChart;
