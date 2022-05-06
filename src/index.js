import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import App from './App';
import Login from './components/Login';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path=":id/*" element={<App />} />
                <Route path="/404" element={<h1>404: Page not found.</h1>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);

