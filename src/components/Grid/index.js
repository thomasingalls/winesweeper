import React from 'react'
import { cx } from '../../utils';

import './Grid.css';

const Grid = ({ children }) => {
  const classNames = cx([
    'Grid',
  ]);
  return (
    <div
      className={classNames}
    >
      {children}
    </div>
  )
};

export default Grid;