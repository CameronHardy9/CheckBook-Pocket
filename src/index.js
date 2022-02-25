import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import App from './App';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "Checkbook-Pocket",
        apiDomain: "https://family-budget-app-server.herokuapp.com",
        websiteDomain: "https://checkbook-pocket.netlify.app",
        apiBasePath: "/auth",
        websiteBasePath: "/"
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "PHONE"
        }),
        Session.init()
    ]
});



ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
                <Route path=":id/*" element={<App />} />
                <Route path="/404" element={<h1>404: Page not found.</h1>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);

