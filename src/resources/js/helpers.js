export const fillBudgetAlert = (budget, remainingBudget) => {
  let newClass;

  if (budget / 4 > remainingBudget) {
    newClass = 'budget danger';
  } else if (budget / 2 > remainingBudget) {
    newClass = 'budget warning';
  } else {
    newClass = 'budget healthy';
  }

  return newClass;
};

export const showCloseButton = (expenseList) => {
  let style

  if (expenseList.length === 0) {
    style =  'far fa-times-circle float-right close-btn d-none'
  } else {
    style =  'far fa-times-circle float-right close-btn'
  }
  
 return style
}