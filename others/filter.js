console.clear();

// O retorno sempre será true or false..
// Dando true o elemento fara parte do novo array.
// Dando false o elemento será exluido do novo array.


const numbers = [1, 2, 3, 4, 5 ];
console.log('Array original:', numbers);


//filtando números maior que 2
const fristFilter = numbers.filter((elemento) => elemento > 2);
console.log('Array números maior que 2:', fristFilter);

//filtrando números divisiveis por 2
const secondFilter = numbers.filter((elemento) => elemento % 2 == 0);
console.log('Array números que dividindo por 2 retorna 0:', secondFilter);


const testFilter = numbers.filter((elemento) => elemento % 2 == !0);
console.log('Array com os números que dividindo por 2 não resulta em 0:', testFilter);

const otherFilter = numbers.filter((i) => i !== 3);
console.log('Array retornando sem o item selecionado:',otherFilter);
