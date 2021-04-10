import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from'./theme';
import { Provider as BumbagProvider } from 'bumbag';

ReactDOM.render(
  <React.StrictMode>
    <BumbagProvider theme={theme}>
      <App />
    </BumbagProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


