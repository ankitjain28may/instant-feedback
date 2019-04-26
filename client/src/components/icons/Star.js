import React from 'react';

import { withIcon } from 'components/icons/Icon';

const Star = () => (
  <path d="M4 0l-1 3h-3l2.5 2-1 3 2.5-2 2.5 2-1-3 2.5-2h-3l-1-3z" />
);

export const StarIcon = withIcon(Star);
