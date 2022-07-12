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
