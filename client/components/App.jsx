import React from 'react';
import Category from './Category.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      categoryIds: [],
      categoryInfo: {}
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
        console.log(categoryId)
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

  async getCategoryInfo() {
    let categoryPromises = this.state.categoryIds.map((categoryId) => {
      return axios.get(`http://jservice.io/api/category?id=${categoryId}`)
    })
    let resolvedCategories = await Promise.all(categoryPromises);
    this.setState({categoryInfo: resolvedCategories})
  }


  componentDidMount() {
    this.getCategoryIds();
    // this.getCategoryInfo();
  }

  render() {
    return (
      <div>
        Hello World its me
        <Category/>
      </div>
    )
  }
}

export default App;