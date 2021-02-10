import React from 'react';
import Question from './Question.jsx';

let CategoryName = (props) => {
  return (
    <div className="cell" id="title">
      <button
      className="reroll material-icons md-24"
      onClick={() => {props.getNewCategory(props.index)}}
      >
        cached
      </button>

        {props.title.toUpperCase()}
    </div>
  )
}

export default CategoryName;