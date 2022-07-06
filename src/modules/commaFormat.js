export function CommaFormat(number) {
  let cut = Number(number).toFixed(2);
  let format = new Intl.NumberFormat().format(cut);
  return format;
}
