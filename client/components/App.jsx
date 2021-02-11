import React from 'react';
import Category from './Category.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      categoryIds: [],
      categoryInfo: [],
      dailyDoubleOne: [],
      dailyDoubleTwo: []
    }
    this.getNewCategory = this.getNewCategory.bind(this)
  }

  getNewCategory(column) {
    let newCategory = Math.floor(Math.random() * (18418 - 1)) + 1
    axios.get(`http://jservice.io/api/category?id=${newCategory}`)
    .then((category) => {
      let state = this.state.categoryInfo.slice();
      state[column] = category.data
      this.setState({categoryInfo: state})
    })
    .catch((err) => {console.log(err)})
  }

  getCategoryIds() {
    axios.get('http://jservice.io/api/categories?count=5')
    .then((categories) => {
      let idArr = categories.data.map((category) => {
        return category.id
      })
      this.setState({categoryIds: idArr})
      return idArr
    })
    .then((ids) => {
      let categoryInfo = ids.map((categoryId) => {
        return axios.get(`http://jservice.io/api/category?id=${categoryId}`)
      })
      Promise.all(categoryInfo)
      .then((categoryPromiseArray) => {
        let categories = categoryPromiseArray.map((category) => {
          return category.data
        })
        this.setState({categoryInfo: categories})
      })
      .catch((err) => {throw(err)})
    })
    .catch((err)=>{throw(err)})
  }

  componentDidMount() {
    this.setState({
      dailyDoubleOne: [Math.floor(Math.random() * (5 - 0)),
        Math.floor(Math.random() * (5 - 0))],
        dailyDoubleTwo: [Math.floor(Math.random() * (5 - 0)),
          Math.floor(Math.random() * (5 - 0))]
        })
    this.getCategoryIds();
  }

  render() {
    return (
      <div className="app">
        {this.state.categoryInfo.map((category, index) => {
          if (index === this.state.dailyDoubleOne[0]) {
            return <Category
            dailyDouble={this.state.dailyDoubleOne}
            key={category.id}
            index={index}
            category={category}
            getNewCategory={this.getNewCategory}
            />
          } else if (index === this.state.dailyDoubleTwo[0]) {
            return <Category
            dailyDouble={this.state.dailyDoubleTwo}
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
      </div>
    )
  }
}

export default App;