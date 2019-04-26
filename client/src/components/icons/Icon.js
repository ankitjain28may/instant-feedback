import React from 'react';
import classnames from 'classnames';
import { css } from 'astroturf';

const styles = css`
  .icon {
    fill: currentColor;
  }
`;

export const Icon = ({ size, children, className, ...restProps }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    {...restProps}
    width={size}
    height={size}
    className={classnames(styles.icon, className)}
  >
    {children}
  </svg>
);

export const withIcon = (Component) => function ComponentIcon (props) {
  ComponentIcon.displayName = Component.name + 'Icon';

  return (
    <Icon {...props}>
      <Component />
    </Icon>
  );
};
