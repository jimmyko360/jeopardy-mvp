import React from 'react';
import Category from './Category.jsx'
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app');

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      categoryIds: [],
      categoryInfo: [],
      dailyDoubleOne: [],
      dailyDoubleTwo: [],
      displayModal: false,
      doubleJeopardy: false
    }
    this.getNewCategory = this.getNewCategory.bind(this)
    this.displayModal = this.displayModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.doubleJeopardy = this.doubleJeopardy.bind(this)
  }

  displayModal() {
    this.setState({displayModal: true})
  }

  closeModal() {
    this.setState({displayModal: false})
  }

  getNewCategory(column) {
    let newCategory = Math.floor(Math.random() * (18418 - 1)) + 1
    axios.get(`http://jservice.io/api/category?id=${newCategory}`)
    .then((category) => {
      if ((this.state.doubleJeopardy && category.data.clues[0].value === 100) || (!this.state.doubleJeopardy && category.data.clues[0].value === 200)) {
        this.getNewCategory(column);
      }
      let state = this.state.categoryInfo.slice();
      state[column] = category.data
      this.setState({categoryInfo: state})
    })
    .catch((err) => {console.log(err)})
  }

  getCategoryIds() {
    for (let i = 0; i < 5; i++) {
      this.getNewCategory(i);
    }
  }

  getDailyDoubles() {
    this.setState({
      dailyDoubleOne: [Math.floor(Math.random() * (5 - 0)),
        Math.floor(Math.random() * (5 - 0))],
      dailyDoubleTwo: [Math.floor(Math.random() * (5 - 0)),
        Math.floor(Math.random() * (5 - 0))]
    })
  }

  doubleJeopardy() {
    this.setState({doubleJeopardy: !this.state.doubleJeopardy})
    this.getDailyDoubles();
    this.getCategoryIds();
  }

  componentDidMount() {
    this.getDailyDoubles();
    this.getCategoryIds();
  }

  render() {
    return (
      <div className="app">
        <h2 onClick={this.doubleJeopardy}>
          {this.state.doubleJeopardy ? 'DOUBLE JEOPARDY!' : 'JEOPARDY!'}
        </h2>
        {this.state.categoryInfo.map((category, index) => {
          if (index === this.state.dailyDoubleOne[0]) {
            return <Category
            dailyDouble={this.state.dailyDoubleOne}
            displayModal={this.displayModal}
            key={category.id}
            index={index}
            category={category}
            getNewCategory={this.getNewCategory}
            />
          } else if (index === this.state.dailyDoubleTwo[0]) {
            return <Category
            dailyDouble={this.state.dailyDoubleTwo}
            displayModal={this.displayModal}
            key={category.id}
            index={index}
            category={category}
            getNewCategory={this.getNewCategory}
            />
          } else {
            return <Category
            dailyDouble={[]}
            key={category.id}
            index={index}
            category={category}
            getNewCategory={this.getNewCategory}
            />
          }
        })
        }
        <Modal
          isOpen={this.state.displayModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
          className={'modal'}
          contentLabel="Daily Double Modal"
        >
          <h1 className="modal-text">
            DAILY DOUBLE<br/>
          </h1>
        </Modal>
      </div>
    )
  }
}

export default App;