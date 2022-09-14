import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Loader from './helpers/Loader';
import Trees from './components/Trees/Trees';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [trees, setTrees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/trees/2')
      .then((response) => {
        setIsLoading(false);
        setTrees(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <Trees trees={trees} />
    </div>
  );
}

export default App;
