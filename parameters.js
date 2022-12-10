console.clear();

function logParams(a, b, c) {
    console.log(a, b, c);
};


logParams(1, 2, 3);
logParams(1, 2, 3, 4, 5);
logParams(1, 2);
logParams(1);
logParams();

// definindo valor padrão
function defaultParams(a, b, c = 0) {
    console.log(a, b, c);
};

defaultParams(7, 8, 9);
defaultParams(7, 8);

console.log(1);
console.log(1,2,3,4,5);

// Operador spread/ rest
function logNums(...nums) {
    console.log(Array.isArray(nums));
    console.log(nums);
    for(let n of nums) {
        console.log(n);
    };
};

logNums(1,2,3,4,5);

function sumAll(...nums) {
    let total = 0;
    for(let n of nums) {
        total += n

    }
    return total
}

console.log(sumAll(1,2,3,4,5));
