import React, { useContext } from 'react';
import './Trees.scss';
import TreesContext from '../../contexts/TreesContext';
import Tree from './Tree';

function Trees() {
  const { trees } = useContext(TreesContext);

  return (
    <div className="trees-container">
      {trees?.map((tree) => (
        <Tree tree={tree} key={tree.id} />
      ))}
    </div>
  );
}

export default Trees;
