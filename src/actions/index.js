import * as Action from '../constants/actionTypes'
import { OWM_URL, OWM_API_KEY, IP_API } from '../constants/APIsData.js'

import fetchData from '../utils/fetchData'
import getWeatherIcon from '../utils/getWeatherIcon'



export function addLocation(name, coord = null) {
  return {
    type: Action.ADD_LOCATION,
    name,
    coord
  }
}

export function removeLocation(id) {
  return {
    type: Action.REMOVE_LOCATION,
    id
  }
}

export function askWeatherData(id, isForecast) {
  return function (dispatch, getState) {

    const { locations } = getState()
    const { name, coord = null, timezone = null } = locations[id]

    // Find location by coordinates otherwise by name
    const params = (coord) ? `&lat=${coord.lat}&lon=${coord.lon}` : `&q=${name}`

    let reqestURL = OWM_URL

    reqestURL += isForecast ? 'forecast' : 'weather'
    reqestURL += `?${params}&appid=${OWM_API_KEY}&units=metric&cnt=15` 

    return fetchData(reqestURL, (err, response) => {
      if (!err) {
        console.log(response)
        if (response.cod === "404") {
          dispatch(removeLocation(id))
          return
        }
        if (isForecast) {
          dispatch(updateForecast(id, response, timezone))
        } else {
          dispatch(updateWeather(id, response))
        }
      }
    })
  }
}

export function updateWeather(id, res) {
  const weather = {
    temp:     Math.round(res.main.temp),
    humidity: res.main.humidity,
    pressure: Math.round(res.main.pressure * 0.75),
    icon:     getWeatherIcon(res),
    station:  res.name
  }
  return {
    type: Action.UPDATE_WEATHER,
    weather,
    id
  }
}

export function updateForecast(id, res) {

  let forecast = []

  res.list.forEach((item) => {
    const t = new Date(item.dt * 1000)
    const time = t.toTimeString().substr(0,5)
    forecast.push({
      temp: Math.round(item.main.temp),
      icon: getWeatherIcon(item, t.getHours()),
      time
    })
  })

  return {
    type: Action.UPDATE_FORECAST,
    forecast,
    id
  }

}

// To fix OpenWeatherMap's HTTP 429 Error (too many requests)
export function updateAllLocations() {
  return function(dispatch, getState) {
    const state = getState()
    return state.locations.forEach((location, id) => {
      setTimeout(
          () => dispatch(askWeatherData(id))
      , id * 300) // every 300 ms
    })
  }
}

export function findUsersLocation() {
  return function (dispatch) {
    return fetchData(IP_API, (err, response) => {
      if (!err) {
        const { city, lat, lon } = response
        dispatch(addLocation(city, {lat, lon}))
      }
    })

  }
}

export function findUserByGeoData() {
  return function (dispatch) {
    return navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      dispatch(
        addLocation('Current location', {
          lat: latitude.toFixed(4),
          lon: longitude.toFixed(4)
        })
      )
    });
  }
}

export function testAction(param) {
  console.log('test', param)
  return {
    type: 'TEST_ACTION',
    param
  }
}

function showPosition(position) {
  console.log(position.coords)
}