import React from 'react'
import 'styles/index.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Home
} from './pages';
import links from 'data/links.json';

const client = links.client;

export default () => {

  window && window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      store.dispatch(setSignInVis({ vis: "false" }));
    };
  });


  return (
    <div>
      <Router>
        <Switch>
          <Route path={client.home} component={Home} />
        </Switch>
      </Router>
    </div>
  );

};