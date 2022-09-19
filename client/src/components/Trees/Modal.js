import React, { useState, useEffect, useContext } from 'react';
import TreesContext from '../../contexts/TreesContext';
import axios from 'axios';

function Modal() {
  const { types, modalData, setModalData, setLastUpdate } = useContext(TreesContext);

  const [newTree, setNewTree] = useState({
    title: '',
    height: '',
    type: 1,
  });

  useEffect(() => {
    if (!modalData) return;
    setNewTree({ ...modalData });
  }, [modalData]);

  const saveEditHandler = (e) => {
    e.preventDefault();
    if (!newTree.title || !newTree.height) return alert('Please fill the FORM!');

    const sendTree = {
      title: newTree.title,
      height: parseFloat(newTree.height),
      type: parseInt(newTree.type),
    };

    axios
      .put(`http://localhost:4000/trees/${modalData.id}`, sendTree)
      .then((response) => {
        setNewTree({
          title: '',
          height: '',
          type: 1,
        });
        setModalData(null);
        setLastUpdate(Date.now());
      })
      .catch((error) => alert(error.message));
  };

  const handleChange = (e) => {
    setNewTree((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  if (!modalData) return null;

  return (
    <div className="overlay">
      <form className="edit-form" onSubmit={saveEditHandler}>
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
        <button type="submit">Save</button>
        <button onClick={() => setModalData(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default Modal;
