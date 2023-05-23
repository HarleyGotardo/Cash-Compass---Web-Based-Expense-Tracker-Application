let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const totalBalance = document.getElementById('total-balance');
const addIncomeBtn = document.getElementById('add-income-btn');
const incomeInput = document.getElementById('income-input');
const customCategoryInput = document.getElementById('custom-category-input');
const addCategoryBtn = document.getElementById('add-category-btn');

function saveTotalBalanceToLocalStorage() {
  localStorage.setItem('totalBalance', totalBalance.textContent);
}

function saveExpensesToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpenseToTable(expense) {
  const newRow = expensesTableBody.insertRow();
  const categoryCell = newRow.insertCell();
  const amountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', function () {
    expenses.splice(expenses.indexOf(expense), 1);
    totalAmount -= expense.amount;
    totalAmountCell.textContent = totalAmount;
    totalBalance.textContent = (parseFloat(totalBalance.textContent) + expense.amount).toFixed(2);
    expensesTableBody.removeChild(newRow);
    saveExpensesToLocalStorage();
    saveTotalBalanceToLocalStorage();
  });
  

  categoryCell.textContent = expense.category;
  amountCell.textContent = expense.amount;
  dateCell.textContent = expense.date;
  deleteCell.appendChild(deleteBtn);
}

addBtn.addEventListener('click', function () {
  const category = categorySelect.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (category === '') {
    alert('Please select a category');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }
  if (date === '') {
    alert('Please select a date');
    return;
  }

  const currentBalance = parseFloat(totalBalance.textContent);

  if (amount > currentBalance) {
    alert('Expense amount is greater than the total balance');
    return;
  }

  const expense = {
    category,
    amount,
    date,
  };
  expenses.push(expense);

  totalAmount += amount;
  totalAmountCell.textContent = totalAmount;

  totalBalance.textContent = (currentBalance - amount).toFixed(2);

  addExpenseToTable(expense);
  totalBalance.textContent = (currentBalance - amount).toFixed(2);

  saveTotalBalanceToLocalStorage();
  saveExpensesToLocalStorage();
});


function loadExpensesFromLocalStorage()
{
    const expensesJSON = localStorage.getItem('expenses');
    if (expensesJSON)
    {
        expenses = JSON.parse(expensesJSON);
        expenses.forEach(expense =>
        {
            addExpenseToTable(expense); // Call the function to add the expense to the table
            totalAmount += expense.amount;
        });
        totalAmountCell.textContent = totalAmount.toFixed(2); // Update totalAmount to display with 2 decimal places
    }
    const totalBalanceJSON = localStorage.getItem('totalBalance');
    if (totalBalanceJSON)
    {
        totalBalance.textContent = totalBalanceJSON;
    }
}

function addIncome()
{
    const incomeAmount = Number(incomeInput.value);

    if (incomeAmount == 0)
    {
        alert('Please enter a valid income amount');
        return;
    }

    const currentBalance = parseFloat(totalBalance.textContent);
    const newBalance = currentBalance + incomeAmount;
    totalBalance.textContent = newBalance.toFixed(2);
    incomeInput.value = ''; // Reset the income input field

    saveTotalBalanceToLocalStorage(); // Save the total balance to local storage
}

addIncomeBtn.addEventListener('click', addIncome);


addIncomeBtn.addEventListener('click', function()
{
    const incomeAmount = Number(incomeInput.value);

    // Updated condition to show the alert only when incomeAmount is 0 or less
    // if (incomeAmount == 0) {
    //   alert('Please enter a valid income amount');
    //   return;
    // }

    totalAmount += incomeAmount;
    totalAmountCell.textContent = totalAmount.toFixed(2);

    incomeInput.value = ''; // Reset the income input field
});

loadExpensesFromLocalStorage();


const reflectInput = document.getElementById('reflect-input');
const reflectBtn = document.getElementById('reflect-btn');

reflectBtn.addEventListener('click', function()
{
    const reflectAmount = Number(reflectInput.value);

    if (isNaN(reflectAmount) || reflectAmount < 0)
    {
        alert('Please enter a valid amount');
        return;
    }

    const currentBalance = parseFloat(totalBalance.textContent);
    totalBalance.textContent = reflectAmount.toFixed(2);
    reflectInput.value = '';
});

addCategoryBtn.addEventListener('click', function() {
    const customCategory = customCategoryInput.value.trim();
    if (customCategory !== '') {
        // Create a new option element and add it to the category select dropdown menu
        const newOption = document.createElement('option');
        newOption.value = customCategory;
        newOption.textContent = customCategory;
        categorySelect.appendChild(newOption);
        // Reset the custom category input field
        customCategoryInput.value = '';
    }
});