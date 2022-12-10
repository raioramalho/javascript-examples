console.clear();
//Função que recebe outra F como param.

const numbers = [ 1, 2, 3, 4, 5];

const double = numbers.map(function (elemento){
    return elemento * 2;
})

const arrowDouble = numbers.map((elemento) => elemento * 2);

console.log(numbers, double, arrowDouble);
