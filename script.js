'use strict';

/////////////////////////////////////////////////
// BANKIST APP

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2022-07-08T10:17:24.185Z',
    '2022-07-09T14:11:59.604Z',
    '2022-07-11T17:01:17.194Z',
    '2022-07-12T23:36:17.929Z',
    '2022-07-13T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function (date, locale) {
  const calcDatesPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDatesPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

//Function to internationalize currency
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    // const formattedMov = new Intl.NumberFormat(acc.locale, {
    //   style: 'currency',
    //   currency: acc.currency,
    // }).format(mov);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}`;
};

//computing usernames
//const user = 'Stephen Thomas Williams'; //username should be: stw
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
  // console.log(accounts);
};
createUsernames(accounts);

const updateUI = function (acc) {
  //display Movements
  displayMovements(acc);
  //display Balance
  calcDisplayBalance(acc);
  //display Summary
  calcDisplaySummary(acc);
};
//Implimenting Login
let currentAccount;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent default bevahior
  // console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  //use nullish coalescing operator
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Welcome Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //add todays date on bankist app.
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    //current Date
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //long,numeric,2-digit
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Updating User Interface Values
    updateUI(currentAccount);
  }
});
//Implimenting Transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    //Updating User Interface Values
    updateUI(currentAccount);
  }
});

//borrow loan (use some() method)
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //get the requested loan amount
  const amount = Math.floor(inputLoanAmount.value);

  //condition
  if (
    amount > 0 &&
    currentAccount.movements.some(function (mov) {
      return mov >= amount * 0.1;
    })
  ) {
    //add the movement to the array of movements for the current user
    currentAccount.movements.push(amount);

    //Add Loan Date
    currentAccount.movementsDates.push(new Date().toISOString());
    //update UI
    updateUI(currentAccount);
  }
  //clear input value
  inputLoanAmount.value = '';
});

//The findIndex() METHOD
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    // console.log(index);
    //Delete Account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
