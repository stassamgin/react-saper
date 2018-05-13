import React, { Component } from 'react';
import AreaCell from '../AreaCell/AreaCell'
import styles from './style.scss';

class MainArea extends Component {

  windowRender() {
    const {
      setting: {row, col, mine},
      showSettingWindow,
      errorValidation,
      area,
      handlePointClick,
      handleOnChangeForm,
      handleButtonFormClick} = this.props

    if(showSettingWindow) {
      return (
        <div className={styles.settingForm}>
          <h2>Setting</h2>
          <h3>{errorValidation ? 'Please input correct value' : null}</h3>
          <label className={styles.label}>
            Rows
            <input
              className={styles.input}
              type="text" value={row}
              onChange={handleOnChangeForm('row')}
            />
          </label>
          <label className={styles.label}>
            Cols
            <input
              className={styles.input}
              type="text" value={col}
              onChange={handleOnChangeForm('col')}
            />
          </label>
          <label className={styles.label}>
            Mine Counts
            <input
              className={styles.input}
              type="text" value={mine}
              onChange={handleOnChangeForm('mine')}
            />
          </label>
          <button
            className={styles.button}
            onClick={handleButtonFormClick}
          >
            OK
          </button>
        </div>
      )
    }

    return (
      <div className={styles.area}>
        <div className={styles.area__header}>SAPER</div>
        <div className={styles.area__body}>
          {area.map( (row, index) => (
            <div className={styles.area__row} key={index}>{
              row.map( item => (
                <AreaCell
                  key={item.id}
                  item={item}
                  handlePointClick={handlePointClick}
                />
              ))
            }</div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.windowRender()}
      </div>
    )
  }
}

export default MainArea;