# simple-date
Converts dates so you don't have to.

### install
npm install simple-date

### format
Takes 2 arguments, the string date you have and the desired format you want (in that order).

ex. 
```javascript
var formattedDate = simpleDate.format(your_date, desired_format);
```
### arguments
Currently takes _4_ standard date formats as first arguments and desired formats as second arguments:

###### ex. first args
* __'09-07-1998'__ - (dashed format)
* __'09/07/1998'__ - (slashed format)
* __'September 07, 1998'__ - (month/day/year format) 
* __'07 September, 1998'__ - (day/month/year format) 

###### ex. second args
* __'dashed'__ - ex. output: 09-07-1998
* __'slashed'__ - ex. output: 09/07/1998
* __'mdy'__ - ex. output: September 07, 1998
* __'dmy'__ - ex. output: 07 September, 1998


##### in node.js

```javascript
var simpleDate = require('simple-date');
var newDate = simpleDate.format(your_date, 'dashed');
```

##### in browser

```html
<script src='path/to/simple-date.js'></script>
<script>
    var current_format = '09/07/1998';
    var new_format = simpleDate(current_format, 'mdy');
    console.log(new_format);
</script>
```
