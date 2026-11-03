
const transactions = [];

const form = document.getElementById("transaction-form");
const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expensesDisplay = document.getElementById("expenses");
const transactionList = document.getElementById("transaction-list");

function updateDashboard() {
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    const balance = income - expenses;

    balanceDisplay.textContent = `KSh ${balance.toFixed(2)}`;
    incomeDisplay.textContent = `KSh ${income.toFixed(2)}`;
    expensesDisplay.textContent = `KSh ${expenses.toFixed(2)}`;
}

function displayTransactions() {
    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        transactionList.innerHTML = "<li>No transactions yet.</li>";
        return;
    }

    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");

        li.textContent =
            `${transaction.description} - ` +
            `${transaction.category} - ` +
            `${transaction.type} - ` +
            `KSh ${transaction.amount.toFixed(2)}`;

        transactionList.appendChild(li);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    const category =
        document.getElementById("category").value;

    if (!description || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    transactions.push({
        description,
        amount,
        type,
        category
    });

    updateDashboard();
    displayTransactions();

    form.reset();
});

updateDashboard();
displayTransactions();
