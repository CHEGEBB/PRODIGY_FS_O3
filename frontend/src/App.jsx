import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import LoginPage from './Auth/Login';
import SignupPage from './Auth/Signup';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;