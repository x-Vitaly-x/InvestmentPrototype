import React from 'react'
import axios from 'axios'
import MortgageField from './mortgage/mortgage_field'

class Mortgages extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mortgages: []
    };
  }

  componentDidMount () {
    this.fetchInvestments();
  }

  fetchInvestments () {
    axios.get('/api/v1/mortgages')
      .then(response => {
        this.setState({ mortgages: response.data })
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
              <td>Bank</td>
              <td>Risk</td>
              <td>Due Date</td>
              <td>Amount</td>
              <td>Interest Rate</td>
              <td>Updated</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.state.mortgages.map((mortgage, index) => {
              return (<MortgageField
                key={mortgage.id}
                mortgageId={mortgage.id}
                title={mortgage.title}
                bankName={mortgage.bank_name}
                riskClassification={mortgage.risk_classification}
                dueDate={mortgage.due_date}
                amount={mortgage.amount}
                interestRate={mortgage.interest_rate}
                updatedAt={mortgage.updated_at}
              />)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Mortgages
