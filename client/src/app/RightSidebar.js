import React from 'react';
import { css } from 'astroturf';

const styles = css`
  .right_sidebar {
    padding: 10px;
    width: 250px;
  }
`;

function RightSidebar() {
  return (
    <nav className={styles.right_sidebar} >
      RightSidebar
    </nav>
  );
}

export { RightSidebar };
