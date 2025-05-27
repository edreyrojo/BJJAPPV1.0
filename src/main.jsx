import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // <-- Aquí está tu Router principal

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Este es el único Router que necesitas */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);