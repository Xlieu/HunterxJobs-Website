import React, { useEffect, useState } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';

interface IndustryBenchmarkProps {
  userScore: number;
  industryAverage: number;
  topPerformers: number;
  industry: string;
}

const IndustryBenchmark: React.FC<IndustryBenchmarkProps> = ({
  userScore,
  industryAverage,
  topPerformers,
  industry,
}) => {
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    // Only load Chart.js on the client side
    const loadChart = async () => {
      if (typeof window !== 'undefined') {
        const { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } = await import('chart.js');
        const { Bar } = await import('react-chartjs-2');
        
        Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
        setChartLoaded(true);
      }
    };
    
    loadChart();
  }, []);

  // Calculate where user stands compared to industry
  const getUserStanding = () => {
    if (userScore >= topPerformers) {
      return {
        message: 'Exceptional Profile',
        description: `Your profile is among the top performers in the ${industry} industry. You've optimized your profile excellently.`,
        class: 'text-green-700',
      };
    } else if (userScore >= industryAverage) {
      return {
        message: 'Above Average',
        description: `Your profile scores above the ${industry} industry average, but there's still room to reach top performer status.`,
        class: 'text-blue-700',
      };
    } else {
      return {
        message: 'Below Average',
        description: `Your profile currently scores below the ${industry} industry average. We recommend applying the optimization suggestions.`,
        class: 'text-red-700',
      };
    }
  };

  const standing = getUserStanding();

  // Define chart data and options
  const chartData = {
    labels: ['Your Profile', 'Industry Average', 'Top Performers'],
    datasets: [
      {
        label: 'LinkedIn Profile Score',
        data: [userScore, industryAverage, topPerformers],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: false,
        text: 'LinkedIn Profile Score Comparison',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Score: ${context.raw}/100`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (out of 100)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Comparison Groups',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Industry Comparison
      </h3>
      
      <p className="text-gray-700 mb-6">
        See how your LinkedIn profile compares to others in the {industry} industry
      </p>
      
      <div className="h-64 mb-6">
        {chartLoaded ? (
          // Dynamically import and render the chart component only on client side
          <BarChart data={chartData} options={chartOptions} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">Loading chart...</p>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className={`font-medium text-lg ${standing.class} mb-2`}>
          {standing.message}
        </h4>
        <p className="text-gray-700">
          {standing.description}
        </p>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">{userScore}</div>
            <div className="text-sm text-gray-500">Your Score</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600">{industryAverage}</div>
            <div className="text-sm text-gray-500">Industry Average</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">{topPerformers}</div>
            <div className="text-sm text-gray-500">Top Performers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Client-side only component for the Bar chart
const BarChart = ({ data, options }: { data: ChartData<'bar'>, options: ChartOptions<'bar'> }) => {
  const { Bar } = require('react-chartjs-2');
  return <Bar data={data} options={options} />;
};

export default IndustryBenchmark; 