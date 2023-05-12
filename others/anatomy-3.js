console.clear()


// Function Expression
const increment1 = function(n) {
    return n + 1;
};

const increment2 = (n) => {
    return n + 1;
};

const increment3 = n => {
    return n + 1;
}

const increment4 = n => n + 1;

console.log(increment1(5));
console.log(increment2(8));
console.log(increment3(10));
console.log(increment4(9));

const sum = (a, b) => a + b;
console.log(sum(5,5));
