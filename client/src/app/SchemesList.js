import React from 'react';
import { css } from 'astroturf';
import classnames from 'classnames';

const styles = css`
  .schemes_list {
    padding: 10px;
  }

  .scheme {
    list-style: none;
    padding: 4px 0;
  }

  .link {
    text-decoration: none;
    color: #ccc;
    transition: 0.4s ease-in;
  }

  .link:hover {
    color: #ddd;
  }

  .active_link {
    text-decoration: underline;
    color: #eee;
  }
`;

function SchemesList({ schemes, activeScheme }) {
  return (
    <ul className={styles.schemes_list} >
      {
        schemes.map(scheme => (
          <li className={styles.scheme} key={scheme.hashtag}>
            <a
              className={classnames(styles.link, {
                [styles.active_link]: scheme.hashtag === activeScheme
              })}
              href={`/schemes/${scheme.hashtag}`}
            >
              {scheme.name}
            </a>
          </li>
        ))
      }
    </ul>
  );
}

export { SchemesList };
