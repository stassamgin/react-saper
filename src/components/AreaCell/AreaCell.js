import React from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import SVG from '../SvgComponent/SVG'

const AreaCell = ({item, handlePointClick, handlePointCheck}) => {
  let itemChecker = item.open ?
    item.mine ? 'X' : item.value :
    item.checked ? 'P' : null

  const cellClass = classnames(styles.item, styles[`item_${itemChecker}`])

  if(itemChecker === 'X') itemChecker = <SVG id="bomb" />
  if(itemChecker === 'P') itemChecker = <SVG id="flag" />
  if(itemChecker === 0) itemChecker = null

  return (
    <div
      key={item.id}
      className={cellClass}
      onClick={handlePointClick(item)}
      onContextMenu={handlePointCheck(item)}
    >
      {itemChecker}
    </div>
  )
}

export default AreaCell