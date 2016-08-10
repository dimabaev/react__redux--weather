import { combineReducers } from 'redux';

import locations from './locations';
import settings from './settings';

const weatherApp = combineReducers({
    locations,
    settings
})

export default weatherApp;