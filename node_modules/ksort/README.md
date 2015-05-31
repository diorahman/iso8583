
## Usages

### In Node.js

To install:

```bash
$ npm install ksort
```

Simple usage:

```javascript
var ksort = require('ksort');

var array = ksort(array, function(a, b){ return a.index < b.index;});
            ksort(array);
```




Test case:
```javascript

var arrayObject, arrayNormal;

var arrayObject = [], arrayNormal = [];

iterator(100, function(i){

  arrayObject.push({index: i});
  arrayNormal.push(i);
});

arrayObject = ksort(arrayObject, function(a, b){ return a.index < b.index;});
arrayNormal = ksort(arrayNormal);

console.log(arrayObject, arrayNormal);

function iterator(end, func){
  
  var i = end;

  while(i-->0) func(i);
}
```

