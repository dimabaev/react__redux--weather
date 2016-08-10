import update from 'react/lib/update'

import {
  ADD_LOCATION, REMOVE_LOCATION, UPDATE_WEATHER, UPDATE_FORECAST
} from '../constants/actionTypes'

const locations = function(state = [], action) {
  switch (action.type) {
    case ADD_LOCATION: 
      return update(state, {$push: [{
        name: action.name,
        coord: action.coord
      }]})
    case REMOVE_LOCATION: 
      return update(state, {$splice: [[action.id, 1]]})
    case UPDATE_WEATHER:
      return update(state, {
        [action.id]: {
          weather: {
            $set: action.weather
          }
        }
      })
    case UPDATE_FORECAST:
      return update(state, {
        [action.id]: {
          forecast: {
            $set: action.forecast
          }
        }
      })
    default: 
      return state
  }
}

export default locations