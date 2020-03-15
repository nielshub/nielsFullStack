Cards = [1, 2, 4, 6, 4, 7];
count = {};
Cards.forEach(function(i) {
  count[i] = (count[i] || 0) + 1;
});
console.log(count);
