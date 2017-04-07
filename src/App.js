import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Box from './components/Box';

class App extends Component {
  render() {
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <br />
        <div style={{ display: 'flex',  width: '10px', flexFlow: 'row wrap', width: '10rem' }}>
          <Box classNames={['unchecked']} />
          <Box revealed={false} flag={true} />
          <Box revealed={true} value={-1} />
          <Box revealed={true} value={1} />
          <Box revealed={true} value={2} />
          <Box revealed={true} value={3} />
          <Box revealed={true} value={4} />
          <Box revealed={true} value={5} />
          <Box revealed={true} value={6} />
          <Box revealed={true} value={7} />
          <Box revealed={true} value={8} />
          <Box revealed={true} value={0} />
        </div>
      </div>
    );
  }
}

export default App;
