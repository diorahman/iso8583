var DataElement = require('./data-element').DataElement;
var FIXED_LENGTH = require('./data-element').FIXED_LENGTH;
var VARIABLE_LENGTH = require('./data-element').VARIABLE_LENGTH;
var sprintf = require('extsprintf').sprintf;
var isNumeric = require('./isnumeric');
var isAlphaNumeric = require('./isalphanumeric');
var isAlpha = require('./isalpha');
var bases = require('bases');

module.exports = ISO8583;

var b36arr=['0','1','2','3','4','5','6','7','8','9', 
            'a','b','c','d','e','f','g','h','i','j', 
            'k','l','m','n','o','p','q','r','s','t', 
            'u','v','w','x','y','z']; 

function baseConvert(num, frombase, tobase){ 
  var str = num.toString(); 
  var len = str.length; 
  var p = 1; 
  var b10 = 0; 
  for (var i = len; i > 0; i--) { 
    b = str.charCodeAt(i-1); 
    c = str.charAt(i); 
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
  var newval=''; 
  var ost=0; 
  while (b10 > 0) { 
    ost = b10 % tobase; 
    b10 = Math.floor(b10/tobase); 
    newval = b36arr[ost] + '' + newval; 
  } 
  return newval; 
}

function setCharAt(str,index,chr) {
  if(index > str.length-1)
    return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}

function ksort(obj) {
  var keys = Object.keys(obj);
  var ret = {};
  keys.sort().forEach(function(key){
    ret[key] = obj[key];
  });
  return ret;
}

function ISO8583() {
  this.data = [];
  this.bitmap = '';
  this.mti = '';
  this.iso = '';
  this.valid = {};
  this.builderData = {};
}

ISO8583.prototype.packElement = function (dataElement, data) {
  if (!Array.isArray(dataElement))
    throw new TypeError('dataElement should be an array');
  if (typeof data != 'string')
    throw new TypeError('data should be a string');
  var result = '';

  // numeric value
  if (dataElement[0] == 'n' && isNumeric(data) && data.length <= dataElement[1]) {
    data = data.split('.').join('');

    // fixed length
    if (dataElement[2] == FIXED_LENGTH) {
      result = sprintf('%0' + dataElement[1] + 's', data);
    } else {
      if (data.length <= dataElement[1])
        result = sprintf('%0' + dataElement[1] + 's', data.length) + data;
    }
  }

  // alpha value
  if ((dataElement[0] == 'a' && isAlpha(data) && data.length <= dataElement[1]) || 
      (dataElement[0] == 'an' && isAlphaNumeric(data) && data.length <= dataElement[1]) ||
      (dataElement[0] == 'z' && data.length <= dataElement[1]) ||
      (dataElement[0] == 'ans' && data.length <= dataElement[1])
      ) {
    
    if (dataElement[2] == FIXED_LENGTH) {
      result = sprintf('%' + dataElement[1] + 's', data);
    }
    else {
      if (data.length <= dataElement[1])
      {
        result = sprintf('%0' + dataElement[1] + 's', data.length) + data;
      }
    }
  }

  // bit value
  if (dataElement[0] == 'b' && data.length <= dataElement[1]) {
    if (dataElement[2] == FIXED_LENGTH) {
      var tmp = sprintf('%0' + dataElement[1] + 'd', data);
      while (tmp != '') {
        result += baseConvert(tmp.substr(0, 4), 2, 16) || '0';
        tmp = tmp.substr(4, tmp.length - 4);
      }
    } 
  }
  return result;
}

ISO8583.prototype.calculateBitmap = function() {
  var tmp1 = sprintf('%064d', 0);
  var tmp2 = sprintf('%064d', 0);
  for (var key in this.builderData) {
    if (key < 65)
      tmp1 = setCharAt(tmp1, key - 1, 1);
    else {
      tmp1 = setCharAt(tmp1, 0, 1);
      tmp2 = setCharAt(tmp2, key - 65, 1);
    }
  }
  var result = '';
  if (tmp1[0] == 1) {
    while (tmp2 != '') {
      result += baseConvert(tmp2.substr(0,4), 2, 16) || '0';
      tmp2 = tmp2.substr(4, tmp2.length - 4);
    }
  }
  var main = '';
  while (tmp1 != '') {
    main += baseConvert(tmp1.substr(0,4), 2, 16) || '0';
    tmp1 = tmp1.substr(4, tmp1.length - 4); 
  }
  this.bitmap = (main + result).toUpperCase();
  return this.bitmap;
}

ISO8583.prototype.clear = function() {
  this.mti = '';
  this.bitmap = '';
  this.data = [];
  this.iso = '';
}

ISO8583.prototype.removeData = function(bit) {
  if (bit > 1 && bit <= 128) {
    delete this.builderData[bit];
    this.builderData = ksort(this.builderData);
    this.calculateBitmap();
  }
}

ISO8583.prototype.addData = function(bit, data) {
  if (bit < 1 || bit > 128)
    throw new Error('Invalid bit');
  var result = this.packElement(DataElement[bit], data);
  if (!result)
    throw new Error('Failure for bit');
  this.builderData[bit] = result;
  this.builderData = ksort(this.builderData);
  this.data = [];
  for (var k in this.builderData) {
    this.data.push(this.builderData[k]);
  }
  this.calculateBitmap();
}

ISO8583.prototype.addMTI = function(mti) {
  if (mti.length == 4 && /^\d+$/.test(mti))
    this.mti = mti;
}

ISO8583.prototype.parseMTI = function() {
  this.addMTI(this.iso.substr(0, 4));
  if (this.mti.length == 4 && this.mti[1] != 0)
    this.valid.mti = true;
}

ISO8583.prototype.getMTI = function() {
  return this.mti;
}

ISO8583.prototype.getISO = function() {
  // this.iso = this.mti + this.bitmap + this.data.join('');
  return this.mti + this.bitmap + this.data.join('');
}

ISO8583.prototype.getBitmap = function() {
  return this.bitmap;
}

ISO8583.prototype.parseBitmap = function() {
  this.valid.bitmap = false;
  var input = this.iso.substr(4, 32);
  var primary = '';
  var secondary = '';
  if (input.length >= 16) {
    for (var i = 0; i < 16; i++) {
      primary += sprintf('%04d', bases.toBase2(input[i]));
    }
    if (primary[0] == 1 && input.length >= 32) {
      for (var i = 16; i < 32; i++)
        secondary += sprintf('%04d', bases.toBase2(input[i]));
      this.valid.bitmap = true;
    }
    if (secondary == '')
      this.valid.bitmap = true;
  }
  var tmp = primary + secondary;
  for (var i = 0; i < tmp.length; i++) {
    if (tmp[i] == 1)
      this.data[i + 1] = '?';
  }
  this.bitmap = tmp;
}

ISO8583.prototype.parseData = function() {
  var input = '';
  if (typeof this.data[1] != 'undefined' && this.data[1] == '?')
    input = this.iso.substr(4+32, this.iso.length - 4 - 32);
  else
    input = this.iso.substr(4+16, this.iso.length - 4 - 16);
  this.valid.data = true;
  var that = this;
  this.data.forEach(function(val, i){
    that.valid.de = that.valid.de || {};
    that.valid.de[i] = false;
    if (DataElement[i][0] != 'b') {
      if (DataElement[i][2] == FIXED_LENGTH) {
        var tmp = input.substr(0, DataElement[i][1]);
        if (tmp.length == DataElement[i][1]) {
          if (DataElement[i][0] == 'n')
            that.data[i] = input.substr(0, DataElement[i][1]);
          else
            that.data[i] = input.substr(0, DataElement[i][1]).trimLeft();
        }
        that.valid.de[i] = true;
        input = input.substr(DataElement[i][1], input.length - DataElement[i][1]);
      }
      else {
        var len = DataElement[i][1].length;
        var tmp = input.substr(0, len);
        if (tmp.length == len) {
          var num = parseInt(tmp);
          input = input.substr(len, input.length - len);
          
          var tmp2 = input.substr(0, num);
          if (tmp2.length == num) {
            if (DataElement[i][0] == 'n')
              that.data[i] = parseFloat(tmp2);
            else
              that.data[i] = tmp2.trimLeft();
          }
          input = input.substr(num, input.length - num);
          that.valid.de[i] = true;
        }
      }
    }
    else {
      if (i > 1) {
        if (DataElement[i][2] == FIXED_LENGTH) {
          var start = false;
          var bit = 0;
          for (var j = 0; j < DataElement[j][1]/4; i++) {
            bit = bases.toBase2(input[j]);
            if (bit != 0)
              start = true;
            if (start)
              that.data[i] += bit;
          }
          that.data[i] = bit;
        }
      } else {
        var tmp = that.iso.substr(4 + 16, 16);
        if (tmp.length == 16) {
          that.data[i] = that.iso.substr(4 + 16, 16);
          that.valid.de[i] = true;
        }
      }
    }
    if (!that.valid.de[i])
      that.valid.data = false;
  });
}

ISO8583.prototype.addISO = function(iso) {
  if (iso.trim().length == 0)
    return;
  this.clear();
  this.iso = iso;
  this.parseMTI();
  this.parseBitmap();
  this.parseData();
}
