import React from 'react';
import { Link } from "@reach/router";
import { css } from 'astroturf';
import classnames from 'classnames';

const styles = css`
  .schemes_list {
    padding: 10px;
  }

  .scheme {
    list-style: none;
    padding: 6px 0;
    font-size: 20px;
  }

  .link {
    text-decoration: none;
    color: #add0eb;
    transition: 0.4s ease-in;
  }

  .link:hover:not(.active_link) {
    color: #ddd;
  }

  .active_link {
    text-decoration: underline;
    color: #eee;
  }
`;

function SchemesList({ schemes }) {
  return (
    <ul className={styles.schemes_list} >
      {
        schemes.map(scheme => (
          <li className={styles.scheme} key={scheme.hashtag}>
            <Link
              getProps={({ isCurrent }) => ({
                className: classnames(styles.link, {
                  [styles.active_link]: isCurrent
                })
              })}
              to={`/${scheme.hashtag}`}
            >
              {scheme.name}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}

export { SchemesList };
