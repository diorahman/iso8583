var DataElement = require('./data-element').DataElement;
var FIXED_LENGTH = require('./data-element').FIXED_LENGTH;
var VARIABLE_LENGTH = require('./data-element').VARIABLE_LENGTH;
var sprintf = require('extsprintf').sprintf;
var isNumeric = require('./isnumeric');
var isAlphaNumeric = require('./isalphanumeric');
var isAlpha = require('./isalpha');
var utils = require('./utils');
var baseConvert = utils.baseConvert;
var setCharAt = utils.setCharAt;
var ksort = utils.ksort;

module.exports = ISO8583;

function ISO8583() {
  this.bitmap = '';
  this.mti = '';
  this.iso = '';
  this.valid = {};
  this.data = {};
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
        var sLen = '';
        if (dataElement[1] < 10) {
          sLen = sprintf('%01s', data.length); 
        } else if (dataElement[1] < 99) {
          sLen = sprintf('%02s', data.length);
        } else {
          sLen = sprintf('%03s', data.length);
        }
        result = sprintf(sLen, '%0' + dataElement[1] + 's', dataElement[1] - data.length) + data;

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
  for (var key in this.data) {
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
  this.iso = '';
  this.data = {};
}

ISO8583.prototype.removeData = function(bit) {
  if (bit > 1 && bit <= 128) {
    delete this.data[bit];
    this.data = ksort(this.data);
    this.calculateBitmap();
  }
}

ISO8583.prototype.addData = function(bit, data) {
  if (bit < 1 || bit > 128)
    throw new Error('Invalid bit');
  var result = this.packElement(DataElement[bit], data);
  if (!result)
    throw new Error('Failure for bit');
  this.data[bit] = result;
  this.data = ksort(this.data);
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
  var data = '';
  for (var k in this.data) {
    data += this.data[k];
  }
  return this.mti + this.bitmap + data;
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
      primary += sprintf('%04d', baseConvert(input[i], 16, 2));
    }
    if (primary[0] == 1 && input.length >= 32) {
      for (var i = 16; i < 32; i++)
        secondary += sprintf('%04d', baseConvert(input[i], 16, 2));
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
  if (Object.keys(this.data).length == 0)
    return;
  this.valid.data = true;
  for (var key in this.data) {
    this.valid['de'] = this.valid['de'] || {};
    this.valid['de'][key] = false;
    if (DataElement[key][0] != 'b') {
      if (DataElement[key][2] == FIXED_LENGTH) {
        var tmp = input.substr(0, DataElement[key][1]);
        if (tmp.length == DataElement[key][1]) {
          if (DataElement[key][0] == 'n') {
            this.data[key] = input.substr(0, DataElement[key][1]); 
          } else {
            this.data[key] = input.substr(0, DataElement[key][1]).trimLeft();
          }
          this.valid['de'][key] = true;
          input = input.substr(DataElement[key][1], input.length - DataElement[key][1]);
        }
      } else {
        var len = DataElement[key][1].toString().length;
        var tmp = input.substr(0, len);
        if (len == tmp.length) {
          var num = parseInt(tmp);
          input = input.substr(len, input.length - len);

          var tmp2 = input.substr(0, num);
          if (tmp2.length == num) {
            if (DataElement[key][0] == 'n') {
              this.data[key] = parseFloat(tmp2);
            } else {
              this.data[key] = tmp2.trimLeft();
            }
            input = input.substr(num, input.length - num);
            this.valid['de'][key] = true;
          }
        }    
      }
    } else {
      if (key > 1) {
        if (DataElement[key][2] == FIXED_LENGTH) {
          var bit = '0';
          var start = false;
          for (var i = 0; i < DataElement[key][1]/4; i++) {
            bit = baseConvert(input[i], 16, 2) || '0';
            if (bit != 0)
              start = true;
            if (start)
              this.data[key] += bit;
          }
          // I'm not sure about this one
          // this.data[key] = bit; 
        }     
      } else {
        var tmp = this.iso.substr(4 + 16, 16);
        if (tmp.length == 16) {
          this.data[key] = this.iso.substr(4 + 16, 16);
          this.valid['de'][key] = true;
        }
      }
    }
    if (!this.valid['de'][key]) this.valid['data'] = false;
  }
  return this.data;
}

ISO8583.prototype.getData = function() {
  return this.data;
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
