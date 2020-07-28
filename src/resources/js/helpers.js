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
