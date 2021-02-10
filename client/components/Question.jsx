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
          <button className="show-hide material-icons md-24" onClick={this.hideClue}>highlight_off</button>


          {this.state.displayClue ?
            <div className="clue">
            <div id="question" onClick={this.showQuestion}>
              {this.state.displayQuestion ?
                this.props.clue.question.toUpperCase()
                : '$' + this.props.clue.value}
            </div>

            <div id="answer">
              {this.state.displayAnswer ?
                this.props.clue.answer.toUpperCase()

                : null }
                <button className="show-answer material-icons md-24" onClick={this.showAnswer}>check_circle_outline</button>
            </div>
          </div>
          : null}
        </div>
    )
  }
}

export default Question;