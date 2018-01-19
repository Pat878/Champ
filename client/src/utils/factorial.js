//getRandomInt is taken from MDN
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function addFactorial() {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var number = getRandomInt(1, 11);

  function factorial(number) {
    if (number == 0) {
      return 1;
    } else {
      return number * factorial(number - 1);
    }
  }
  return factorial(number);
}
