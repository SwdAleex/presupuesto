import React, { useState } from 'react';

import Error from './Error';


const Welcome = ({setBudget, setRemainingBudget, setShowWelcome}) => {
  const [budgetInput, setBudgetInput] = useState(0);
  const [error, setError] = useState(false);

  // GETTING BUDGET FROM INPUT

  const gettingBudget = (event) => setBudgetInput(parseInt(event.target.value, 10));

  // SAVING BUDGET

  const savingBudget = (event) => {
    event.preventDefault();
    if (budgetInput <= 0 || isNaN(budgetInput)) {
      setError(true);
      return;
    }
    setError(false);
    setBudget(budgetInput)
    setRemainingBudget(budgetInput)
    setShowWelcome(false)
    localStorage.setItem('initialBudget',budgetInput)
  };

  return (
    <section className='row justify-content-center'>
      <div className='welcome-section col-11 col-lg-9 d-flex flex-column justify-content-center'>
        <h3 className='mb-0 pb-0'>¿Cuál es tu presupuesto para ésta semana?</h3>
        <form
          className='form-container d-flex flex-column mt-2'
          onSubmit={savingBudget}
        >
          {error ? (
            <Error errorMessage='Está muy grave la crisis pero introduce una cantidad correcta' />
          ) : null}
          <input
            type='number'
            placeholder='Coloca una cantidad'
            onChange={gettingBudget}
          />
          <button
            type='submit'
            className='btn-success col-12 col-sm-5 col-md-4 col-lg-3 mx-auto'
          >
            Crear presupuesto
          </button>
        </form>
      </div>
    </section>
  );
};

export default Welcome;
