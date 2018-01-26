import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          <Form/>
        </div>
      </div>
    );
  }
}

class Form extends Component {
  render() {
    return (
      <form className="form-group">
        <input className="form-control" type="email" placeholder="jane@mac.com"></input>
      </form>
    )
  }
}

export default App;
