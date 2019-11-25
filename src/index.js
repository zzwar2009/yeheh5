import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import '@/styles/reset.css';
import Store from './redux'
import {Provider} from 'react-redux'

import registerServiceWorker from './registerServiceWorker';

import moment from 'moment'
import momentLocale from 'moment/locale/zh-cn';
import Router from "./routes/Router";
moment.updateLocale('zh-cn', momentLocale);


ReactDOM.render(
    <Provider store={Store}>
        <Router />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
