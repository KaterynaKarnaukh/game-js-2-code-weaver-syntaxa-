import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

// Прибрати StrictMode щоб не бачити зайвих повідомлень
ReactDOM.createRoot(document.getElementById('app')).render(
  <App />
);
