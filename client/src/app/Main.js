import React, { Fragment } from 'react';
import { css } from 'astroturf';

import { RightSidebar } from 'app/RightSidebar';

const styles = css`
  .main {
    color: #555;
    background-color: #fff;
    height: 120vh;
    flex: 1;
    margin-left: 250px;
    padding: 10px 20px;
  }
`;

function Main() {
  return (
    <Fragment>
      <main className={styles.main}>
        Hello
      </main>
      <RightSidebar />
    </Fragment>
  );
}

export { Main };
