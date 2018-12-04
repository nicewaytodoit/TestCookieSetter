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
  }
};

class App extends Component {
  state = {
    list: []
  }

  setCookie = (name, value, daysToExpiry) => {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpiry * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8888/test`)
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
