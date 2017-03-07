var usingChars = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var charBase = usingChars.length;

/**
 * Convert a BASE10 Integer to BASE58 String
 * @param {*} num BASE10 Integer
 */
function encode(num){
  var encoded = '';
  while (num){
    var remainder = num % charBase;
    num = Math.floor(num / charBase);
    encoded = usingChars[remainder].toString() + encoded;
  }
  return encoded;
}

/**
 * Convert a BASE58 String to BASE10 Integer
 * @param {*} str BASE58
 */
function decode(str){
  var decoded = 0;
  while (str){
    var index = usingChars.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(charBase, power));
    str = str.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;