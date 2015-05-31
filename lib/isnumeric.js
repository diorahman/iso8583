module.exports = function (obj) {
  obj = typeof(obj) === "string" ? obj.replace(/,/g, "") : obj;
  return !isNaN(parseFloat(obj)) && isFinite(obj) && Object.prototype.toString.call(obj).toLowerCase() !== "[object array]";
};
