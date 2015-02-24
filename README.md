# simple-date
Converts dates so you don't have to.

### format
Takes 2 arguments, the string date you have and the desired format you want (in that order).

ex. 
```javascript
var formattedDate = simpleDate.format(your_date, desired_format);
console.log(formattedDate);
```
### arguments
Currently takes _4_ standard date formats as first arguments and desired formats as second arguments:

###### first args
* 09-07-1998
* 09/07/1998
* September 07, 1998
* 07 September, 1998

###### second args
* __dashed__ - ex. output: 09-07-1998
* __slashed__ - ex. output: 09/07/1998
* __mdy__ - ex. output: September 07, 1998
* __dmy__ - ex. output: 07 September, 1998


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
