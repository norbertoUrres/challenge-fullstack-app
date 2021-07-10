import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import CovidChecks from "./components/CovidChecks/CovidChecks";
import CovidChecksForm from "./components/CovidChecks/CovidCheckForm";
import CovidCheckDetail from './components/CovidChecks/CovidCheckDetail'

import 'react-toastify/dist/ReactToastify.css';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={CovidChecks} />
          <Route path="/new-check" component={CovidChecksForm} />
          <Route path="/check-detail/:id" component={CovidCheckDetail} />
        </Switch>
        <ToastContainer />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
