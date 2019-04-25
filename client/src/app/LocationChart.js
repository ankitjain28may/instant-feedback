import React from 'react';
import { css } from 'astroturf';
import Chart from 'chart.js';

const styles = css`
  .chart {
    width: 500px;
  }
`;

function LocationChart({ cities, cityDstrb }) {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const barChartData = {
      labels: cities,
      datasets: [{
        label: 'Positive Feedback',
        backgroundColor: '#1fab89',
        borderWidth: 0,
        data: Object.values(cityDstrb.positive),
      }, {
        label: 'Negative Feedback',
        backgroundColor: '#ff847c',
        borderWidth: 0,
        data: Object.values(cityDstrb.negative),
      }]
    };

    const chart = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            }
          }]
        }
      },
    });
  });

  return (
    <div className={styles.chart}>
      <canvas ref={canvasRef}>
      </canvas>
    </div>
  );
}

export { LocationChart };
