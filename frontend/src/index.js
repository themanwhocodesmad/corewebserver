import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MinesContextProvider } from './context/MineContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MinesContextProvider>
      <App />
    </MinesContextProvider>
  </React.StrictMode>
);
