import React, { Fragment } from 'react';

import Expense from './Expense';

import '../resources/sass/remainingBoard.sass';

const RemainingBoard = ({
  expenseList,
  deleteExpense,
}) => {


  return (
    <Fragment>
      <div className='expense-list'>
        {expenseList.map((expense) => (
          <Expense
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default RemainingBoard;
