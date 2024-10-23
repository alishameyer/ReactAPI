import ReactS from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

// Element vom DOM holen
const rootElement = document.getElementById('root');

// Sicherstellen, dass das Element nicht null ist
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}