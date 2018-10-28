import React from 'react';
import axios from '../../helpers/Axios';
import MortgageField from '../../components/Investor/Mortgages/MortgageField/MortgageField';
import NewInvestmentField from '../../components/Investor/Mortgages/NewInvestmentField/NewInvestmentField';

class Mortgages extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mortgages: [],
      investment: null
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

  newInvestmentHandler = (mortgageId) => {
    let newInvestment = {
      mortgageId
    };
    this.setState({ investment: newInvestment });
  };

  createNewInvestmentHandler = (event, newInvestment) => {
    event.preventDefault();
    return axios.post('/api/v1/investments', newInvestment)
      .then(response => {
        this.setState({ investment: null });
      });
  };

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
              return [
                <MortgageField
                  key={mortgage.id}
                  mortgageId={mortgage.id}
                  title={mortgage.title}
                  bankName={mortgage.bank_name}
                  riskClassification={mortgage.risk_classification}
                  dueDate={mortgage.due_date}
                  amount={mortgage.amount}
                  interestRate={mortgage.interest_rate}
                  updatedAt={mortgage.updated_at}
                  investCallback={this.newInvestmentHandler}
                />,
                this.state.investment && mortgage.id == this.state.investment.mortgageId ?
                  <NewInvestmentField
                    key='new_investment'
                    maxAmount={mortgage.amount}
                    mortgageId={mortgage.id}
                    createNewInvestment={this.createNewInvestmentHandler}/> : null
              ]
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Mortgages
