import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import product from 'components/information/product';
import product from './product/product';
import area from './area/area';
import journal from './journal/journal';
import lifecycle from './lifecycle/lifecycle';
import connector from './connector/connector';
import basic from './basic/basic';
import status from './status/status';
import parameter from './parameter/parameter';
import waterman from './waterman/waterman';
import account from './account/account';
import history from './history/history';
import newaccount from './newaccount/newaccount';
import login from './login/login';
import homepage from './homepage/homepage';

ReactDOM.render(
  <Router history={hashHistory}>
    <Switch>
      <Route path="/" exact render={() => (
        <Redirect to={'/login'} />
      )} />

      <Route path='../homepage' component={homepage} />
      <Route path="../login" component={login} />
      {/* <Route path="/information"> */}
        <Route path='../product' component={product} />
        <Route path='../area' component={area} />
        <Route path='../journal' component={journal} />
        <Route path='../lifecycle' component={lifecycle} />
      {/* </Route> */}
      {/* <Route path="/equipment"> */}
        <Route path='../basic' component={basic} />
        <Route path='../status' component={status} />
        <Route path='../parameter' component={parameter} />
      {/* </Route> */}
      {/* <Route path="/user"> */}
        <Route path='../waterman' component={waterman} />
        <Route path='../account' component={account} />
        <Route path='../newaccount' component={newaccount} />
      {/* </Route>
      <Route path="/ota"> */}
        <Route path='../history' component={history} />
      {/* </Route> */}
    </Switch>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
