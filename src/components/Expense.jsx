import React, { Fragment } from 'react';

const Expense = ({ expense, deleteExpense }) => {
  
  const { name, amount, id } = expense;
  
  return (
    <Fragment>
      <div id={id} className='d-flex col-12 expense-container p-0'>
        <div className='d-flex mb-3 expense-delete '>
          <i className='far fa-trash-alt' onClick={()=>deleteExpense(id)}></i>
        </div>

        <div className='d-flex mb-3 expense'>
          <div className='expense-concept'>{name}</div>
          <div className='expense-amount col-3 text-center p-0'>{amount}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Expense;
