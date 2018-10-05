import React from 'react'
import Select from 'react-select';

class MortgageForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      risk_classification_option: null,
      risk_classification: '',
      due_date: '',
      amount: '',
      interest_rate: '',
      errors: []
    };
    this.updateMortgage = this.updateMortgage.bind(this);
    this.updateMortgageSelect = this.updateMortgageSelect.bind(this);
  }

  sendData () {
    this.props.successCallback(this.state).catch(error => {
      this.displayErrors(error.response.data.errors);
    });
  }

  updateMortgage (e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [ name ]: value
    });
  }

  updateMortgageSelect (risk_classification_option) {
    this.setState({
      risk_classification_option,
      risk_classification: risk_classification_option.value
    });
  }

  displayErrors (errors) {
    this.setState({ errors });
  }

  render () {
    return (
      <div className='modal fade' id='mortgage_form' tabIndex='-1' role='dialog' aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>New Mortgage</h4>
            </div>
            <div className='modal-body'>
              <div className='form-group'>
                <label>Title</label>
                <input
                  className='form-control'
                  name='title'
                  onChange={this.updateMortgage}
                  value={this.state.title}
                  type='text'/>
              </div>
              <div className='form-group'>
                <label>Risk Classification</label>
                <Select
                  name='risk_classification'
                  className='form-control'
                  value={this.state.risk_classification_option}
                  onChange={this.updateMortgageSelect}
                  options={
                    [
                      { value: 'A', label: 'A (low)' },
                      { value: 'B', label: 'B' },
                      { value: 'C', label: 'C (high)' }
                    ]
                  }
                />
              </div>
              <div className='form-group'>
                <label>Due Date</label>
                <input
                  name='due_date'
                  onChange={this.updateMortgage}
                  value={this.state.due_date}
                  className='form-control'
                  type='date'/>
              </div>
              <div className='form-group'>
                <label>Amount</label>
                <input
                  name='amount'
                  onChange={this.updateMortgage}
                  value={this.state.amount}
                  className='form-control'
                  type='number'/>
              </div>
              <div className='form-group'>
                <label>Interest Rate</label>
                <input
                  name='interest_rate'
                  onChange={this.updateMortgage}
                  value={this.state.interest_rate}
                  className='form-control'
                  type='number'/>
              </div>
              {this.state.errors.map((error, index) => {
                return (
                  <div key={index} className='alert alert-danger'>
                    {error}
                  </div>
                )
              })}
            </div>
            <div className='modal-footer'>
              <button className='btn btn-success' onClick={() => this.sendData()}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MortgageForm
