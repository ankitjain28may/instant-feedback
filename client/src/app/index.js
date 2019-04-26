import React, { Fragment } from 'react';
import { Router } from "@reach/router";

import { App } from 'app/App';

import './base.css';

function computeSchemesList(apiData) {
  const schemes = [];
  Object.entries(apiData).forEach(([key, value]) => {
    const scheme = {
      hashtag: key,
      name: value.name,
    };

    schemes.push(scheme);
  });

  return schemes;
}

function Bootstrap() {
  const [apiData, setApiData] = React.useState({});

  const schemes = computeSchemesList(apiData);

  function addTweet(tweet, activeScheme) {
    const scheme = apiData[activeScheme];

    const schemeUpdated = {
      ...scheme,
      tweets: [tweet, ...scheme.tweets],
    };
    const stateUpdated = {
      ...apiData,
      [activeScheme]: schemeUpdated,
    };

    setApiData(stateUpdated);
  }

  React.useEffect(() => {
    try {
      (async() => {
        const res = await fetch('http://34.211.162.216:8000/api/data');
        // const res = await fetch('http://192.168.0.106:8000/api/data');
        // const res = await fetch('http://localhost:5000/api.json');
        const jsonData = await res.json();
        setApiData(jsonData);
      })();
    } catch(error) {
      console.log('error', error);
    }
  }, []);

  return (
    <Router>
      <App path=":activeScheme" schemes={schemes} schemesData={apiData} addTweet={addTweet} />
    </Router>
  );
}

export { Bootstrap };
