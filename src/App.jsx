import React, { Fragment, useState, useEffect } from 'react';

import Welcome from './components/Welcome';
import ExpenseForm from './components/ExpenseForm';
import ExpensesBoard from './components/ExpensesBoard';
import BudgetBoard from './components/BudgetBoard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './resources/sass/app.sass';

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
  }, [
    expenseList,
    initialExpenseList,
    remainingBudget,
    initialRemainingBudget,
  ]);

  // USEEFFECT TO CALCULATE THE REMAINING BUDGET

  useEffect(() => {
    if (showExpenseList) {
      // ADDING EXPENSE TO THE LIST

      setExpenseList([...expenseList, expense]);

      // SUBSTRACTING EXENSE FROM BUDGET

      setRemainingBudget(remainingBudget - expense.amount);

      // HIDDING EXPENSELIST

      setShowExpenseList(false);
    }
  }, [expense, showExpenseList, expenseList, remainingBudget]);

  // DELETE EXPENSE FROM EXPENSELIST

  const deleteExpense = (id) => {
    console.log(id);
    setExpenseList(expenseList.filter((expense) => expense.id !== id));

    // ADDING AMOUNT FROM EXPENSE DELETED TO REMAININGBUDGET

    let expenseDeleted = expenseList.find((expense) => expense.id === id);
    let newRemainingBudget = remainingBudget + expenseDeleted.amount;
    setRemainingBudget(newRemainingBudget);
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
            <div className='calculator-section col-12 col-lg-11 d-flex justify-content-between'>
              <div className='col-6 col-md-5'>
                <ExpenseForm
                  setExpense={setExpense}
                  setShowExpenseList={setShowExpenseList}
                />
              </div>
              <div className='col-6 d-flex flex-column'>
                <ExpensesBoard
                  expenseList={expenseList}
                  deleteExpense={deleteExpense}
                />
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
