import React from 'react';
import Question from './Question.jsx';

let CategoryName = (props) => {
    return (
      <div className="cell title">
        {props.title.toUpperCase()}
      </div>
    )
}

export default CategoryName;