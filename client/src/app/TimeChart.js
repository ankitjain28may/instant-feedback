import React from 'react';
import { css } from 'astroturf';
import Chart from 'chart.js';
import { DateTime } from "luxon";

const styles = css`
  .chart {
    width: 500px;
  }
`;

function computeTimeSheet(tweets) {
  const timeSheet = {};
  tweets.forEach(tweet => {
    const createdTime = tweet.created_at;
    const dt = DateTime.fromSQL(createdTime);
    const formattedTime = dt.toLocaleString({ month: 'long', day: 'numeric' });
    const count = timeSheet[formattedTime] || 0;
    timeSheet[formattedTime] = count + 1;
  });

  return timeSheet;
}

function TimeChart({ tweets }) {
  const canvasRef = React.useRef();
  const timeSheet = computeTimeSheet(tweets);

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const barChartData = {
      labels: Object.keys(timeSheet),
      datasets: [
        {
          label: 'Date of Tweet',
          backgroundColor: '#1fab89',
          borderWidth: 0,
          fill: false,
          lineTension: 0,
          borderColor: '#1fab89',
          borderWidth: 4,
          data: Object.values(timeSheet),
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: 'line',
      data: barChartData,
      options: {
        tooltips: {
          enabled: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  });

  return (
    <div className={styles.chart}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export { TimeChart };
