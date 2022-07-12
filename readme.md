# Numbers, Dates, Internationalization(INTL) and Timers

- Numbers in js are represented internally as floating point numbers.
- e.g `23 === 23.0`
- Numbers are stored in binary format (zeros and ones )
- You cant run scientific or financial calculations with js.

### Converting Strings to Numbers

- `console.log(Number('23'));` - Method 1
- `console.log(+'23');` - Method 2
- Method 2 works basically because, when js sees the `+` sign, it does type corcion.
