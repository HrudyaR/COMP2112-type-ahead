export function numberWithCommas(x) {
  // Refer new number formatting feature - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    x
  );
}
