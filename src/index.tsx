import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import { render } from 'react-dom';
import Button from '@mui/material/Button';

const root = document.getElementById('root');

function App() {
  return (
    <Button variant="contained" color="primary">
      Olá Tafeito!
    </Button>
  );
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root,
);