import React from 'react';
import { css } from 'astroturf';

import { MagnifyingGlass } from 'components/icons/MagnifyingGlass';

const styles = css`
  .search {
    &_box {
      display: flex;
      align-items: center;
      position: relative;
      width: 240px;
    }

    &_input {
      width: 100%;
      border: none;
      border-radius: 36px;
      padding: 8px 20px;
      box-shadow: 4px 2px 8px 0px rgba(0, 0, 0, 0.2);
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
