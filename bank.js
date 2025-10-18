const body = document.querySelector("body");
const registerContainer = document.querySelector("#register_container");
const loginContainer = document.getElementById("login_container");
const toggleRegister = document.getElementById("toggleRegister");
const toggleLogin = document.getElementById("toggleLogin");

function save() {
  localStorage.setItem("my_account", JSON.stringify(my_account));
}
const my_account = JSON.parse(localStorage.getItem("my_account")) || [];

const spinner = document.getElementById("loginSpinner");
sum = 0;
sum += balance;
function errorFunc(className, errorName) {
  className.classList.remove("hidden");
  className.innerHTML = errorName;
}
const username_label = document.getElementById("user_name");
const balanceLabel = document.getElementById("balance");

//User INterfae FUnction
function UserInterface(account) {
  username_label.innerHTML = account.username;
  calculateAccountBalance();
  save();

  if (!account.accountHistory) return;
  filteringAccountHistory("deposit");
  transaction();
}
console.log("now");
function calculateAccountBalance() {
  if (currentUser.accountHistory) {
    const balanceCalc = currentUser.accountHistory.reduce(
      (sum, value) => sum + value.amount,
      0
    );
    currentUser.accountBalance = balanceCalc;
    // currentUser.accountBalace = balanceCalc;
    balanceLabel.textContent = balanceCalc;
  } else {
    balanceLabel.textContent = 0;
  }
}
const errorLabel = document.getElementById("error");
function register() {
  const username = document.getElementById("username").value.trim();
  const register_password = document
    .getElementById("register_password")
    .value.trim();
  const phone_number = document.getElementById("phone_number").value.trim();
  const confirm_password = document
    .getElementById("confirm_password")
    .value.trim();
  const registerBut = document.getElementById("registerBut");

  const checkUserExist = my_account.some(
    (account) => account.phone_number === phone_number
  );
  if (!username || !phone_number || !register_password)
    return errorFunc(errorLabel, "All fields are required");
  if (register_password != confirm_password)
    return errorFunc(errorLabel, "Password do not match");
  if (checkUserExist) return errorFunc(errorLabel, "User already Exist");
  my_account.push({
    username,
    phone_number,
    register_password,
  });
  localStorage.setItem("my_account", JSON.stringify(my_account));
}

function toggler() {
  registerContainer.classList.toggle("hidden");
  loginContainer.classList.toggle("hidden");
}
function removeHiddenclass(className) {
  className.classList.remove("hidden");
}
function addHiddenClass(className) {
  className.classList.add("hidden");
}
const successMessage = document.getElementById("success");
const containerId = document.getElementById("container");
let currentUser;

//Login FUnction
function login() {
  const account_number = document.getElementById("account_number").value.trim();
  const login_password = document.getElementById("login_password").value.trim();
  if (!account_number || !login_password)
    return errorFunc(errorLabel, "all fields are required");
  currentUser = my_account.find(
    (account) => account.phone_number === account_number
  );
  if (currentUser?.register_password === login_password) {
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";
      removeHiddenclass(containerId);
      addHiddenClass(loginContainer);
    }, 3000);
  } else {
    errorFunc(errorLabel, "Invalid details");
  }
  UserInterface(currentUser);
}
console.log();

function deposit() {
  const depositAmounts = document.getElementById("depositAmount").value.trim();
  const depositAmount = Number(depositAmounts);
  if (!depositAmount) return errorFunc(errorLabel, "Field cannot be empty");
  if (depositAmount < 100)
    return errorFunc(errorLabel, "Depost starts from $100");

  if (!currentUser.accountHistory) {
    currentUser.accountHistory = [
      {
        amount: depositAmount,
        reciver: currentUser.username,
        date: new Date().toLocaleString(),
        type: "deposit",
        sender: currentUser.username,
      },
    ];
  } else {
    currentUser.accountHistory.unshift({
      amount: depositAmount,
      reciver: currentUser.username,
      date: new Date().toLocaleString(),
      type: "deposit",
      sender: currentUser.username,
    });
  }
  UserInterface(currentUser);
  localStorage.setItem("my_account", JSON.stringify(my_account));
}

const transfer = (account) => {
  const receiverAccount = document
    .getElementById("reciverAccountNumber")
    .value.trim();
  const transferAmounts = document
    .getElementById("transferAmount")
    .value.trim();
  const recivers = my_account.find(
    (reciver) => reciver.phone_number === receiverAccount
  );
  const transferAmount = Number(transferAmounts);
  if (!receiverAccount || !transferAmount)
    return errorFunc(errorLabel, "All fields are required");

  if (transferAmount > account.accountBalance)
    return errorFunc(errorLabel, "insufficient funds");
  if (!recivers) return errorFunc(errorLabel, "Account does not exist");
  account.accountHistory.unshift({
    amount: -transferAmount,
    reciver: recivers.username,
    date: new Date().toLocaleString(),
    type: "withdraw",
    sender: account.username,
  });
  recivers.accountHistory.unshift({
    amount: transferAmount,
    reciver: recivers.username,
    date: new Date().toLocaleString(),
    type: "deposit",
    sender: account.username,
  });
  UserInterface(currentUser);
};

const tBody = document.getElementById("transactions-body");
function transaction() {
  tBody.innerHTML = "";
  currentUser.accountHistory.forEach((userHistory, id) => {
    const colorDecor = userHistory.amount > 0 ? "deposit" : "withdraw";
    let date = userHistory.date;
    date = new Date(date);
    console.log(date);
    const year = date.getFullYear().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const html = `
    <tr>
      <td> ${userHistory.sender}</td>
      <td>${userHistory.reciver}</td>
      <td id="${colorDecor}">${userHistory.amount}</td>
      <td>${day}- ${+month + 1} - ${year} </td>
    </tr>
    `;
    tBody.insertAdjacentHTML("beforeend", html);
  });
}

//Filtering deposit and withdraw
function filteringAccountHistory(type) {
  tBody.innerHTML = "";
  const transactionType = currentUser.accountHistory.filter((transactions) => {
    return transactions.type === type;
  });

  transactionType.forEach((transaction) => {
    const html = `
    <tr>
      <td> ${transaction.sender}</td>
      <td>${transaction.reciver}</td>
      <td id="${transaction.type}">${transaction.amount}</td>
      <td>${transaction.date}</td>
    </tr>
    `;
    tBody.insertAdjacentHTML("beforeend", html);
  });
}
console.log(name);
function logout() {
  const index = my_account.slice(currentUser, 1);
}
// localStorage.removeItem("my_account");
// setTimeout(() => {
//   console.log("its after 3 minutes");
// }, 6000);
// let number = 0;
// const timer = setInterval(() => {
//   number++;
//   console.log(number);
//   if (number === 5) {
//     console.log("time Up");
//     clearInterval(timer);
//   }
// }, 1000);

// students.age = 90;

// console.log(students);

// const now = new Date().toLocaleString();
// const day = now.setFullYear(2045);
// const myDate = new Date(day);
// console.log(myDate);
