import { useState } from 'react';
import logo from './assets/pokeindex_logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Pokemon Logo" className="logo" />
        <h1>Pokédex Dashboard</h1>
      </header>
      
      <main>
        {/* Your Pokemon search and display will go here */}
      </main>
    </div>
  );
}

export default App;