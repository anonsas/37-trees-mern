import React from 'react';
import './Trees.scss';

function Trees({ trees }) {
  return (
    <div className="trees-container">
      {trees?.map((tree) => (
        <div className="tree" key={tree.id}>
          <p>{tree.title}</p>
          <p>{tree.height}m</p>
          <p>{tree.type}</p>
        </div>
      ))}
    </div>
  );
}

export default Trees;
