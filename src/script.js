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
const deleteBtn = document.createElement('button');

addIncomeBtn.addEventListener('click', function()
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
    incomeInput.value = ''; 
});
  
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
  
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;
  
    totalBalance.textContent = (currentBalance - amount).toFixed(2);
});