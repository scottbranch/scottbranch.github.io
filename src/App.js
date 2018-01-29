import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Form/>
      </div>
    );
  }
}

class Form extends Component {

  state = {
    'step': 1,
    'name': '',
    'genres': [],
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

  stepHeading = [
    "Enter your full name and let's get started with your profile!",
    "Alright! Lets pick what genres of music youre interested in playing.",
    "Great! Now check any of the instruments you know how to play.",
    "Use the sliders to rate how proficient you are in each instrument. 1 being you just started, 100 being you're touring with Beyonce.",
    "Awesome! Weve got your base profile ready to start pairing you with some local musicians!"
  ]

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleNameClick = (e) => {
    const nameError = document.getElementById('name-error');
    if (this.state.name === '') {
      nameError.classList.add('show');
    } else {
      nameError.classList.remove('show');
      this.setState({'step': 2})
    }
  }

  handleGenreChange = () => {
    
    // convert node list to an array
    const links = document.getElementsByClassName('genre');

    const genreArray = Array.prototype.slice.call(links);

    // filtering checked checkboxes
    const checkedCheckboxes = genreArray.filter(input => input.checked);

    // mapping checked checkboxes to new array
    const genreValues = checkedCheckboxes.map(input => input.value);
    this.setState({'genres':genreValues})
  }

  handleGenreClick = () => {
    const genreError = document.getElementById('genre-error');
    if(this.state.genres == ''){
      genreError.classList.add('show');
    } else {
      this.setState({'step': 3})
      genreError.classList.remove('show');
    }
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

  handleInstrumentClick = () => {
    const instrumentError = document.getElementById('instrument-error');
    if(this.state.instruments == '') {
      instrumentError.classList.add('show');
    } else {
      this.setState({'step': 4})
      instrumentError.classList.add('show');
    }
  }

  handleSliderChange = (item,index,e) => {
    console.log(e.target.value);
  }

  handleSliderClick = () => {
    this.setState({'step': 5})
  }

  handleBoom = () => {
    this.setState({'step': 6})
  }

  handleRestart = () => {
    const nameInput = document.getElementById('name-input');
    const links = document.getElementsByClassName('checkbox');
    const instrumentArray = Array.prototype.slice.call(links);

    // filtering checked checkboxes
    const checkedCheckboxes = instrumentArray.filter(input => input.checked);

    for(let i = 0; i < checkedCheckboxes.length; i++) {
      checkedCheckboxes[i].checked = false;
    }

    nameInput.value = '';
    this.setState({'step': 1,'genres':[],'instruments':[]})
  }

  render() {
    console.log('state is ',this.state);
    return (
        <div className="app__inner">
          <div className="form-inner">
          <form className="app__form-group form-group" ref={form => this.form = form}>
            <Name isactive={this.state.step === 1 ? "active" : ""} value={this.state.email} onchange={this.handleNameChange} onclick={this.handleNameClick} text={this.stepHeading[0]}/>
            <Checklist isactive={this.state.step === 2 ? "active" : ""} options={this.genreOptions} onchange={this.handleGenreChange} onclick={this.handleGenreClick} text={this.stepHeading[1]} errorid="genre-error" errortext="Ah ah ah.."/>
            <Checklist isactive={this.state.step === 3 ? "active" : ""} options={this.instrumentOptions} onchange={this.handleInstrumentChange} onclick={this.handleInstrumentClick} text={this.stepHeading[2]} errorid="instrument-error" errortext="Don't sell yourself short."/>
            <Sliderlist isactive={this.state.step === 4 ? "active" : ""} options={this.state.instruments} onchange={this.handleSliderChange} label={this.state.instruments} text={this.stepHeading[3]} onclick={this.handleSliderClick}/>
            <Profilecard isactive={this.state.step === 5 ? "active" : ""} instruments={this.state.instruments} genres={this.state.genres} name={this.state.name} text={this.stepHeading[4]} onclick={this.handleBoom}/>
            {this.state.step === 6 && <Boom onclick={this.handleRestart}/>}
          </form>
          </div>
        </div>
    )
  }
}

class Name extends Component {

  render() {
    const { email,onchange,onclick,isactive,text } = this.props;
    return (
      <div className={`app__form-step app__form-step--1 ${isactive}`} key="step1container">
        <Heading text={text}/>
        <input id="name-input" key="step1input" value={email} onChange={onchange} className="form-control" name="name" type="text" placeholder="Ned Shneebly" autoComplete="off" maxLength="80"></input>
        <Button key="step1button" text="Lets Go!" onclick={onclick}/>
        <p id="name-error" className="error">Come on now.</p>
      </div>
    )
  }
}

class Checklist extends Component {

  toItem = (item,idx) => {
    return (
      <label key={item.label}><input key={item.label} className={`checkbox ${item.class}`} type="checkbox" value={item.label} onChange={this.props.onchange}/>{item.label}</label>
    )
  }

  render() {
    const { options,onclick,isactive,text,errorid,errortext } = this.props;
    return (
      <div className={`app__form-step app__form-step--2 ${isactive}`}>
        <Heading text={text}/>
        <div className="app__list-items">
          {options.map(this.toItem)}
        </div>
        <Button text="Next" onclick={onclick}/>
        <p id={errorid} className="error">{errortext}</p>
      </div>
    )
  }
}

class Sliderlist extends Component {
  toItem = (item,idx) => {
    const {label} = this.props;
    return (
      <label key={idx}>
        <div className="app__slider-title">
        <span>{label[idx]}</span><span>{item.value}/100</span>
        </div>
        <input onChange={(e)=>{this.props.onchange(item,idx,e)}} key={idx} name={item.label} type="range" min="1" max="100" value={item.value} className="slider"/>
      </label>
    )
  }

  render() {
    const { options,isactive,onclick,text } = this.props;
    return (
      <div className={`app__form-step app__form-step--4 ${isactive}`}>
        <Heading text={text}/>
        <div className="app__list-items">
          {options.map(this.toItem)}
        </div>
        <Button text="Next" onclick={onclick}/>
      </div>
    )
  }
}

class Profilecard extends Component {
  toGenre = (item,idx) => {
    return (
      <li key={idx}>{item}</li>
    )
  }

  toInstrument = (item,idx) => {
    return (
      <li key={idx}>{item}  - skill level: 7/10</li>
    )
  }

  render() {
    const { isactive,text,name,genres,instruments,onclick } = this.props;
    return (
      <div className={`app__form-step app__form-step--5 ${isactive}`}>
      <Heading text={text}/>
      <div className="app__list-items">
        <div>
          <h4>{name}</h4>
          <div>
            <p>Genres you like:</p>
            <ul>
            {genres.map(this.toGenre)}
            </ul>
          </div>
          <div>
            <p>Instruments you play:</p>
            <ul>
            {instruments.map(this.toInstrument)}
            </ul>
          </div>
        </div>
        <div className="upload-btn-wrapper">
          <button className="image-button">Upload an image</button>
          <input type="file" name="myfile" />
        </div>
      </div>
      <Button text="Lets get rockin!" onclick={onclick}/>
      </div>
    )
  }
}

class Boom extends Component {
  render() {
    const { onclick } = this.props;
    return (
      <div className="boom">
        <div>
        <h3>Welcome to your app.</h3>
        <img src="https://media1.tenor.com/images/67983f97d26b535a9937d9fc327e6086/tenor.gif?itemid=5797964" alt="hulk"/>
        <Button text="Run it again" onclick={onclick}/>
        </div>
      </div>
    )
  }
}

class Button extends Component {
  render() {
    const { text,onclick } = this.props;
    return (
      <button key="button" type="button" className="btn btn-light btn-lg" onClick={onclick}>{text}</button>
    )
  }
}

class Heading extends Component {
  render() {
    const { text } = this.props;
    return (
      <h3>{text}</h3>
    )
  }
}

export default App;
