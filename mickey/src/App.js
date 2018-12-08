/* global document */
import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Expose-Headers': 'Access-Token, Uid',
  },
  withCredentials: true,
};

let myFunc;

class App extends Component {
  state = {
    list: [],
    count: 0,
  }

  setCookie = (name, value, daysToExpiry) => {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpiry * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8888/test`, config)
      .then(res => {
        let fakecookie = res.headers['fake-cookie'];
        console.log(fakecookie);
        this.setCookie('MyMikeyCookie', fakecookie, 1);
        const list = res.data;
        this.setState({ list });
      })
      .catch((res) => {
        console.log('Error', res);
      })


    myFunc = setInterval(() => {
      this.setState((prev) => {
        return { count: prev.count + 1}
      });
      if (this.state.count > 3) {
        console.warn(`@COUNT IS > than 3 [${this.state.count}]`);
        clearInterval(myFunc);
      }
      const num = Math.floor(Math.random()*100);
      axios
        .get(`http://localhost:8888/gimmecookie?q=${num}`, config)
        .then(res => {
          
          console.log(`Gimmi Call [${num}]`, res.data.name);
        })
        .catch((res) => {
          console.log('CUSTOM FAIL:', res);
        })
    }, 8000);

  }

  componentWillUnmount() {
    console.log('Unmount');
    clearInterval(myFunc);
  }

  render() {
    return (
      <div className="App">
        <h1>Some fancy code</h1>
        <ul>
          {this.state.list.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
