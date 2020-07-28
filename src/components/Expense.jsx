import React from 'react'


const Expense = ({expense}) => {

  const { name, amount, id } = expense

  return(
    <div id={id} className="d-flex mb-3 expense">
      <div className="expense-concept">{name}</div>
      <div className="expense-amount col-3 text-center p-0">{amount}</div>
    </div>
  )
}

export default Expense