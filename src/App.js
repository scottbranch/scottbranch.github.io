import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import cx from 'classnames';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className={cx('app')}>
          <Form/>
      </div>
    );
  }
}

class Form extends Component {

  state = {
    'step': 1,
    'instruments': []
  }

  genreOptions = [{
      label: 'Rock',
      class: 'genre',
    },
    {
      label: 'Hip-Hop',
      class: 'genre',
    },
    {
      label: 'Country',
      class: 'genre',
    },
    {
      label: 'Electronic',
      class: 'genre',
    },
    {
      label: 'Classical',
      class: 'genre',
    },
    {
      label: 'Metal',
      class: 'genre',
    }]

  instrumentOptions = [{
      label: 'Guitar',
      class: 'instrument',
    },
    {
      label: 'Bass',
      class: 'instrument',
    },
    {
      label: 'Drums',
      class: 'instrument',
    },
    {
      label: 'Piano',
      class: 'instrument',
    },
    {
      label: 'Vocals',
      class: 'instrument',
    },
    {
      label: 'Saxaphone',
      class: 'instrument',
    }]

  step1Heading = "Enter your email and let's get started with your profile!";
  step2Heading = "Alright! Lets pick what genres of music youre interested in playing.";
  step3Heading = "Now justt check all of the instruments you play.";
  step4Heading = "Use the sliders to rate how proficient you are in each instrument. 1 being you just started, 100 being youre touring with Beyonce.";

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handleEmailClick = (e) => {
    this.setState({'step': 2})
  }

  handleGenreClick = (e) => {
    e.preventDefault();
    
    // convert node list to an array
    const links = document.getElementsByClassName('genre');

    const genreArray = Array.prototype.slice.call(links);
    console.log('this form is' ,this.form);

    // filtering checked checkboxes
    const checkedCheckboxes = genreArray.filter(input => input.checked);

    // mapping checked checkboxes to new array
    const genreValues = checkedCheckboxes.map(input => input.value);
    // upating state with genre values
    this.setState({'step': 3,
                   'genres': genreValues
                  })
  }

  handleInstrumentChange = () => {
    
    // convert node list to an array
    const links = document.getElementsByClassName('instrument');

    const instrumentArray = Array.prototype.slice.call(links);

    // filtering checked checkboxes
    const checkedCheckboxes = instrumentArray.filter(input => input.checked);

    // mapping checked checkboxes to new array
    const instrumentValues = checkedCheckboxes.map(input => input.value);
    // upating state with genre values
    this.setState({'instruments': instrumentValues})
  }

  handleInstrumentClick = (e) => {
    e.preventDefault();

    this.setState({'step': 4})
  }

  handleSliderChange = (item,index,e) => {
    console.log(item,index,e);
  }

  render() {
    console.log('state is ',this.state);
    return (
      <div>
        <Heading text={this.step1Heading}/>
        <div className="app__inner">
          <div className="form-inner">
          <form className="app__form-group form-group" ref={form => this.form = form}>
            <Email isactive={this.state.step === 1 ? "active" : ""} value={this.state.email} onchange={this.handleEmailChange} onclick={this.handleEmailClick}/>
            <Checklist isactive={this.state.step === 2 ? "active" : ""} options={this.genreOptions} onclick={this.handleGenreClick}/>
            <Checklist isactive={this.state.step === 3 ? "active" : ""} options={this.instrumentOptions} onchange={this.handleInstrumentChange} onclick={this.handleInstrumentClick}/>
            <Sliderlist isactive={this.state.step === 4 ? "active" : ""} options={this.state.instruments} onchange={this.handleSliderChange} label={this.state.instruments}/>
          </form>
          </div>
        </div>
      </div>
    )
  }
}

class Email extends Component {

  render() {
    const { email,onchange,onclick,isactive} = this.props;
    return (
      <div className={`app__form-step app__form-step--1 ${isactive}`} key="step1container">
        <input key="step1input" value={email} onChange={onchange} className="form-control" name="email" type="email" placeholder="jane@gmail.com" autoComplete="off"></input>
        <Button key="step1button" text="Lets Go!" onclick={onclick}/>
      </div>
    )
  }
}

class Checklist extends Component {

  toItem = (item,idx) => {
    return (
      <label key={item.label}><input key={item.label} className={item.class} type="checkbox" value={item.label} onChange={this.props.onchange}/>{item.label}</label>
    )
  }

  render() {
    const {options,onclick,isactive} = this.props;
    return (
      <div className={`app__form-step app__form-step--2 ${isactive}`}>
        {options.map(this.toItem)}
        <Button text="Next" onclick={onclick}/>
      </div>
    )
  }
}

class Sliderlist extends Component {
  toItem = (item,idx) => {
    const {label} = this.props;
    console.log(item);
    return (
        <label key={idx}>
          {label[idx]}
          <input onChange={(e)=>{this.props.onchange(item,idx,e)}} key={idx} name={item.label} type="range" min="1" max="100" value={item.value} className="slider"/>
        </label>
      )
    }

    render() {
      const {options,isactive} = this.props;
      return (
        <div className={`app__form-step app__form-step--4 ${isactive}`}>
          {options.map(this.toItem)}
        </div>
      )
    }
  }

class Button extends Component {
  render() {
    const {text,onclick} = this.props;
    return (
      <button key="button" type="button" className="btn btn-light btn-lg" onClick={onclick}>{this.props.text}</button>
    )
  }
}

class Heading extends Component {
  render() {
    const {text} = this.props;
    return (
      <h3>{text}</h3>
    )
  }
}

export default App;
