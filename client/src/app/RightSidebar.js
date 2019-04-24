import React from 'react';
import { css } from 'astroturf';

const styles = css`
  .right_sidebar {
    padding-top: 80px;
    padding-bottom: 20px;
    padding-right: 40px;
    width: 290px;
  }

  .tweets_list {
    padding: 0;
    margin: 0;
  }

  .tweet {
    list-style: none;
    padding: 17px 18px;
    box-shadow: 2px 7px 9px 2px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }

  .tweet + .tweet {
    margin-top : 26px;
  }
`;

function RightSidebar({ tweets=[] }) {
  return (
    <aside className={styles.right_sidebar} >
      <ul className={styles.tweets_list}>
        {
          tweets.map(({ text }) => (
            <li className={styles.tweet} key={text}>{text}</li>
          ))
        }
      </ul>
    </aside>
  );
}

export { RightSidebar };
