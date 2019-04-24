import React from 'react';
import { css } from 'astroturf';
import classnames from 'classnames';

import { Star } from 'components/icons/Star';

const styles = css`
  .rating {
    &_wrapper {
      display: flex;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &_star {
      padding: 0 6px;
      fill: #ddd;
    }

    &_filled {
      fill: #f5cd0d;
    }
  }
`;

function Rating({ rating }) {
  const ratings = [];
  for(let i = 0; i < 5; i += 1) {
    if(i < rating) {
      ratings.push(true);
    } else {
      ratings.push(false);
    }
  }
  return (
    <ul className={styles.rating_wrapper}>
      {
        ratings.map((rating, index) => (
          <li
            className={classnames(styles.rating_star, {
              [styles.rating_filled]: rating,
            })}
            key={index}
          >
            <Star size={20}/>
          </li>
        ))
      }
    </ul>
  );
}

export { Rating };
