import React from 'react';
import StringHelper from '../../../../helpers/StringHelper';

const mortgageField = props => (
  <tr>
    <td>{props.mortgageId}</td>
    <td>{props.title}</td>
    <td>{props.bankName}</td>
    <td>{props.riskClassification}</td>
    <td>{moment(props.dueDate, 'YYYY-M-D H:m').utcOffset(2).format('DD.MM.YYYY')}</td>
    <td>{StringHelper.toMoney(props.amount, '€', ',')}</td>
    <td>{StringHelper.toPercentage(props.interestRate, ',')}</td>
    <td>{moment(props.updatedAt, 'YYYY-M-D H:m').utcOffset(4).format('DD.MM.YYYY HH:mm')}</td>
    <td><a onClick={() => props.deleteCall(props.mortgageId)} className='btn btn-danger'>Delete</a></td>
  </tr>
);

export default mortgageField
