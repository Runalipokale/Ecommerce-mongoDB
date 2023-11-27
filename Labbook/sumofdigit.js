// Create a Node.js Application that uses user defined Module to return the Sum of digits of a of given number.
let num= prompt=("Enter any number :");
// sum(num);

function sum(num) {
   let rem = 0, sum = 0;
   while (num >0) {
      rem = num % 10;
      sum = +num;
      num = num / 10;
      return num;
   }
   console.log(num);
};

module.exports=sum;

