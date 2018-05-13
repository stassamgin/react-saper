import React, { Component } from 'react';
import MainArea from '../components/MainArea/MainArea'
import SvgSprite from '../components/SvgComponent/SvgSprite'
import areaDataGenerator from '../util/areaDataGenerator'
import getSiblingOfPoint from '../util/getSiblingofPoint'
import mapMultiArray from '../util/mapMultiArray'

class App extends Component {
  state = {
    setting: {
      row: 20,
      col: 20,
      mine: 30,
    },
    area: [],
    errorValidation: false,
    showSettingWindow: true,
    finishGame: false,
  }

  handleOnChangeForm = (type) => (event) => {
    this.setState({setting: {...this.state.setting, [type]: event.target.value }});
  }

  handleButtonFormClick = () => {
    const {setting} = this.state

    if(Object.keys(setting).some(elem => (
        !Number.isInteger(Number(setting[elem]))
      ))) {
      this.setState({errorValidation: true})
    } else {
      this.setState({
        setting: {
          row: parseInt(setting.row, 10),
          col: parseInt(setting.col, 10),
          mine: parseInt(setting.mine, 10),
        },
        errorValidation: false,
        showSettingWindow: false,
        finishGame: false,
        area: areaDataGenerator(setting)
      })
    }
  }

  finishGameHandler(startPoint, area) {
    this.setState({
      finishGame: true,
      area: mapMultiArray(area,
        (item) => {
          if(!item.mine) return item
          return Object.assign({...item}, {open:true})
        })
    })
  }

  pointClickHandler(startPoint, area) {
    let checkedPointsId = new Set()

    function recursivePointChecker (pointsArray, reserveId) {
      checkedPointsId.add(reserveId)

      pointsArray.forEach( item => {
        if (checkedPointsId.has(item.id))return
        if (item.value > 0) {
          checkedPointsId.add(item.id)
        }
        if (item.value === 0) {
          const {row, col} = item
          recursivePointChecker(getSiblingOfPoint({row, col}, area), item.id)
        }
      })
    }
    recursivePointChecker([startPoint])
    return mapMultiArray(area,
      (item) => {
        if(!checkedPointsId.has(item.id)) return item
        return Object.assign({...item}, {open:true})
      })
  }

  handlePointClick = (point) => (event) => {
    if (this.state.finishGame) return
    if (point.mine) {
      this.finishGameHandler(point, this.state.area)
      return
    }
    this.setState({area: this.pointClickHandler(point, this.state.area)
    })
  }

  render() {
    return (
      <div>
        <SvgSprite>
          <MainArea
            {...this.state}
            handleOnChangeForm={this.handleOnChangeForm}
            handleButtonFormClick={this.handleButtonFormClick}
            handlePointClick={this.handlePointClick}
          />
        </SvgSprite>
      </div>

    );
  }
}

export default App;
