import React, { Fragment, useState } from 'react';
import shortid from 'shortid';

import Error from './Error';

import '../resources/sass/expenseForm.sass';

const ExpenseForm = ({setExpense, setShowExpenseList}) => {


  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [error, setError] = useState(false)

  const saveExpense = (event) => {

    // VALIDATING FORM

    event.preventDefault()
    if ( expenseAmount <= 0 || isNaN(expenseAmount) || expenseName === ''){
      setError(true)
      return
    }
    setError(false)


  // CREATING NEW EXPENSE

    const expense = {
      name: expenseName,
      amount: expenseAmount,
      id: shortid.generate()
    }

    // SENDING TO EXPENSELIST

    setExpense(expense)
    setShowExpenseList(true)

    // RESETING FORM

    setExpenseName('')
    setExpenseAmount('')
  }

  return (
    <Fragment>
      <h3>Agrega tus gastos</h3>
      {error ? <Error errorMessage='Todos los campos son necesarios' /> : null}
      <form
        className='form-expense-add d-flex flex-column'
        onSubmit={saveExpense}
      >
        <div className='d-flex flex-column'>
          <label htmlFor=''>Nombre del gasto</label>
          <input
            name='name'
            type='text'
            placeholder='Ej. comida'
            onChange={event => setExpenseName(event.target.value)}
            value={expenseName}
          />
        </div>
        <div className='d-flex flex-column'>
          <label htmlFor=''>Cantidad</label>
          <input
            name='amount'
            type='number'
            placeholder='0'
            onChange={event => setExpenseAmount(parseInt(event.target.value))}
            value={expenseAmount}
          />
        </div>
        <button
          type='submit'
          className='btn-success col-12 col-md-6 col-lg-5 mx-auto'
        >
          Agregar gasto
        </button>
      </form>
    </Fragment>
  );
};

export default ExpenseForm;
