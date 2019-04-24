import React from 'react';
import { css } from 'astroturf';

import { MagnifyingGlass } from 'components/icons/MagnifyingGlass';

const styles = css`
  .search {
    &_box {
      display: flex;
      align-items: center;
      position: relative;
      width: 200px;
    }

    &_input {
      width: 100%;
      border: none;
      border-radius: 36px;
      padding: 8px 20px;
    }

    &_button {
      background-color: transparent;
      border: none;
      position: absolute;
      right: 6px;
    }
  }
`;

function SearchBox({ onSubmit }) {
  const inputRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const value = inputRef.current.value;
    onSubmit(value);
  }

  return (
    <form className={styles.search_box} role="searchbox" onSubmit={handleSubmit}>
      <input className={styles.search_input} ref={inputRef} placeholder="Search Schemes" />
      <button className={styles.search_button}>
        <MagnifyingGlass size={12}/>
      </button>
    </form>
  );
}

export { SearchBox };
