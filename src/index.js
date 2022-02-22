import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ConfigureStore from './reduxStore/ConfigStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'


const store = ConfigureStore()
ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>,
    document.getElementById('root')
);