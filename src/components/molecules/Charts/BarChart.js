import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartContainer from './StyledChart';

const BarChart = ({ datasets, labels }) => {
  const chartData = {
    labels: labels, //remove val if key has the same name as var
    datasets: datasets,
  };

  return (
    <ChartContainer>
      <Bar
        data={chartData}
        height={700}
        width={800}
        options={{ //think about moving options to common file.
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 10,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 10,
                },
              },
            ],
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 20,
            },
          },
        }}
      />
    </ChartContainer>
  );
};

export default BarChart;
