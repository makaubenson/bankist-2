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
