import React from 'react';

class NewInvestmentField extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mortgage_id: props.mortgageId,
      amount: 0
    };
  }

  updateInvestment = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [ name ]: value
    });
  }

  render () {
    return (
      <tr>
        <td colSpan='9'>
          <form onSubmit={(e) => this.props.createNewInvestment(e, this.state)}>
            <p>Enter the amount of money to invest.</p>
            <fieldset>
              <input
                type='number'
                max={this.props.maxAmount}
                value={this.state.amount}
                name='amount'
                onChange={this.updateInvestment}
              />
              <button type='submit' className='btn btn-success'>Submit</button>
            </fieldset>
          </form>
        </td>
      </tr>
    );
  }
}

export default NewInvestmentField;
