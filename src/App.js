import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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

  state = {
    'step': 1
  }

  genreOptions = [{
      label: 'Rock',
    },
    {
      label: 'Hip-Hop',
    },
    {
      label: 'Country',
    },
    {
      label: 'Electronic',
    },
    {
      label: 'Classical',
    },
    {
      label: 'Metal',
    }]

  instrumentOptions = [{
      label: 'Guitar',
    },
    {
      label: 'Bass',
    },
    {
      label: 'Drums',
    },
    {
      label: 'Piano',
    },
    {
      label: 'Vocals',
    },
    {
      label: 'Saxaphone',
    }]

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handleEmailClick = () => {
    this.setState({'step': 2})
  }

  storeGenreList = (e) => {
    console.log(e.target.value);
  }

  storeInstrumentList = (e) => {
    console.log(e.target.value);
  }

  handleGenreClick = () => {
    this.setState({'step': 3})
  }

  render() {
    return (
      <div className="form-inner">
      <form className="app__form-group form-group">
        {this.state.step === 1 && <Email value={this.state.email} onchange={this.handleEmailChange} onclick={this.handleEmailClick}/>}
        {this.state.step === 2 && <Checklist options={this.genreOptions} onclick={this.handleGenreClick} onchange={this.storeGenreList}/>}
        {this.state.step === 3 && <Checklist options={this.instrumentOptions} onchange={this.storeInstrumentList}/>}
      </form>
      </div>
    )
  }
}

class Email extends Component {

  render() {
    const { email,onchange,onclick } = this.props;
    return (
      <div className="app__form-step app__form-step--1">
        <input value={email} onChange={onchange} className="form-control" name="email" type="email" placeholder="jane@gmail.com" autoComplete="off"></input>
        <Button text="Lets Go!" onclick={onclick}/>
      </div>
    )
  }
}

class Checklist extends Component {

  toItem = (item,idx) => {
    return (
      <CSSTransitionGroup
        key={idx}
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <label key={item.label}><input key={item.label} type="checkbox" value={item.label} onChange={this.props.onchange}/>{item.label}</label>
        </CSSTransitionGroup>
    )
  }

  render() {
    const {options,onclick} = this.props;
    return (
      <div className="app__form-step app__form-step--2">
        {options.map(this.toItem)}
        <Button text="Next" onclick={onclick}/>
      </div>
    )
  }
}

class Button extends Component {
  render() {
    const {text,onclick} = this.props;
    return (
      <button key="1" type="button" className="btn btn-light btn-lg" onClick={onclick}>{this.props.text}</button>
    )
  }
}

export default App;
