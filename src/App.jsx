import React, { Fragment, useState, useEffect } from 'react';

import Welcome from './components/Welcome';
import ExpenseForm from './components/ExpenseForm';
import ExpensesBoard from './components/ExpensesBoard';
import BudgetBoard from './components/BudgetBoard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './resources/sass/app.sass';
import { showCloseButton } from '../src/resources/js/helpers';

function App() {
  // GETTING EXPENSELIST FROM LOCAL STORAGE
  let initialExpenseList = JSON.parse(
    localStorage.getItem('initialExpenseList')
  );
  let initialRemainingBudget = parseInt(
    localStorage.getItem('initialRemainingBudget')
  );
  let initialBudget = localStorage.getItem('initialBudget');

  if (!initialRemainingBudget) {
    initialRemainingBudget = 0;
  } /* else {
    initialRemainingBudget=parseInt(initialRemainingBudget)
  } */

  if (!initialExpenseList) {
    initialExpenseList = [];
  }

  // SETTING STAGES

  const [expenseList, setExpenseList] = useState(initialExpenseList);
  const [remainingBudget, setRemainingBudget] = useState(
    initialRemainingBudget
  );
  const [budget, setBudget] = useState(initialBudget);
  const [showWelcome, setShowWelcome] = useState(true);
  const [expense, setExpense] = useState({});
  const [showExpenseList, setShowExpenseList] = useState(false);

  // USEEFFECT TO VERIFY EXPENSELIST AND BUDGET IN LOCAL STORAGE

  useEffect(() => {
    if (initialRemainingBudget > 0) {
      setShowWelcome(false);
    }
    localStorage.setItem('initialExpenseList', JSON.stringify(expenseList));
    localStorage.setItem(
      'initialRemainingBudget',
      JSON.stringify(remainingBudget)
    );

    // USEEFFECT TO CALCULATE THE REMAINING BUDGET

    if (showExpenseList) {
      // ADDING EXPENSE TO THE LIST

      setExpenseList([...expenseList, expense]);

      // SUBSTRACTING EXENSE FROM BUDGET

      setRemainingBudget(remainingBudget - expense.amount);

      // HIDDING EXPENSELIST

      setShowExpenseList(false);
    }

    if (expenseList.length === 0 && remainingBudget === 0) {
      setShowWelcome(true);
    }
  }, [
    expenseList,
    initialExpenseList,
    remainingBudget,
    initialRemainingBudget,
    expense,
    showExpenseList,
  ]);

  // DELETE EXPENSE FROM EXPENSELIST

  const deleteExpense = (id) => {
    setExpenseList(expenseList.filter((expense) => expense.id !== id));

    // ADDING AMOUNT FROM EXPENSE DELETED TO REMAININGBUDGET

    let expenseDeleted = expenseList.find((expense) => expense.id === id);
    let newRemainingBudget = remainingBudget + expenseDeleted.amount;
    setRemainingBudget(newRemainingBudget);
  };

  const clearList = () => {
    setRemainingBudget(0);
    setBudget(0);
    setExpenseList([]);
  };

  return (
    <Fragment>
      <header>
        <h1>Control de Gastos</h1>
      </header>
      <div className='container'>
        {showWelcome ? (
          <Welcome
            setBudget={setBudget}
            setRemainingBudget={setRemainingBudget}
            setShowWelcome={setShowWelcome}
          />
        ) : (
          <section className='row justify-content-center'>
            <div className='calculator-section col-12 col-lg-11 d-flex flex-wrap justify-content-between'>
              <div className='col-12 col-md-5'>
                <ExpenseForm
                  setExpense={setExpense}
                  setShowExpenseList={setShowExpenseList}
                />
              </div>
              <div className='col-12 col-md-6 d-flex flex-column'>
                <h3>
                  {expenseList.length > 0
                    ? 'Lista de gastos'
                    : 'No hay ningún gasto en la lista'}
                  <span>
                    <i
                      className={showCloseButton(expenseList)}
                      alt='Borrar Lista'
                      onClick={clearList}
                    ></i>
                  </span>
                </h3>

                {expenseList.length !== 0 ? (
                  <ExpensesBoard
                    expenseList={expenseList}
                    deleteExpense={deleteExpense}
                  />
                ) : null}
                <BudgetBoard
                  budget={budget}
                  remainingBudget={remainingBudget}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </Fragment>
  );
}

export default App;
