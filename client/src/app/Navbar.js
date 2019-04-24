import React from 'react';
import { css } from 'astroturf';

const styles = css`
  .navbar {
    color: white;
    background-color: #0984e3;
    padding: 0 10px;
    height: 60px;
    display: flex;
    align-items: center;

    &_content_right {
      margin-left: auto;
    }
  }
`;

function Navbar() {
  return (
    <nav className={`navbar ${styles.navbar}`} >
      Navbar
      <div className={`${styles.navbar_content_right}`}>
        hello
      </div>
    </nav>
  );
}

export { Navbar };
