import React, { useContext } from 'react';
import TreesContext from '../../contexts/TreesContext';
import axios from 'axios';

function Tree({ tree }) {
  const { types, setLastUpdate, setModalData } = useContext(TreesContext);

  const editTreeHandler = (tree) => {
    setModalData({ ...tree });
  };

  const deleteTreeHandler = (id) => {
    axios
      .delete(`http://localhost:4000/trees/${id}`)
      .then((response) => {
        setLastUpdate(Date.now());
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="tree">
      <div className="tree__content" key={tree.id}>
        <p>{tree.title}</p>
        <p>{tree.height}m</p>
        <p>{types.find((t) => t.id === tree.type).type}</p>
      </div>
      <div className="tree__actions">
        <button onClick={() => editTreeHandler(tree)}>Edit</button>
        <button onClick={() => deleteTreeHandler(tree.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Tree;
