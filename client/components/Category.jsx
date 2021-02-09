import React from 'react';
import CategoryName from './CatName.jsx';
import Question from './Question.jsx';

class Category extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <CategoryName title={this.props.category.title}/>
        {this.props.category.clues.map((clue) => {
          return <Question key={clue.id} clue={clue}/>
        })}
      </div>
    )
  }
}

export default Category;