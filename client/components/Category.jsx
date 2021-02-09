import React from 'react'
import Question from './Question.jsx'

class Category extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        Map of questions here
        <Question/>
      </div>
    )
  }
}

export default Category;