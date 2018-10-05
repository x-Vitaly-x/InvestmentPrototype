import React from 'react'

class MortgageField extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <tr>
        <td>{this.props.mortgageId}</td>
        <td>{this.props.title}</td>
        <td>{this.props.bankName}</td>
        <td>{this.props.riskClassification}</td>
        <td>{moment(this.props.dueDate, 'YYYY-M-D H:m zz').format('MM.DD.YYYY HH:mm')}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.interestRate}</td>
        <td>{moment(this.props.updatedAt, 'YYYY-M-D H:m zz').format('MM.DD.YYYY HH:mm')}</td>
        <td><a onClick={() => this.props.deleteCall(this.props.mortgageId)} className='btn btn-danger'>Delete</a></td>
      </tr>
    )
  }
}

export default MortgageField
