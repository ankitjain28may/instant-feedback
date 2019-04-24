import React from 'react';
import { css } from 'astroturf';

import { LeftSidebar } from 'app/LeftSidebar';
import { Main } from 'app/Main';

import './app.css';

const styles = css`
  .app {
    position: relative;
    display: flex;
  }
`;

const schemes = [
  {
    hashtag: 'makeinindia',
    name: 'Make In India',
  }, {
    hashtag: 'swachhbharat',
    name: 'Swachh Bharat',
  },
];

function App() {
  return (
    <div className={styles.app}>
      <LeftSidebar schemes={schemes} />
      <Main />
    </div>
  );
}

export { App };
