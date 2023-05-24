import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


// ReactDOM.render(<App/>, document.getElementById('root'))
// const rootElement = document.getElementById('root');
// createRoot(rootElement).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)