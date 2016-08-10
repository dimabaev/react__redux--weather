import React, { Component } from 'react';
import { render } from 'react-dom';

// redux
import { Provider } from 'react-redux';

// fetch
import fetch from 'whatwg-fetch';

// component
import Layout from './pages/Layout';
import configureStore  from './store';

import './index.css';

let store = configureStore();

render (

        <Provider store={store}>
           <Layout />
        </Provider>,

        document.getElementById('app')
);
