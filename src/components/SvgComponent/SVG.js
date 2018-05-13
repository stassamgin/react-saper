import React from 'react';
import styles from './style.scss';
import classnames from 'classnames';

const SVG = ({id, className}) => {
  const cellClass = classnames(styles.icon, styles[`icon_${id}`], className)

  return (
    <svg className={cellClass}>
      <use xlinkHref={`#${id}`} />
    </svg>
  )
}

export default SVG