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

  handleEmailClick = (e) => {
    this.setState({'step': 2})
  }

  storeCheckboxes(e) {
    e.preventDefault();
    
    // convert node list to an array
    const checkboxArray = Array.prototype.slice.call(this.form);

    // filtering checked checkboxes
    const checkedCheckboxes = checkboxArray.filter(input => input.checked);

    // mapping checked checkboxes to new array
    this.checkedCheckboxesValues = checkedCheckboxes.map(input => input.value);
  }

  handleGenreClick = (e) => {
    this.storeCheckboxes(e);
    // upating state with genre values
    this.setState({'step': 3,
                   'genres': this.checkedCheckboxesValues
                  })
  }

  handleInstrumentClick = (e) => {
    this.storeCheckboxes(e);
    // upating state with genre values
    this.setState({'step': 4,
                   'instruments': this.checkedCheckboxesValues
                  })
  }

  handleSliderChange = (item,index) => {
    console.log(item.value);
  }

  render() {
    console.log('state is ',this.state);
    return (
      <div className="form-inner">
      <form className="app__form-group form-group" ref={form => this.form = form}>
        {this.state.step === 1 && <Email value={this.state.email} onchange={this.handleEmailChange} onclick={this.handleEmailClick}/>}
        {this.state.step === 2 && <Checklist options={this.genreOptions} onclick={this.handleGenreClick}/>}
        {this.state.step === 3 && <Checklist options={this.instrumentOptions} onclick={this.handleInstrumentClick}/>}
        {this.state.step === 4 && <Sliderlist options={this.state.instruments} onchange={this.handleSliderChange} label={this.state.instruments}/>}
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
        <label key={item.label}><input key={item.label} type="checkbox" value="50" onChange={this.props.onchange}/>{item.label}</label>
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

class Sliderlist extends Component {
  toItem = (item,idx) => {
    const {label} = this.props;
    return (
        <div key={idx}>
          {label[idx]}
          <input onChange={()=>{this.props.onchange(item,idx)}} key={idx} name={item.label} type="range" min="1" max="100" value={item.value} className="slider"/>
        </div>
      )
    }

    render() {
      const {options} = this.props;
      return (
        <div>
          {options.map(this.toItem)}
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
