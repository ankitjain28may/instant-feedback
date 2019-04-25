import React from 'react';
import { css } from 'astroturf';
import classnames from 'classnames';

const styles = css`
  .path {
    will-change: auto;
    stroke-width: 20px;
    stroke-miterlimit: round;
    transition: stroke-dashoffset 850ms ease-in-out;
  }
`;

function RadialBar({ percentage, progressColor }) {
  const meterRef = React.useRef();

  React.useEffect(() => {
    const meter = meterRef.current;

    let length = meter.getTotalLength();

    meter.style.strokeDashoffset = length;
    meter.style.strokeDasharray = length;

    let to = length * ((100 - percentage) / 100);
    meter.getBoundingClientRect();
    meter.style.strokeDashoffset = Math.max(0, to);
  }, [percentage]);

  return (
    <svg  xmlns="http://www.w3.org/2000/svg" height="200" width="200" viewBox="0 0 200 130">
      <path className={styles.path} stroke="#ddd" d="M41 149.5a77 77 0 1 1 117.93 0"  fill="none"/>
      <path className={styles.path} ref={meterRef} stroke={progressColor} d="M41 149.5a77 77 0 1 1 117.93 0" fill="none" strokeDasharray="350" strokeDashoffset="350"/>
    </svg>
  );
}

export { RadialBar };
