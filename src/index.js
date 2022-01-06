import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Purchases from './components/Purchases';
import Item from './components/Item';
import Budget from './components/Budget';
import Home from './components/Home';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>No User</h1>} />
                <Route path=":id" element={<App />}>
                    <Route path="home" element={<Home />} />
                    <Route path="budget" element={<Budget />}/>
                    <Route path="purchases" element={<Purchases />}>
                        <Route path=":itemId" element={<Item />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);

