import React, { useContext } from 'react';
import TreesContext from '../../contexts/TreesContext';
import axios from 'axios';

function Tree({ tree }) {
  const { types, setLastUpdate } = useContext(TreesContext);

  const deleteTreeHandler = (id) => {
    axios
      .delete(`http://localhost:4000/trees/${id}`)
      .then((response) => {
        console.log(`Item with ${id} deleted`);
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
        <button>Edit</button>
        <button onClick={() => deleteTreeHandler(tree.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Tree;
