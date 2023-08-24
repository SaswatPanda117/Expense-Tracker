const balance = document.getElementById('balance'),
    money_plus = document.getElementById('money-plus'),
    money_minus = document.getElementById('money-minus'),
    list = document.getElementById('list'),
    form = document.getElementById('form'),
    text = document.getElementById('Text'),
    amount = document.getElementById('Amount');

// const dummyTransactions = [
//     {
//         id: 1,
//         text: "Flower",
//         amount: -20
//     },
//     {
//         id: 2,
//         text: "Salary",
//         amount: 300
//     },
//     {
//         id: 3,
//         text: "Book",
//         amount: -10
//     },
//     {
//         id: 4,
//         text: "Camera",
//         amount: 150
//     },
// ];

// let transactions = dummyTransactions;
// let transactions = [];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


//Add Transactions
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('please add text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}


//Generate id
function generateID() {
    return Math.floor(Math.random() * 1000000000);
}


//function to get data
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    //to add a class to assign values based on this the color will change as red or green
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );

    //to generate list item
    item.innerHTML = `
        ${transaction.text}
        <span>
        ${sign}${Math.abs(transaction.amount)}
        </span>
        <button 
            class="delete-btn" 
            onClick="removeTransaction(${transaction.id})">
            x
        </button>
    `;  //takes the id of a transaction and delete that particular one

    list.appendChild(item);
}

//Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}


//Update Values
function updateValues() {
    const amounts = transactions.map
        (transaction => transaction.amount);
    const total = amounts.reduce
        ((acc, item) => (acc += item), 0).toFixed(2); // reduce the numbers to after 2 decimal i.e. 0.00

    const income = amounts.filter
        ((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter
        ((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1 // to show the same value with - sign
    ).toFixed(2);

    //now we have to add them in a variable to use them
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}


//Update Local Storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}



//Init App
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

// addTransactionDOM(transactions);
Init();

form.addEventListener("submit", addTransaction);









{/* <h2>Expense Tracker</h2>
<div class="container">
  <h4>Your Balance</h4>
  <h1 id="balance">$0.00</h1>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money-plus">
        +$0.00
      </p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money-minus">
        -$0.00
      </p>
    </div>
  </div>

  <h3>History</h3>
  <ul id="list" class="list"></ul>

  <h3>Add New Transition</h3>
  <form id="form">
      <div class="form-control">
          <label for="text">Text</label>
          <input type="text" id="text" placeholder="Enter Text...."/>
      </div>
      <div class="form-control">
          <label for="amount">Amount <br> (negative - expense ,positive - income )</label>
          <input type="number" id="amount" placeholder="Enter amount..."> 
      </div>
      <button class="btn">All transaction</button>
  </form>
</div> */}