console.clear();

// Somando todos os números

const numbers = [1, 2, 3, 4, 5 ];

const sum = (total, elemento) => total + elemento;
// primeiro param é a função.
const total = numbers.reduce(sum);
console.log('Somando os números do array:', total);



