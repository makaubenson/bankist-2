# Numbers, Dates, Internationalization(INTL) and Timers

- Numbers in js are represented internally as floating point numbers.
- e.g `23 === 23.0`
- Numbers are stored in binary format (zeros and ones )
- You cant run scientific or financial calculations with js.

### Converting Strings to Numbers

- `console.log(Number('23'));` - Method 1
- `console.log(+'23');` - Method 2
- Method 2 works basically because, when js sees the `+` sign, it does type corcion.

### Parsing numbers from strings

- Js has methods which could be use to parse numbers from strings
- e.g
- `console.log(Number.parseInt('30px')); //30`
- This methods can scan through the string and only extract the numbers leaving the symbols and alphabets. However, the condition is, `the string has to begin with a number`
- `console.log(Number.parseInt('e30px')); //NaN`- This returns not a number since the string doesnt begin with a number.
- The `parseInt()` accepts the second argument which is called the `Radix`- where radix is base of the normal system that we are using , e.g base 10

- `console.log(Number.parseFloat('30px', 10)); //30`
- `console.log(Number.parseFloat('30.15px', 10)); //30.15`

- `parseInt(), parseFloat() and the other parsing functions are known as global functions. This implies that when being called, its not a must they are called on an object.`
- e.g
- `console.log(Number.parseFloat('30px', 10)); //30`- The method is called on the object `Number`
- can be reached by
  `console.log(parseFloat('30px', 10)); //30`- The number method is removed.

### isNan()

- `console.log(Number.isNaN(10)); //false`
- `console.log(Number.isNaN('10')); //false`
- `console.log(Number.isNaN(+'10x')); //true`
- `console.log(Number.isNaN(23 / 0)); //false`- This is false since 23 / 0 is infinity and thus js views it as Not a Number

### isFinite()

- The global isFinite() function determines whether the passed value is a finite number. If needed, the parameter is first converted to a number.
- `console.log(Number.isFinite(10)); //true`
- `console.log(Number.isFinite('10')); //false`
- `console.log(Number.isFinite(+'10x')); //false`
- `console.log(Number.isFinite(23 / 0)); //false`

### isInteger()

- `console.log(Number.isInteger(10)); //true`
- `console.log(Number.isInteger('10')); //false`
- `console.log(Number.isInteger(+'10x')); //false`
- `console.log(Number.isInteger(23 / 0)); //false`

## Math and Rounding

### Square Root

- `console.log(Math.sqrt(25)); //5`
- you can use exponentation operator
- `console.log(25 ** (1 / 2)); // 2 is the square`
- `console.log(8 ** (1 / 3)); // calculating the cubic root`

### find max value, using (Math.max())

- console.log(Math.max(5, 18, 23, 11, 2)); //23
- console.log(Math.max(5, 18, '23', 11, 2)); //23 - It results to 23 since it does type coercion of string 23 to number 23
- console.log(Math.max(5, 18, '23px', 11, 2)); //NaN - results to NaN since it doesnt does parsing

### find max value, using (Math.min())

- console.log(Math.min(5, 18, 23, 11, 2)); //2
- console.log(Math.min(5, 18, '23', 11, 2)); //2
- console.log(Math.min(5, 18, '23px', 11, 2)); //NaN - results to NaN since it doesnt does parsing

- `console.log(Math.random());` - Gives a random number between 0 and 1

- `console.log(Math.trunc(Math.random() * 6) + 1);` - Math.trunc removes the decimal points in a number

#### Function to Generate random number

- `const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1)+ min;`
- `console.log(randomInt(1, 10));`

### Rounding Integers

- `console.log(Math.trunc(23.3));` - Removes any decimal part
- `console.log(Math.round(23.9)); //24` Rounds to the nearest integer

### Math.ceil()

- `The Math.ceil() function always rounds a number up to the next largest integer.`
- console.log(Math.ceil(23.3)); //24
- console.log(Math.ceil(23.9)); //24
- does type coercion

### Math.floor()

- The Math.floor() function returns the largest integer less than or equal to a given number.
- console.log(Math.floor(23.3)); //23
- console.log(Math.floor(23.9)); //23
- does type coercion

### Rounding Decimals

- The toFixed() method formats a number using fixed-point notation.
- `console.log((2.7).toFixed(0)); //3`
- toFixed returns a string not a number
- `console.log((2.7).toFixed(3)); //2.700 a string`

### The Remainder Operator (%)

- The remainder operator (%) returns the remainder left over when one operand is divided by a second operand.
- It always takes the sign of the dividend.
- console.log(5 % 2); //1
- console.log(5 / 2); //2.5
- console.log(8 % 3); //2
- console.log(8 / 3); //2.6666666666666665

- ` const isEven = function (n) { return n % 2 === 0; };`
- `console.log(isEven(8)); //true`

### Numeric Separators

