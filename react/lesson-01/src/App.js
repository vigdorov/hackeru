import React from 'react';
import './App.css';
import Buttons from './components/Buttons';
import Body from './components/Body';
import First from './firstLevel';
import { FamilyProvider } from './components/FamilyContext';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      header: props.header,
      data: {
        userName: 'John',
        userAge: 25,
        userId: 0,
        thirdInput: 'info',
      },
      count: 0
    };
  }

  handleChange = (e) => {
    let {name, value} = e.target;
    this.setState( (previousState) => {
      return ({
        data: {
          ...previousState.data,
          [name]: value,
        }
      });
    }, () => {
      console.log('state changed');
    });

  };

  handleIncrement = (value) => {
    this.setState( (previousState) => {
      return ({
        count: previousState.count + value
      });
    })
  };

  render () {
    return (
      <FamilyProvider value={ this.state.data }>
      <div className="App">
        <header className="App-header">
          <h4>{this.state.header}</h4>
          <h4>Счетчик: {this.state.count}</h4>
          <img
            src="https://s1.1zoom.ru/b5050/344/292505-Sepik_1920x1200.jpg"
            className="App-logo"
            alt="logo" />
          <input
            type="text"
            name="userName"
            onChange={ this.handleChange }
            value={ this.state.data.userName }
          />
          <input
            type="text"
            name="userAge"
            onChange={ this.handleChange }
            value={ this.state.data.userAge }
          />
          <input
            type="text"
            name="userId"
            onChange={ this.handleChange }
            value={ this.state.data.userId }
          />
          <Buttons handleClick={ this.handleIncrement } />
          <Body bodyText='Привет это текст' person={{name: 'Иван', age: 45}}/>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <h5>{ this.state.data.thirdInput}</h5>
          <First
            value={this.state.data.thirdInput}
            handleChange={this.handleChange}
          />
        </header>
      </div>
      </FamilyProvider>
    );
  }
}

