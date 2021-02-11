import React from 'react';
import CategoryName from './CategoryName.jsx';
import Question from './Question.jsx';

class Category extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="category">
        <CategoryName
        index={this.props.index}
        title={this.props.category.title}
        getNewCategory={this.props.getNewCategory}
        />
        {this.props.category.clues.slice(0, 5).map((clue, index) => {
          if (index === this.props.dailyDouble[1]) {
            return <Question
            key={clue.id}
            clue={clue}
            dailyDouble={true}
            />
          } else {
            return <Question
            key={clue.id}
            clue={clue}
            dailyDouble={false}
            />
          }
        })}
      </div>
    )
  }
}

export default Category;