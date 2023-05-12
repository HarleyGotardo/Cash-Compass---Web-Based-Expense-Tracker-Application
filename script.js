//global vars
let expenses = [];
let totalAmount = 0;

//ids from html
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

function addIncome() //add income function
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
}

addIncomeBtn.addEventListener('click', addIncome);


addIncomeBtn.addEventListener('click', function() //implementation of addincome eventlistener
{
    const incomeAmount = Number(incomeInput.value);

    totalAmount += incomeAmount;
    totalAmountCell.textContent = totalAmount.toFixed(2);

    incomeInput.value = ''; // Reset the income input field
});