const arr = [1,2,3,4,5]
const total = 0
console.log(arr.reduce((total, cur, index, arr) => {
  console.log(total, cur, index);
  return total + cur
}, total)); 