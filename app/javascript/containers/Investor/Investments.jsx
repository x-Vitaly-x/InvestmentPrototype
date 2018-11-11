import React from 'react'
import axios from 'axios'

import InvestmentField from '../../components/Investor/Investments/InvestmentField/InvestmentField';

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
        <table className='table'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Bank Name</td>
              <td>Amount</td>
              <td>Interest</td>
              <td>Risk</td>
              <td>Due Date</td>
            </tr>
          </thead>
          <tbody>
            {this.state.investments.map(investment => {
              return (
                <InvestmentField
                  key={investment.id}
                  investment={investment}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Investments