//Lectures
/*
//Converting strings to numbers
console.log(Number('23'));
console.log(+'23');

const age = '45';
const intAge = Number(age);
console.log(typeof intAge); //number
//Or
const floatAge = +age;
console.log(typeof floatAge); //number

//Parsing
// console.log(Number.parseInt('30px', 10)); //30
// console.log(Number.parseInt('30.15px', 10)); //30

// console.log(Number.parseFloat('30px', 10)); //30
// console.log(Number.parseFloat('30.15px', 10)); //30.15

// Check if value is not a number
// console.log(Number.isNaN(10)); //false
// console.log(Number.isNaN('10')); //false
// console.log(Number.isNaN(+'10x')); //true
// console.log(Number.isNaN(23 / 0)); //false

//isFinite()- check if value is a real number
// console.log(Number.isFinite(10)); //true
// console.log(Number.isFinite('10')); //false
// console.log(Number.isFinite(+'10x')); //false
// console.log(Number.isFinite(23 / 0)); //false

//isInteger()
// console.log(Number.isInteger(10)); //true
// console.log(Number.isInteger('10')); //false
// console.log(Number.isInteger(+'10x')); //false
// console.log(Number.isInteger(23 / 0)); //false

//Math and Rounding
//Square Root
console.log(Math.sqrt(25)); //5
// you can use exponentation operator
console.log(25 ** (1 / 2)); // 2 is the square

console.log(8 ** (1 / 3)); // calculating the cubic root

//find max value, using (Math.max())
console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23
console.log(Math.max(5, 18, '23px', 11, 2)); //NaN

//find min value, using (Math.min())
console.log(Math.min(5, 18, 23, 11, 2)); //23
console.log(Math.min(5, 18, '23', 11, 2)); //23
console.log(Math.min(5, 18, '23px', 11, 2)); //NaN

//constants in the Math namespace
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6));
console.log(Math.trunc(Math.random() * 6));

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(10, 20));

//Rounding Integers
console.log(Math.trunc(23.3)); //23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //23

//Rounding Decimals
console.log((2.7).toFixed(0)); //3  a string
console.log((2.7).toFixed(3)); //2.700 a string
console.log((2.345).toFixed(2)); //2.35 a string

//The Remainder Operator
console.log(5 % 2); //1
console.log(5 / 2); //2.5
console.log(8 % 3); //2
console.log(8 / 3); //2.6666666666666665

//check if number is even(if remainder is 0, it is even)
console.log(6 % 2); //0 thus it is even

const isEven = function (n) {
  return n % 2 === 0;
};
console.log(isEven(8)); //true
console.log(isEven(9)); //false
console.log(isEven(16)); //true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});


//Numeric Separators
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price); //34599

const PI = 3.1_41_5;
console.log(PI);

console.log(Number('230_000')); //NaN
console.log(parseInt('230_000')); //230


//BIGINT
console.log(2 ** 53 - 1); //9007199254740991
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(54585885544555256985211236578n);
console.log(BigInt(54585885544578));

console.log(20n > 15); //true
console.log(20n === 20); //false
console.log(20n == 20); //true
console.log(typeof 20n); //bigint
// console.log(Math.sqrt(16n));

//divisions
console.log(11 / 3); //3.6666666666666665
console.log(11n / 3n); //3n
console.log(12n / 3n); //4n


//Creating Dates
//Method 1
const now = new Date();
console.log(now); //Wed Jul 13 2022 12:04:20 GMT+0300 (East Africa Time)

// Method 2
console.log(new Date('July 13 2022 12:05:41')); //Wed Jul 13 2022 12:05:41 GMT+0300 (East Africa Time)
console.log(new Date('December 24, 2015')); //Thu Dec 24 2015 00:00:00 GMT+0300 (East Africa Time)

console.log(account1.movementsDates[0]); //2019-11-18T21:31:17.178Z

console.log(new Date(2037, 10, 19, 15, 23, 5)); //Thu Nov 19 2037 15:23:05 GMT+0300 (East Africa Time)
console.log(new Date(2037, 10, 31)); //Tue Dec 01 2037 00:00:00 GMT+0300 (East Africa Time)

//Find milliseconds that passed since the beginning of unix time.
console.log(new Date(0)); //Thu Jan 01 1970 03:00:00 GMT+0300 (East Africa Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //Sun Jan 04 1970 03:00:00 GMT+0300 (East Africa Time)

//working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); //Thu Nov 19 2037 15:23:00 GMT+0300 (East Africa Time)

console.log(future.getFullYear()); //2037
// console.log(future.getYear());// not recommended
console.log(future.getMonth()); //10 => November
console.log(future.getDate()); //19 - Day of the month
console.log(future.getDay()); //4 - Day of the week (0 is sunday, thus 4 is thursday)
console.log(future.getHours()); //15
console.log(future.getMinutes()); //23
console.log(future.getSeconds()); //0
console.log(future.getMilliseconds()); //0
console.log(future.toISOString()); //2037-11-19T12:23:00.000Z

//get timestamp for the date(milliseconds that have passed since january 1970)
console.log(future.getTime());
console.log(new Date(2142246180000));

//get current time stamp
console.log(Date.now());

//set versions of the Date methods
future.setFullYear(2040);
console.log(future);


//Operations with Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));

const calcDatesPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDatesPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);
*/

//Internationalization of Numbers
// const num = 3884764.23;
// const options = {
//   style: 'currency', //percent,currency,unit
//   unit: 'mile-per-hour', //celcius,mile-per-hour
//   currency: 'EUR',
//   useGrouping: true, //false
// };
// console.log('US: ', new Intl.NumberFormat('en-US', options).format(num)); //US:  3,884,764.23
// console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num)); //US:  3,884,764.23
// console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num)); //US:  3,884,764.23
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, options).format(num)
// );
