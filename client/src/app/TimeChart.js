import React from 'react';
import { css } from 'astroturf';
import Chart from 'chart.js';
import { DateTime } from "luxon";

const styles = css`
  .chart {
    width: 500px;
  }
`;

function computeTimeData(tweets) {
  const timeSheet = {};
  const sortedCount = [];
  tweets.forEach(tweet => {
    const createdTime = tweet.created_at;
    const dt = DateTime.fromSQL(createdTime);
    const formattedTime = dt.toLocaleString({ month: 'long', day: 'numeric' });
    const count = timeSheet[formattedTime] || 0;
    timeSheet[formattedTime] = count + 1;
  });

  const sortedTime = Object.keys(timeSheet).sort();
  sortedTime.forEach(formattedTime => {
    sortedCount.push(timeSheet[formattedTime]);
  });

  return [sortedTime, sortedCount];
}

function TimeChart({ tweets }) {
  const canvasRef = React.useRef();
  const [sortedTime, sortedCount] = computeTimeData(tweets);

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const barChartData = {
      labels: sortedTime,
      datasets: [
        {
          label: 'Date of Tweet',
          backgroundColor: '#1fab89',
          borderWidth: 0,
          fill: false,
          lineTension: 0,
          borderColor: '#1fab89',
          borderWidth: 4,
          data: sortedCount,
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
