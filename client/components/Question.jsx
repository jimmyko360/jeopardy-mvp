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
        <div className="cell">
          <button className="show-hide" onClick={this.hideClue}>X</button>
          {this.state.displayClue ?
            <div>
            <div className="question" onClick={this.showQuestion}>
              {this.state.displayQuestion ?
                this.props.clue.question
                : this.props.clue.value}
            </div>

            <div className="answer">
              {this.state.displayAnswer ?
                this.props.clue.answer
              : null  }
            </div>
            <button className="show-answer" onClick={this.showAnswer}>Show Answer</button>
          </div>
          : null}
        </div>
    )
  }
}

export default Question;