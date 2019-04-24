import React, { Fragment } from 'react';
import { css } from 'astroturf';

import { Rating } from 'components/Rating';
import { RightSidebar } from 'app/RightSidebar';

const styles = css`
  .main {
    color: #555;
    background-color: #fff;
    height: 120vh;
    flex: 1;
    margin-left: 250px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    text-align: center;
  }
`;

function Main({ scheme={} }) {
  return (
    <Fragment>
      <main className={styles.main}>
        <h1 className={styles.title}>{scheme.name} Report</h1>
        <Rating rating={2} />
      </main>
      <RightSidebar tweets={scheme.tweets} />
    </Fragment>
  );
}

export { Main };
