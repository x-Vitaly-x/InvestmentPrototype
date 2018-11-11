import React from 'react';
import moment from 'moment';
import StringHelper from '../../../../helpers/StringHelper';

const investmentField = props => (
  <tr>
    <td>{props.investment.id}</td>
    <td>{props.investment.mortgage.title}</td>
    <td>{props.investment.mortgage.bank_name}</td>
    <td>{StringHelper.toMoney(props.investment.amount, '€', ',')}</td>
    <td>{StringHelper.toPercentage(props.investment.mortgage.interest_rate, ',')}</td>
    <td>{props.investment.mortgage.risk_classification}</td>
    <td>{moment(props.investment.mortgage.due_date, 'YYYY-M-D H:m').utcOffset(2).format('DD.MM.YYYY')}</td>
  </tr>
);

export default investmentField;
