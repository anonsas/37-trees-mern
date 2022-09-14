import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [trees, setTrees] = useState([]);
  const [error, setError] = useState('');

  console.log(trees);

  useEffect(() => {
    axios
      .get('http://localhost:4000/trees')
      .then((response) => setTrees(response.data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  return <div></div>;
}

export default App;
