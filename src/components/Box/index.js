import React from 'react'
import { cx } from '../../utils';

import './Box.css';

const Box = ({
  leftClick = console.log,
  rightClick = console.log,
  revealed = false,
  flag = false,
  value = 0,
  cheat = false,
  end = false,
  pause = false,
  id,
}) => {
  const classNames = cx([
    'Box',
    !(revealed || flag) && 'unchecked',
    flag && 'flagged',
    !flag && revealed && 'revealed',
    !flag && revealed && `count-${value}`,
    cheat && value === -1 && 'revealed',
    cheat && value === -1 && `count-${value}`,
    end && 'revealed',
    end && `count-${value}`,
  ]);
  return (
    <button
      id={id}
      onClick={flag ? rightClick : leftClick}
      onContextMenu={rightClick}
      className={classNames}
      value={value}
      disabled={pause}
    />
  )
}

export default Box;