// Function to create a new expense field with a delete button
function createExpenseField() {
  const newExpenseDiv = document.createElement('div');
  newExpenseDiv.classList.add('expense');

  // Input for the expense name
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Expense Name (e.g., Entertainment)';
  nameInput.required = true;

  // Input for the expense amount
  const amountInput = document.createElement('input');
  amountInput.type = 'number';
  amountInput.placeholder = 'Amount ($)';
  amountInput.required = true;

  // Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('deleteExpenseButton');

  // Add an event listener to remove the expense field with animation
  deleteButton.addEventListener('click', () => {
    newExpenseDiv.classList.add('fade-out'); // Add fade-out animation
    setTimeout(() => {
      newExpenseDiv.remove(); // Remove element after animation completes
    }, 300); // Match duration of CSS animation
  });

  // Append inputs and delete button to the new div
  newExpenseDiv.appendChild(nameInput);
  newExpenseDiv.appendChild(amountInput);
  newExpenseDiv.appendChild(deleteButton);

  return newExpenseDiv; // Return the new expense field
}

// Event listener for the "Add Expense" button
document.getElementById('addExpenseButton').addEventListener('click', () => {
  const expenseFields = document.getElementById('expenseFields'); // Parent container for expenses
  const newExpenseField = createExpenseField(); // Create a new expense field
  expenseFields.appendChild(newExpenseField); // Add the field to the DOM
});

// Event listener for the "Calculate" button
document.getElementById('calculateButton').addEventListener('click', () => {
  // Get weekly income
  const weeklyIncome = parseFloat(document.getElementById('weeklyIncome').value);

  // Get all expenses
  const expenseDivs = document.querySelectorAll('#expenseFields .expense');
  let totalExpenses = 0;
  const expenseDetails = []; // To store details of each expense

  expenseDivs.forEach(expenseDiv => {
    const name = expenseDiv.children[0].value || 'Unnamed Expense'; // Expense name
    const amount = parseFloat(expenseDiv.children[1].value || 0); // Expense amount

    totalExpenses += amount;

    // Store expense details
    expenseDetails.push({ name, amount });
  });

  // Calculate yearly income and expenses
  const yearlyIncome = weeklyIncome * 52;
  const yearlyExpenses = totalExpenses * 12;

  // Calculate savings
  const monthlyIncome = yearlyIncome / 12;
  const monthlySavings = monthlyIncome - totalExpenses;
  const yearlySavings = yearlyIncome - yearlyExpenses;

  // Display results
  document.getElementById('yearlyIncome').textContent = `Yearly Income: $${yearlyIncome.toFixed(2)}`;
  document.getElementById('monthlyExpenses').textContent = `Monthly Expenses: $${totalExpenses.toFixed(2)}`;
  document.getElementById('savingsGoal').textContent = `Savings Goal: $${yearlySavings.toFixed(2)} per year, $${monthlySavings.toFixed(2)} per month`;

  // Optionally log expense details for debugging
  console.log('Expense Details:', expenseDetails);
});
