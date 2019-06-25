import React from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import Header from './components/header';

function App() {
  return (
    <div className="MainBox">
      
      <div className="header">
        <Header > </Header>  
      </div>

      <div className="dashboard">
        <Dashboard > </Dashboard>
      </div>

    </div>
  );
}

export default App;
