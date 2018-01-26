import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h3>Enter your email and let's get started with your profile!</h3>
        <div className="app__inner">
          <Form/>
        </div>
      </div>
    );
  }
}

class Form extends Component {
  render() {
    return (
      <div className="form-inner">
      <form className="app__form-group form-group">
        <div className="app__form-step app__form-step--1">
          <input className="form-control" type="email" placeholder="jane@gmail.com"></input>
        </div>
        <div className="app__form-step app__form-step--2">
          <label><input type="checkbox"/>Rock</label>
          <label><input type="checkbox"/>Hip-Hop</label>
          <label><input type="checkbox"/>Electronic</label>
          <label><input type="checkbox"/>Country</label>
          <label><input type="checkbox"/>Funk</label>
          <label><input type="checkbox"/>Classical</label>
        </div>
      </form>
      <button type="button" class="btn btn-light btn-lg">Lets go!</button>
      </div>
    )
  }
}

export default App;
