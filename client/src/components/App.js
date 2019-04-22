import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import About from './About';
import Verdict from './Verdict';
import Terms from './Terms';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar" role="navigation">
          <div className="navbar-brand">
            <div className="navbar-start">
              <NavLink exact={true} to="/" className="navbar-item" activeClassName="active">Home</NavLink>
              <NavLink to="/about" className="navbar-item" activeClassName="active">About</NavLink>
            </div>
          </div>
        </nav>
        <div className="content">
          <Route path="/" exact component={Verdict}/>
          <Route path="/about" component={About}/>
          <Route path="/terms-and-conditions" component={Terms}/>
        </div>
      </div>
    );
  }
}

export default App;