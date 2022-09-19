import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Loader from './helpers/Loader';
import TressForm from './components/Trees/TressForm';
import Trees from './components/Trees/Trees';
import TreesContext from './contexts/TreesContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [trees, setTrees] = useState(null);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const types = [
    { id: 1, type: 'Lapuotis' },
    { id: 2, type: 'Spygliuotis' },
    { id: 3, type: 'Palme' },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:4000/trees')
      .then((response) => {
        setIsLoading(false);
        setTrees(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, [lastUpdate]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <TreesContext.Provider value={{ trees, setTrees, types, setLastUpdate }}>
      <main className="main">
        <TressForm />
        <Trees />
      </main>
    </TreesContext.Provider>
  );
}

export default App;
