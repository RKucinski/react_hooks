import React from 'react';
import './App.css';
import FetchData, {FetchDataSplit} from './components/FetchData.jsx'

function App() {
  return (
    <div className="App">
      <FetchData />
      <h1>NEXT SOLUTION</h1>
      <FetchDataSplit />
    </div>
  );
}

export default App;
