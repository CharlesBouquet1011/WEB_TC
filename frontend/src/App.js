import logo from './logo.svg';
import './App.css';
import ItemsList from './ItemList.jsx';
import React, { useState, useEffect } from 'react';
function App() {
  const [csrfToken, setCsrfToken] = useState('');
  useEffect(()=> {async function fetchCSRFToken(){ //syntaxe nulle comme on peut pas utiliser async/await avec react
    try{
        var response=await fetch("http://localhost:3000/api/csrf-token");
        response=response.json();
        setCsrfToken(response.csrfToken)
    }
    catch (err) {
        console.error("erreur:" + err)
    }

  
  }
  fetchCSRFToken();
}, []
  
  );
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> 
          Edit <code>src/App.js</code> and save to reload. 
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <ItemsList />
    </div>
  );
}

export default App;
