import React from 'react'
import axios from 'axios'

class Investments extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      investments: []
    };
  }

  componentDidMount () {
    this.fetchInvestments();
  }

  fetchInvestments () {
    axios.get('/api/v1/investments')
      .then(response => {
        this.setState({ investments: response.data })
      })
      .catch(error => console.log(error));
  }

  render () {
    return (
      <div>
        <p>xxx</p>
      </div>
    )
  }
}

export default Investments
