import React from 'react';
import { css } from 'astroturf';

import { Spacer } from 'components/Spacer';
import { SearchBox } from 'app/SearchBox';
import { SchemesList } from 'app/SchemesList';

const styles = css`
  .title {
    padding-left: 6px;
  }
  .left_sidebar {
    color: #fff;
    background-color: #0984e3;
    padding: 10px;
    padding-top: 30px;
    position: fixed;
    height: 100vh;
    width: 270px;
  }
`;

function LeftSidebar({ schemes }) {
  const [searchValue, setSearchValue] = React.useState(null);

  function handleSubmit(value) {
    const searchValue = value.toLowerCase();
    setSearchValue(searchValue);
  }

  let filteredSchemes = schemes;

  if (searchValue) {
    filteredSchemes = schemes.filter(scheme => {
      const schemeName = scheme.name.toLowerCase();
      return schemeName.includes(searchValue);
    });
  }

  return (
    <nav className={styles.left_sidebar}>
      <h2 className={styles.title}>Instant Feedback</h2>
      <Spacer mt={40} mb={16}>
        <SearchBox onSubmit={handleSubmit} />
      </Spacer>
      <SchemesList schemes={filteredSchemes} />
    </nav>
  );
}

export { LeftSidebar };
