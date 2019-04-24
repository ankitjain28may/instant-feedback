import React from 'react';
import { css } from 'astroturf';

const styles = css`
  .spacer {
    margin-left: var(--ml);
    margin-right: var(--mr);
    margin-top: var(--mt);
    margin-bottom: var(--mb);
  }
`;

function Spacer({ ml, mr, mt, mb, mx, my, children }) {
  const m = {
    l: ml || mx || 0,
    r: mr || mx || 0,
    t: mt || my || 0,
    b: mb || my || 0,
  };

  const variableStyles = {
    '--ml': `${m.l}px`,
    '--mr': `${m.r}px`,
    '--mt': `${m.t}px`,
    '--mb': `${m.b}px`,
  };

  return (
    <div className={styles.spacer} style={variableStyles}>
      {children}
    </div>
  );
}

export { Spacer };
