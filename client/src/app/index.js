import React from 'react';
import { css } from 'astroturf';

import { LeftSidebar } from 'app/LeftSidebar';
import { Main } from 'app/Main';

import './app.css';

const styles = css`
  .app {
    position: relative;
    display: flex;
  }
`;

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

function App() {
  const [apiData, setApiData] = React.useState({});

  React.useEffect(() => {
    try {
      (async() => {
        const res = await fetch('http://localhost:5000/api.json', {});
        const jsonData = await res.json();
        setApiData(jsonData);
      })();
    } catch(error) {
      console.log('error', error);
    }
  }, []);

  const schemes = computeSchemesList(apiData);
  const activeScheme = 'swachhbharat';
  const scheme = apiData[activeScheme];

  console.log('scheme', scheme);

  return (
    <div className={styles.app}>
      <LeftSidebar schemes={schemes} activeScheme={activeScheme} />
      <Main scheme={scheme} />
    </div>
  );
}

export { App };
