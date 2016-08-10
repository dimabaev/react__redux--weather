import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import weatherApp from '../reducers';

export default function configureStore() {

    const ls = localStorage.WeaterAppData;

    const initialState = (ls !== undefined) ? JSON.parse(ls) : {};

    let store = createStore(
        weatherApp,
        initialState,
        applyMiddleware(thunkMiddleware)
    )

    store.subscribe( () => {
        localStorage.setItem('WeatherAppData', JSON.stringify( store.getState()))
    })

    return store;
}