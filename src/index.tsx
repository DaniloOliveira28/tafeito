import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { render } from 'react-dom';
import App from './components/App';

const root = document.getElementById('root');


render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  root,
);