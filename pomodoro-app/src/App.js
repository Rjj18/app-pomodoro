import React from 'react';
import Timer from './Timer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pomodoro Timer App</h1>
      </header>
      <main>
        <Timer />
      </main>
      <footer>
        <p>Stay focused and productive!</p>
      </footer>
    </div>
  );
}

export default App;
