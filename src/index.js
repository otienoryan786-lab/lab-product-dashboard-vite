import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The app root element (#root) was not found.');
}

createRoot(rootElement).render(
  React.createElement(StrictMode, null, React.createElement(App)),
);