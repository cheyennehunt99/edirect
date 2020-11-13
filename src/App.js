import React from 'react';
import './App.css';
import Wrapper from './components/Wrapper/index.js';
import Head from './components/Head/index.js';
import Main from './components/DataBody/index.js';

function App() {
  return (
    <div className="App">
      <Wrapper>
      <Head />
      <Main />
      </Wrapper>
    </div>
  );
}

export default App;