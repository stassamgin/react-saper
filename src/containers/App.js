import React, { Component } from 'react';
import MainArea from '../components/MainArea/MainArea'
import SvgSprite from '../components/SvgComponent/SvgSprite'
import areaDataGenerator from '../util/areaDataGenerator'
import pointClickHandler from '../util/pointClickHandler'
import mapMultiArray from '../util/mapMultiArray'

class App extends Component {
  state = {
    setting: {
      row: 20,
      col: 20,
      mine: 5,
    },
    area: [],
    errorValidation: {
      isError: false,
      msg: '',
    },
    showSettingWindow: true,
    finishGame: false,
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

  startGameHandler() {
    const {setting} = this.state

    this.setState({
      setting: {
        row: parseInt(setting.row, 10),
        col: parseInt(setting.col, 10),
        mine: parseInt(setting.mine, 10),
      },
      errorValidation: {
        isError: false,
        msg: '',
      },
      showSettingWindow: false,
      finishGame: false,
      area: areaDataGenerator(setting)
    })
  }

  handleButtonFormClick = () => {
    const {setting} = this.state

    if(Object.keys(setting).some(elem => (
        !Number.isInteger(Number(setting[elem])) ||
        setting[elem] === null ||
        setting[elem] === ''
      ))) {
      this.setState({
        errorValidation: {
          isError: true,
          msg: 'Please input correct value',
        }
      })
    } else if(setting.row * setting.col < setting.mine){
      this.setState({
        errorValidation: {
          isError: true,
          msg: 'You con not have so mach mines',
        }
      })
    } else {
      this.startGameHandler()
    }
  }

  handleOnChangeForm = (type) => (event) => {
    this.setState({setting: {...this.state.setting, [type]: event.target.value }});
  }

  handlePointClick = (point) => (event) => {
    if (this.state.finishGame) return
    if (point.mine) {
      this.finishGameHandler(point, this.state.area)
      return
    }
    this.setState({area: pointClickHandler(point, this.state.area)
    })
  }

  handlePointCheck = (point) => (event) => {
    event.preventDefault(point)
    if (this.state.finishGame || point.open) return
    this.setState({
      area: mapMultiArray(this.state.area,
        (item) => {
          if(item.id !== point.id) return item
          return Object.assign({...item}, {checked: !point.checked})
        })
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
            handlePointCheck={this.handlePointCheck}
          />
        </SvgSprite>
      </div>

    );
  }
}

export default App;
