import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
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
import instorage from './instorage/instorage';
import check from './check/check';
import sendout from './sendout/sendout';
import confirm from './confirm/confirm';
import maintenance from './maintenance/maintenance';
import datalogs from './datalogs/datalogs';
import userlogs from './userlogs/userlogs';
import otherlogs from './otherlogs/otherlogs';
import operation from './operation/operation';
import role from './role/role';
import roleassignment from './roleassignment/roleassignment';
import power from './power/power';
import powerassignment from './powerassignment/powerassignment';
import newadd from './newadd/newadd';

ReactDOM.render(
  <Router >
    <Switch>
      <Route path="/" exact render={() => (
        <Redirect to={'/login'} />
      )} />

      <Route path='/homepage' component={homepage} />
      <Route path="/login" component={login} />
      {/* <Route path="/information"> */}
        <Route path='/product' component={product} />
        <Route path='/newadd' component={newadd} />
        <Route path='/area' component={area} />
        <Route path='/journal' component={journal} />
        <Route path='/datalogs' component={datalogs} />
        <Route path='/userlogs' component={userlogs} />
        <Route path='/otherlogs' component={otherlogs} />
        <Route path='/lifecycle' component={lifecycle} />
        <Route path='/connector' component={connector} />
      {/* </Route> */}
      {/* <Route path="/equipment"> */}
        <Route path='/basic' component={basic} />
        <Route path='/status' component={status} />
        <Route path='/parameter' component={parameter} />
      {/* </Route> */}
      {/* <Route path="/user"> */}
        <Route path='/waterman' component={waterman} />
        <Route path='/account' component={account} />
        <Route path='/newaccount' component={newaccount} />
        <Route path='/role' component={role} />
        <Route path='/roleassignment' component={roleassignment} />
        <Route path='/power' component={power} />
        <Route path='/powerassignment' component={powerassignment} />
      {/* </Route>
      <Route path="/ota"> */}
        <Route path='/history' component={history} />
        <Route path='/operation' component={operation} />
      {/* </Route> */}
      <Route path='/instorage' component={instorage} />
      <Route path='/check' component={check} />
      <Route path='/sendout' component={sendout} />
      <Route path='/confirm' component={confirm} />
      <Route path='/maintenance' component={maintenance} />
    </Switch>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
