import React from 'react'

import '../resources/sass/remainingBoard.sass';

import {fillBudgetAlert} from '../resources/js/helpers'

const BudgetBoard = ({budget, remainingBudget}) => {

  return(
    <div className='remainig-board'>
    <p className='budget'>
    Presupuesto: &nbsp;<span>{budget}</span>
    </p>
    <p className={fillBudgetAlert(budget, remainingBudget)}>
    Restante: &nbsp;<span>{remainingBudget}</span>
    </p>
  </div>
  )

}

export default BudgetBoard