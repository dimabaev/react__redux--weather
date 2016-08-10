import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import addPlus from '../utils/addPlus';
import style from '../css/main.css';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForecast: false
    }

    this.updateWeatherData = this.updateWeatherData.bind(this)
    this.toggleForecast    = this.toggleForecast.bind(this)
    this.askForecast       = this.askForecast.bind(this)
    this.removeLocation    = this.removeLocation.bind(this)

    if (!this.props.weather) this.updateWeatherData()
  }

  updateWeatherData() {
    this.props.askWeatherData( this.props.id )
  }

  toggleForecast() {
    this.setState({ showForecast: !this.state.showForecast })
    if (!this.forecastTimer) {
      this.askForecast()
      this.forecastTimer = setInterval(this.askForecast, 10 * 60 * 1000)
    }
  }

  askForecast() {
    this.props.askWeatherData( this.props.id, true )
  }

  removeLocation() {
    this.props.removeLocation( this.props.id )
  }

  componentWillUnmount() {
    clearInterval(this.weatherTimer)
    if (this.forecastTimer) clearInterval(this.forecastTimer)
  }

  render() {

    let { weather = null, forecast = null } = this.props

    let weatherData
    if (weather) {
      weatherData = 
        <div className="renderForm">
          <span className="left">
            <i className="wi wi-thermometer wi-sm"></i>
            {addPlus(weather.temp)} °C <br/>
            <i className="wi wi-humidity wi-sm"></i>
            {weather.humidity} % <br/>
            <i className="wi wi-barometer wi-sm"></i>
            {weather.pressure} mm <br/>
          </span>
          <i className={weather.icon + ' wi-big'}></i>
        </div>
    } else {
      weatherData = <span>Loading...</span>
    }

    let forecastData

    if (forecast) {
      let forecastItems = []
      forecast.forEach((item, id) => {
        forecastItems.push(
          <div className='' key={id}>
            <span className=''>
              {item.time}
            </span>
            <i className={item.icon}></i><br/>
            {addPlus(item.temp)} °C 
          </div>
        )
      })

      forecastData = 
        <div className="left">
          <span className="timezone__alert">
            Подробное о погоде
          </span>
          {forecastItems}
        </div>
    } else {
      forecastData = <span style={{fontSize: 12}}>Loading...</span>
    }


    const station = weather ? weather.station : null

    return (
      <div className="chunk">
        <b className="name__sity" >{this.props.name}</b>
        <span className='close__btn' onClick={this.removeLocation}>&times;</span><br/>

        <span className="name__station">
          {(station !== this.props.name) ? station : ''}
        </span>

        {weatherData}

        {this.state.showForecast ? forecastData : ''}

        <span onClick={this.toggleForecast} className='show__hide'>
          {this.state.showForecast ? 'Закрыть' : 'Подробнее'}
        </span>

      </div>
    )
  }
}

Location.propTypes = {
  name: PropTypes.string.isRequired
}

export default connect()(Location)