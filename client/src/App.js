// client/src/App.js
import React from 'react';
import Login from './Components/Login/Login';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default App;
// export NODE_OPTIONS=--openssl-legacy-provider