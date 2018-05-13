import React from 'react';
import styles from './style.scss';
import classnames from 'classnames';

const AreaCell = ({item, handlePointClick}) => {
  const itemChecker = !item.open ? null :
                      item.mine ? 'X' : item.value
  const cellClass = classnames(styles.item, styles[`item_${itemChecker}`])

  return (
    <div
      key={item.id}
      className={cellClass}
      onClick={handlePointClick(item)}
    >
      {itemChecker}
    </div>
  )
}

export default AreaCell