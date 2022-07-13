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
