import React from 'react'

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayClue: true,
      displayQuestion: false,
      displayAnswer: false
    }
    this.showQuestion = this.showQuestion.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.hideClue = this.hideClue.bind(this);
  }

  hideClue() {
    this.setState({displayClue: !this.state.displayClue})
  }

  showQuestion() {
    this.setState({displayQuestion: !this.state.displayQuestion})
  }

  showAnswer() {
    this.setState({displayAnswer: !this.state.displayAnswer})
  }

  render() {
      return (
        <div>
          {this.state.displayClue ?
            <div>
            <div onClick={this.showQuestion}>
              {this.state.displayQuestion ?
                this.props.clue.question
                : this.props.clue.value}
            </div>

            <div>
              {this.state.displayAnswer ?
                this.props.clue.answer
              : null  }
            </div>
            <button onClick={this.showAnswer}>Show Answer</button>
          </div>
          : null}
          <button onClick={this.hideClue}>X</button>
        </div>
    )
  }
}

export default Question;