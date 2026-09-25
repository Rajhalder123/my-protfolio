import React, { startTransition } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pages are prerendered at build time (scripts/prerender.mjs). When the HTML is
// already there, hydrate it; the transition lets React yield to the browser
// while it attaches, instead of blocking the main thread in one long task.
if (container.hasChildNodes()) {
  startTransition(() => {
    ReactDOM.hydrateRoot(container, app);
  });
} else {
  const root = ReactDOM.createRoot(container);
  startTransition(() => {
    root.render(app);
  });
}
