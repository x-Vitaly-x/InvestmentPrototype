import React from 'react'
import StringHelper from '../../../../helpers/string_helper'

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
        <td>{moment(this.props.dueDate, 'YYYY-M-D H:m').utcOffset(2).format('DD.MM.YYYY')}</td>
        <td>{StringHelper.toMoney(this.props.amount, '€', ',')}</td>
        <td>{StringHelper.toPercentage(this.props.interestRate, ',')}</td>
        <td>{moment(this.props.updatedAt, 'YYYY-M-D H:m').utcOffset(4).format('DD.MM.YYYY HH:mm')}</td>
        <td></td>
      </tr>
    )
  }
}

export default MortgageField
