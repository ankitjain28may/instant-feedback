import React from 'react';
import { css } from 'astroturf';
import classnames from 'classnames';

import { initPusher } from 'utils/pusher';
import { Rating } from 'components/Rating';
import { RadialBar } from 'components/RadialBar';
import { LeftSidebar } from 'app/LeftSidebar';
import { RightSidebar } from 'app/RightSidebar';
import { LocationChart } from 'app/LocationChart';
import { TimeChart } from 'app/TimeChart';

const styles = css`
  .app {
    position: relative;
    display: flex;
  }

  .main {
    color: #555;
    background-color: #fff;
    flex: 1;
    margin-left: 270px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    text-align: center;
  }

  .pdf_button {
    background-color: #2196f3;
    border: none;
    padding: 10px 16px;
    color: #fff;
    border-radius: 4px;
    margin-top: 40px;
  }

  .chart_section {
    margin: 40px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 80px;
  }

  .percent_chart {
    text-align: center;
  }

  .percent_chart + .percent_chart {
    margin-left: 15%;
  }

  .ratio {
    margin: 0;
    padding-bottom: 10px;
  }

  .positiveCount,
  .negativeCount {
    font-size: 28px;
  }

  .totalCount {
    font-size: 20px;
  }

  .gender_diff {
    margin-top: 20px;
    font-size: 22px;
  }

  .gender_diff > span + span {
    margin-left: 20px;
    font-size: 26px;
  }

  .genderCount {
    font-size: 30px;
  }

  @media print {
    .main {
      margin-left: 0;
    }

    .pdf_button {
      display: none;
    }
  }
`;

const pusher = initPusher();

const cities = ['Delhi', 'Bangalore', 'Mumbai'];

function extractCity(location) {
  const commaIndex = location.indexOf(',');
  return location.substring(0, commaIndex);
}

function computeTweetCount(tweets) {
  const tweetsCount = {
    positive: {
      total: 0,
      male: 0,
      female: 0,
    },
    negative: {
      total: 0,
      male: 0,
      female: 0,
    },
    total: 0,
  };

  tweets.forEach(tweet => {
    const side = tweet.sentiment_score < 0.4 ? 'positive' : 'negative';
    const { gender } = tweet;

    tweetsCount.total += 1;
    tweetsCount[side].total += 1;
    tweetsCount[side][gender] += 1;
  });

  return tweetsCount;
}

function computeCityDstrb(tweets) {
  const cityDstrb = {
    positive: {
      Delhi: 0,
      Bangalore: 0,
      Mumbai: 0,
    },
    negative: {
      Delhi: 0,
      Bangalore: 0,
      Mumbai: 0,
    },
  };

  tweets.forEach(tweet => {
    const side = tweet.sentiment_score < 0.4 ? 'positive' : 'negative';
    const { location } = tweet;

    cityDstrb[side][location] += 1;
  });

  return cityDstrb;
}

function App({ schemes = [], schemesData = [], activeScheme, addTweet }) {
  const scheme = schemesData[activeScheme] || {};
  const { name, tweets = [] } = scheme;

  React.useEffect(() => {
    const channel = pusher.subscribe(activeScheme);

    channel.bind('App\\Events\\TweetsStream', function(data) {
      const newTweet = data.tweet;
      addTweet(newTweet, activeScheme);
    });

    return () => {
      pusher.unsubscribe(activeScheme);
    };
  }, [activeScheme, addTweet]);

  const tweetsCount = computeTweetCount(tweets);
  const cityDstrb = computeCityDstrb(tweets);

  const positivePerc = (tweetsCount.positive.total / tweetsCount.total) * 100;
  const negativePerc = (tweetsCount.negative.total / tweetsCount.total) * 100;
  const rating = Math.round(positivePerc / 20);
  const limitedTweets = [...tweets].sort((a, b) => b.id - a.id).slice(0, 10);

  return (
    <div className={styles.app}>
      <LeftSidebar schemes={schemes} activeScheme={activeScheme} />
      <main className={styles.main}>
        <h1 className={styles.title}>{name} Report</h1>
        <Rating rating={rating} />
        <button className={styles.pdf_button} onClick={() => print()}>Download Report as PDF</button>
        <section className={styles.chart_section}>
          <div className={styles.percent_chart}>
            <RadialBar progressColor="#1fab89" percentage={positivePerc} />
            <p className={styles.ratio}>
              <strong className={styles.positiveCount}>
                {tweetsCount.positive.total}
              </strong>{' '}
              out of{' '}
              <span className={styles.totalCount}>{tweetsCount.total}</span>
            </p>
            gave positive feedback
            <div className={styles.gender_diff}>
              <span>
                <strong className={styles.genderCount}>
                  {tweetsCount.positive.male}
                </strong>{' '}
                males
              </span>
              <span>
                <strong className={styles.genderCount}>
                  {tweetsCount.positive.female}
                </strong>{' '}
                females
              </span>
            </div>
          </div>
          <div className={styles.percent_chart}>
            <RadialBar progressColor="#ff847c" percentage={negativePerc} />
            <p className={styles.ratio}>
              <strong className={styles.negativeCount}>
                {tweetsCount.negative.total}
              </strong>{' '}
              out of{' '}
              <span className={styles.totalCount}>{tweetsCount.total}</span>
            </p>
            gave negative feedback
            <div className={styles.gender_diff}>
              <span>
                <strong className={styles.genderCount}>
                  {tweetsCount.negative.male}
                </strong>{' '}
                males
              </span>
              <span>
                <strong className={styles.genderCount}>
                  {tweetsCount.negative.female}
                </strong>{' '}
                females
              </span>
            </div>
          </div>
        </section>
        <section className={styles.chart_section}>
          <LocationChart cities={cities} cityDstrb={cityDstrb} />
        </section>
        <section className={styles.chart_section}>
          <TimeChart tweets={tweets} />
        </section>
      </main>
      <RightSidebar tweets={limitedTweets} />
    </div>
  );
}

export { App };
