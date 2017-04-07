import React from 'react'
import { cx } from '../../utils';

import './Box.css';

const Box = ({
  leftClick = console.log,
  rightClick = console.log,
  revealed = false,
  flag = false,
  value = 0,
  classNames = [],
}) => {
  return(
    <div className={`box ${cx(classNames)}`}>
      render testing
    </div>
  )
}

export default Box;