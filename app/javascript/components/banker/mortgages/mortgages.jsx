import React from 'react'
import MortgageForm from './mortgage/mortgage_form'
import MortgageField from './mortgage/mortgage_field'
import axios from 'axios'
import { Modal } from 'bootstrap.native/dist/bootstrap-native-v4'

class Mortgages extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mortgages: []
    };
  }

  componentDidMount () {
    this.fetchMortgages();
    this.myModalInstance = new Modal(document.querySelector('#mortgage_form'), {});
  }

  openMortgageForm (e) {
    e.preventDefault();
    this.myModalInstance.show();
  }

  fetchMortgages () {
    axios.get('/api/v1/mortgages')
      .then(response => {
        this.setState({ mortgages: response.data })
      })
      .catch(error => console.log(error));
  }

  addMortgage (mortgage) {
    return axios.post('/api/v1/mortgages', mortgage, {
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content
      }
    }).then(response => {
      let mortgages = this.state.mortgages;
      mortgages.push(response.data);
      this.setState({ mortgages });
      this.myModalInstance.hide();
    });
  }

  deleteMortgage (mortgageId) {
    return axios.delete('/api/v1/mortgages/' + mortgageId, {
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content
      }
    }).then(() => {
      let mortgages = this.state.mortgages.filter(mortgage => {
        return mortgage.id !== mortgageId
      });
      this.setState({ mortgages });
    });
  }

  changeCheckbox () {

  }

  getDisabledStatus () {

  }

  getChecked () {

  }

  uploadCSV () {

  }

  render () {
    return (
      <div>
        <div className='menu mb-4'>
          <form onSubmit={this.uploadCSV}>
            <button className='btn btn-primary' onClick={e => this.openMortgageForm(e)}>New</button>
            <input type="file" onChange={this.onChange} accept='text/csv'/>
            <label className='mr-3'>Delete old entries?</label>
            <input
              type='checkbox' className='mr-4'
              checked={this.getChecked()}
              onChange={() => this.changeCheckbox()}/>
            <button
              type="submit" className='btn btn-info'
              disabled={this.getDisabledStatus()}>
              Upload CSV
            </button>
          </form>
        </div>
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
