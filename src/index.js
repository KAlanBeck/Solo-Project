import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { createRoot } from 'react-dom/client';


// ReactDOM.render(<App/>, document.getElementById('root'))
const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);