import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { css } from 'astroturf';

import { PulseIcon } from 'components/icons/Pulse';
import { Spacer } from 'components/Spacer';

const styles = css`
  .description {
    color: #555;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;

    &_icon {
      color: #555;
    }

    &_text {
      padding-bottom: 5px;
    }
  }

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
    margin-top: 26px;
  }

  .tweet_animation {
    &_enter {
      opacity: 0;
    }

    &_enter_active {
      opacity: 1;
      transition: opacity 400ms ease-in;
    }
  }
`;

function RightSidebar({ tweets = [] }) {
  return (
    <aside className={styles.right_sidebar}>
      <p className={styles.description}>
        <Spacer mr={8} as="span">
          <PulseIcon size={14} className={styles.description_icon} />
        </Spacer>
        <span className={styles.description_text}>Tweets on scheme</span>
      </p>
      <ul className={styles.tweets_list}>
        <TransitionGroup component={null}>
          {tweets.map(({ tweet }) => (
            <CSSTransition
              key={tweet}
              timeout={400}
              classNames={{
                enter: styles.tweet_animation_enter,
                enterActive: styles.tweet_animation_enter_active,
              }}
            >
              <li className={styles.tweet}>{tweet}</li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </aside>
  );
}

export { RightSidebar };
