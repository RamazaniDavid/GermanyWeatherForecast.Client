"use strict";

Array.prototype.min = function (attrib, justValue = true) {
  const checker = (o, i) => typeof o === "object" && o[i];
  var obj =
    (this.length &&
      this.reduce(function (prev, curr) {
        const prevOk = checker(prev, attrib);
        const currOk = checker(curr, attrib);
        if (!prevOk && !currOk) return {};
        if (!prevOk) return curr;
        if (!currOk) return prev;
        return prev[attrib] < curr[attrib] ? prev : curr;
      })) ||
    null;
  return justValue && obj ? obj[attrib] : obj;
};

Array.prototype.max = function (attrib, justValue = true) {
  const checker = (o, i) => typeof o === "object" && o[i];
  var obj =
    (this.length &&
      this.reduce(function (prev, curr) {
        const prevOk = checker(prev, attrib);
        const currOk = checker(curr, attrib);
        if (!prevOk && !currOk) return {};
        if (!prevOk) return curr;
        if (!currOk) return prev;
        return prev[attrib] > curr[attrib] ? prev : curr;
      })) ||
    null;
  return justValue && obj ? obj[attrib] : obj;
};
