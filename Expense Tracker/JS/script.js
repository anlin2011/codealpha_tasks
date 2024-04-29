let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expenses-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
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
    const expense = { category, amount, date };
    expenses.push(expense);

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    displayExpense(expense);
});

function displayExpense(expense) {
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const editCell = newRow.insertCell(); // Added edit cell
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button'); // Created edit button

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        const index = expenses.indexOf(expense);
        if (index > -1) {
            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;
            expenses.splice(index, 1);
            expensesTableBody.removeChild(newRow);
        }
    });

    editBtn.textContent = 'Edit'; // Set text content for edit button
    editBtn.classList.add('edit-btn'); // Add class for styling
    editBtn.addEventListener('click', function() {
        const newCategory = prompt('Enter the new category:', expense.category);
        const newAmount = prompt('Enter the new amount:', expense.amount);
        const newDate = prompt('Enter the new date:', expense.date);

        if (newCategory !== null && newAmount !== null && newDate !== null) {
            // Update expense object
            const prevAmount = expense.amount;
            expense.category = newCategory;
            expense.amount = Number(newAmount);
            expense.date = newDate;

            // Update table cell values
            categoryCell.textContent = newCategory;
            amountCell.textContent = newAmount;
            dateCell.textContent = newDate;

            // Update total amount
            totalAmount += (Number(newAmount) - prevAmount);
            totalAmountCell.textContent = totalAmount;
        }
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
    editCell.appendChild(editBtn); // Append edit button to edit cell
}

// Populate existing expenses on page load
for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    displayExpense(expense);
}
