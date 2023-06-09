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

function saveTotalBalanceToLocalStorage()
{
	localStorage.setItem('totalBalance', totalBalance.textContent);
}

function saveExpensesToLocalStorage()
{
	localStorage.setItem('expenses', JSON.stringify(expenses));
}

function saveCustomCategoryToLocalStorage()
{
	const customCategories = Array.from(categorySelect.options)
		.map(option => option.value)
		.filter(option => option !== '');

	localStorage.setItem('customCategories', JSON.stringify(customCategories));
}

function addExpenseToTable(expense)
{
	const newRow = expensesTableBody.insertRow();
	const categoryCell = newRow.insertCell();
	const amountCell = newRow.insertCell();
	const dateCell = newRow.insertCell();
	const deleteCell = newRow.insertCell();

	const deleteBtn = document.createElement('button');
	deleteBtn.textContent = 'Delete';
	deleteBtn.classList.add('delete-btn');
	deleteBtn.addEventListener('click', function()
	{
		var confirmation = confirm("Do you want to refund it to your total balance?");
		if(confirmation) {			
			totalAmount -= expense.amount;
			totalAmountCell.textContent = totalAmount;
			totalBalance.textContent = (parseFloat(totalBalance.textContent) + expense.amount).toFixed(2);
			expensesTableBody.removeChild(newRow);
			saveExpensesToLocalStorage();
			saveTotalBalanceToLocalStorage();
		} else if(!confirmation) {
			expenses.splice(expenses.indexOf(expense), 1);
			expensesTableBody.removeChild(newRow);
			saveExpensesToLocalStorage();
		}
	});


	categoryCell.textContent = expense.category;
	amountCell.textContent = expense.amount;
	dateCell.textContent = expense.date;
	deleteCell.appendChild(deleteBtn);
}

addBtn.addEventListener('click', function()
{
	const category = categorySelect.value;
	const amount = Number(amountInput.value);
	const date = dateInput.value;

	if (category === '')
	{
		alert('Please select a category');
		return;
	}
	if (isNaN(amount) || amount <= 0)
	{
		alert('Please enter a valid amount');
		return;
	}
	if (date === '')
	{
		alert('Please select a date');
		return;
	}

	const currentBalance = parseFloat(totalBalance.textContent);

	if (amount > currentBalance)
	{
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
	const currentBalance2 = parseFloat(totalBalance.textContent);

	if (isNaN(reflectAmount) || reflectAmount < 0 || reflectAmount >= currentBalance2)
	{
		alert('Please enter a valid amount. Must also be less than the total balance.');
		return;
	}

	const currentBalance = parseFloat(totalBalance.textContent);
	totalBalance.textContent = reflectAmount.toFixed(2);   
	reflectInput.value = '';
	saveTotalBalanceToLocalStorage();
});

addCategoryBtn.addEventListener('click', function()
{
	const customCategory = customCategoryInput.value.trim();
	if (customCategory !== '')
	{
		const newOption = document.createElement('option');
		newOption.value = customCategory;
		newOption.textContent = customCategory;
		categorySelect.appendChild(newOption);
		customCategoryInput.value = '';

		saveCustomCategoryToLocalStorage();
	}
});

function loadCustomCategoriesFromLocalStorage()
{
	const customCategoriesJSON = localStorage.getItem('customCategories');
	if (customCategoriesJSON)
	{
		const customCategories = JSON.parse(customCategoriesJSON);
		customCategories.forEach(category =>
		{
			const newOption = document.createElement('option');
			newOption.value = category;
			newOption.textContent = category;
			categorySelect.appendChild(newOption);
		});
	}
}

loadCustomCategoriesFromLocalStorage();

function sortExpenses()
{
	expenses.sort((a, b) => b.amount - a.amount);
	clearExpensesTable();
	expenses.forEach(addExpenseToTable);
	saveExpensesToLocalStorage();
}

const sortButton = document.getElementById('sort-button');
sortButton.addEventListener('click', sortExpenses);

function clearExpensesTable()
{
	while (expensesTableBody.firstChild)
	{
		expensesTableBody.removeChild(expensesTableBody.firstChild);
	}
}

// Function to download data as a JSON file
// for download data
const downloadDataButton = document.getElementById('download-btn');

function downloadData() {
	const data = {
	  expenses: expenses,
	  totalBalance: totalBalance.textContent,
	  customCategories: Array.from(categorySelect.options)
		.map(option => option.value)
		.filter(option => option !== '')
	};
	const dataJSON = JSON.stringify(data);
	const blob = new Blob([dataJSON], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'cash_compass_data.json';
	a.click();
	URL.revokeObjectURL(url);
}

downloadDataButton.addEventListener('click', downloadData);
  
// Function to handle the file selection and reading
// for importing data
const importButton = document.getElementById('import');

function importData(event) {
	const file = event.target.files[0];
	const reader = new FileReader();
  
	reader.onload = function (e) {
	  const contents = e.target.result;
	  const data = JSON.parse(contents);
	  expenses = data.expenses || [];
	  totalBalance.textContent = data.totalBalance || '0';
	  const customCategories = data.customCategories || [];
	  categorySelect.innerHTML = '';
	  for (const category of customCategories) {
		const newOption = document.createElement('option');
		newOption.value = category;
		newOption.textContent = category;
		categorySelect.appendChild(newOption);
	  }
  
	  expensesTableBody.innerHTML = '';
	  totalAmount = 0;
	  for (const expense of expenses) {
		addExpenseToTable(expense);
		totalAmount += expense.amount;
	  }
	  totalAmountCell.textContent = totalAmount.toFixed(2);
  
	  saveTotalBalanceToLocalStorage();
	  saveExpensesToLocalStorage();
	  saveCustomCategoryToLocalStorage();
	};
  
	reader.readAsText(file);
  }

  importButton.addEventListener('change', importData);