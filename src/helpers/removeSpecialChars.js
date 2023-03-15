export default function removeSpecialChars(str) {
  var lower = str.toLowerCase();
  var upper = str.toUpperCase();

  var res = "";
  for (var i = 0; i < lower.length; ++i) {
    if (lower[i] !== upper[i] || lower[i].trim() === "") res += str[i];
  }
  return res;
}
