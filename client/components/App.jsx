import React from 'react';
import Category from './Category.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      categoryIds: [],
      categoryInfo: []
    }
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
        this.setState({categoryInfo: categories.slice(0,4)})
      })
      .catch((err) => {throw(err)})
    })
    .catch((err)=>{throw(err)})
  }

  componentDidMount() {
    this.getCategoryIds();
  }

  render() {
    return (
      <div>
        {this.state.categoryInfo.map((category) => {
          return <Category key={category.id} category={category}/>
        })}
      </div>
    )
  }
}

export default App;