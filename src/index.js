import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./Redux/configStore";

ReactDOM.render(
  <React.Fragment>
				<Provider store={store}>
					<App />
				</Provider>
  </React.Fragment>,
  document.getElementById('root')
);
reportWebVitals();
