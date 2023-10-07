import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Default from './Default';

class App extends Component {
    render() {
        return (
          <Router>
            <Switch>
              <Route path="/" component={Default} />
            </Switch>
          </Router>
        );
    }
}
export default App;