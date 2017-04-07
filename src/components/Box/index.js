import React from 'react'
import { cx } from '../../utils';

import './Box.css';

const Box = ({
  leftClick = console.log,
  rightClick = console.log,
  revealed = false,
  flag = false,
  value = 0,
}) => {
  const classNames = cx([
    'Box',
    !(revealed || flag) && 'unchecked',
    flag && 'flagged',
    revealed && 'revealed',
    revealed && `count-${value}`,
  ]);
  return (
    <button
      onClick={flag ? rightClick : leftClick}
      onContextMenu={rightClick}
      className={classNames}
    />
  )
}

export default Box;