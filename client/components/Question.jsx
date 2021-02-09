import React from 'react'

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayQuestion: false
    }
    this.showQuestion = this.showQuestion.bind(this);
  }

  showQuestion() {
    this.setState({displayQuestion: !this.state.displayQuestion})
  }

  render() {
      return (
        <div onClick={this.showQuestion}>
          {this.state.displayQuestion ? this.props.clue.question : this.props.clue.value}
        </div>
    )
  }
}

export default Question;