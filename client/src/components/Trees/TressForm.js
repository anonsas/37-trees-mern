import React, { useState, useContext } from 'react';
import TreesContext from '../../contexts/TreesContext';
import axios from 'axios';

function TressForm() {
  const { types, setLastUpdate } = useContext(TreesContext);

  const [newTree, setNewTree] = useState({
    title: '',
    height: '',
    type: 1,
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!newTree.title || !newTree.height) return alert('Please fill the FORM!');

    const sendTree = {
      title: newTree.title,
      height: parseFloat(newTree.height),
      type: parseInt(newTree.type),
    };

    axios
      .post('http://localhost:4000/trees', sendTree)
      .then((response) => {
        setNewTree({
          title: '',
          height: '',
          type: 1,
        });
        setLastUpdate(Date.now());
      })
      .catch((error) => alert(error.message));
  };

  const handleChange = (e) => {
    setNewTree((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={newTree.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="height">Height:</label>
        <input
          type="text"
          name="height"
          id="height"
          value={newTree.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="type">type:</label>
        <select name="type" id="type" value={newTree.type} onChange={handleChange}>
          {types.map((t) => (
            <option value={t.id} key={t.id}>
              {t.type}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default TressForm;
