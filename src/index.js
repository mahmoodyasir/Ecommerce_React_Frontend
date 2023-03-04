import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
// import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import {Globalstate} from "./state/provider";
import reducer, {initialstate} from "./state/reducer";
import All_Orders from "./admin_components/All_Orders";
// import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Globalstate initialstate={initialstate} reducer={reducer}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Globalstate>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
