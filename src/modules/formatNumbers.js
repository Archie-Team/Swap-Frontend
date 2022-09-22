export function CommaFormat(number) {
  let cut = Number(number).toFixed(2);
  let format = new Intl.NumberFormat().format(cut);
  return format;
}

export function roundNumber(number, digits) {
  if (number === "") return "";
  var multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);
  return truncatedNum / multiplier;
}

export function shortAccountAddress(account) {
  return "0x..." + account.substr(account.length - 4);
}
