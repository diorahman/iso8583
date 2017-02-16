var b36arr=['0','1','2','3','4','5','6','7','8','9', 
            'a','b','c','d','e','f','g','h','i','j', 
            'k','l','m','n','o','p','q','r','s','t', 
            'u','v','w','x','y','z']; 

exports.baseConvert = function(num, frombase, tobase) { 
  var str = num.toString(); 
  var len = str.length; 
  var p = 1; 
  var b10 = 0; 
  for (var i = len; i > 0; i--) { 
    var b = str.charCodeAt(i-1); 
    var c = str.charAt(i); 
    if ( b >= 48 && b <= 57) { 
      b = b - 48; 
    } else if (b >= 97 && b <= 122) { 
      b = b - 97 + 10; 
    } else if ( b >= 65 && b <= 90) { 
      b = b-65 + 10; 
    } 
    b10 = b10 + b*p; 
    p= p * frombase; 
  } 
  var newval = '';
  var ost = 0; 
  while (b10 > 0) { 
    ost = b10 % tobase; 
    b10 = Math.floor(b10/tobase); 
    newval = b36arr[ost] + '' + newval; 
  } 
  return newval; 
}

exports.setCharAt = function(str,index,chr) {
  if(index > str.length-1)
    return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}

exports.ksort = function(obj) {
  var keys = Object.keys(obj);
  var ret = {};
  keys.sort().forEach(function(key){
    ret[key] = obj[key];
  });
  return ret;
}
