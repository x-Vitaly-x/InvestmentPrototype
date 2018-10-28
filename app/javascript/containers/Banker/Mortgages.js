import React from 'react'
import MortgageForm from '../../components/Banker/Mortgages/MortgageForm/MortgageForm'
import MortgageField from '../../components/Banker/Mortgages/MortgageField/MortgageField'
import MortgageMenu from '../../components/Banker/Mortgages/MortgageMenu/MortgageMenu';

import { Modal } from 'bootstrap.native/dist/bootstrap-native-v4';
import axios from '../../helpers/Axios';

class Mortgages extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mortgages: []
    };
  }

  componentDidMount () {
    this.myModalInstance = new Modal(document.querySelector('#mortgage_form'), {});
    this.fetchMortgages();
  }

  fetchMortgages () {
    axios.get('/api/v1/mortgages')
      .then(response => {
        this.setState({ mortgages: response.data })
      })
      .catch(error => console.log(error));
  }

  addMortgage (mortgage) {
    return axios.post('/api/v1/mortgages', mortgage)
      .then(response => {
        let mortgages = this.state.mortgages;
        mortgages.push(response.data);
        this.setState({ mortgages });
        this.myModalInstance.hide();
      });
  }

  deleteMortgage (mortgageId) {
    if (confirm('Are you sure you want to delete this mortgage?')) {
      return axios.delete('/api/v1/mortgages/' + mortgageId).then(() => {
        let mortgages = this.state.mortgages.filter(mortgage => {
          return mortgage.id !== mortgageId
        });
        this.setState({ mortgages });
      });
    }
  }

  openMortgageFormHandler = () => {
    this.myModalInstance.show();
  };

  render () {
    return (
      <div>
        <MortgageMenu openMortgageFormCallback={this.openMortgageFormHandler}/>
        <MortgageForm successCallback={this.addMortgage.bind(this)}/>
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
                deleteCall={this.deleteMortgage.bind(this)}
              />)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Mortgages