- `const diameter = 287_460_000_000;`
- `console.log(diameter);`-Output: 287460000000
- Undescores can actually be used as numeric separators.
- The underscore can only be used between numbers. Not Start or End of a number.

#### undescore numeric separator use case

- `console.log(Number('230_000')); //NaN`
- `console.log(parseInt('230_000')); //230`

### BIGINT

- Special type of integers
- Since numbers are represented in 64bits it implies that, there are 64 0s and 1s to represent a particular number.
- 53 are used to store digjits, the rest are for storing the position of decimal points and sign.
- `console.log(2 ** 53 - 1); //9007199254740991`
- `console.log(Number.MAX_SAFE_INTEGER); //9007199254740991`
- Any number greater than the MAX_SAFE_INTEGER cannot be represented safely and accurately.
- However to represent numbers larger than the MAX_SAFE_INTEGER, we use bigint.

##### Creating Bigint

- `console.log(54585885544555256985211236578n);` -Adding n at the end of the value converts it to a bigint. Reliable for very large values.

- `console.log(BigInt(54585885544555256985211236578));`- Using BigInt() method. This method is prefered for smaller values.
- It is not possible to mix bigint values with other types. To mix them, you have to make all values to be bigint.

- `console.log(20n > 15); //true`
- `console.log(20n === 20); //false`
- BigInt doesnt do type coercion.

- Math functions cannot work with the bigint
- e.g `console.log(Math.sqrt(16n));`
- Output for the above op: `script.js:372 Uncaught TypeError: Cannot convert a BigInt value to a number at Math.sqrt (<anonymous>)`

#### BigInt Divisions

- `console.log(11 / 3); //3.6666666666666665 `
- `console.log(11n / 3n); //3n`- Truncates the decimal part.
- `console.log(12n / 3n); //4n`

## Dates

### Creating Dates

- There are 4 ways of creating dates.
- Method 1
- `const now = new Date();`
- `console.log(now); //Wed Jul 13 2022 12:04:20 GMT+0300 (East Africa Time)`

- Method 2
- `console.log(new Date('July 13 2022 12:05:41')); //Wed Jul 13 2022 12:05:41 GMT+0300 (East Africa Time)`
- `console.log(new Date(2037, 10, 31)); //Tue Dec 01 2037 00:00:00 GMT+0300 (East Africa Time)` - Js auto corrects if invalid date is input. For the case above, there is no 31st in november, thus it autocorrects to date 1 dec.

##### Find milliseconds that passed since the beginning of unix time.

### working with dates

- `const future = new Date(2037, 10, 19, 15, 23);`
- `console.log(future); //Thu Nov 19 2037 15:23:00 GMT+0300 (East Africa Time)`

- `console.log(future.getFullYear()); //2037`
- `console.log(future.getMonth()); //10 => November`
- `console.log(future.getDate()); //19 - Day of the month`
- `console.log(future.getDay()); //4 - Day of the week`
- `console.log(future.getHours()); //15`
- `console.log(future.getMinutes()); //23`
- `console.log(future.getSeconds()); //0`
- `console.log(future.getMilliseconds()); //0`
- `console.log(future.toISOString()); //2037-11-19T12:23:00.000Z`

### Internationalizing Dates

- Js has a new internationalization API which allows us ato format numbers and strings based on different languages.
- Getting locale parameter from the users browser
- `const locale = navigator.language;`
- `labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);`

### Internationalization of Numbers

- `const num = 3884764.23;`
- ```const options = {
    style: 'currency', //percent,currency,unit
    unit: 'mile-per-hour', //celcius,mile-per-hour
    currency: 'EUR',
    useGrouping: true, //false
  };
  ```
- `console.log('US: ', new Intl.NumberFormat('en-US', options).format(num)); //US: 3,884,764.23`
- `console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num)); //US: 3,884,764.23`
- `console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num)); //US: 3,884,764.23`
- `console.log( navigator.language, new Intl.NumberFormat(navigator.language, options).format(num) );`
- More on documentation

### Function to internationalize currency

- ```
  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };
  ```

### Timers

- We have 2 types of timers in Js:- `SETTIMEOUT` and `SETINTERVAL` timers.
- SETTIMEOUT - runs once after a defined time. (Can be used to execute some code in future)
- SETINTERVAL - keeps running throughout until we stop it.

##### setTimeout() method

```
setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  'olives',
  'spinach'
);
```

- `() => console.log('Here is your pizza ')` is a callback function which is the first argument, then
- `3000` is the second argument which represent time in milliseconds
- `1 sec == 1000 milliseconds`
- We can cancel the timeout before the delay is over.

##### clearing setTimeout()

```
const ingredients = ['Olives', 'Spinach', 'Tomatoes'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
); //This functions receives call back function
if (ingredients.includes('Spinach')) clearTimeout(pizzaTimer);
```

- In summary, `setTimeout()` schedules a function to run after a certain amount of time.
