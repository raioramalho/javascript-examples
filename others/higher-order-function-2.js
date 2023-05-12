console.clear();

// Função retornando outra func..
// Passando params de forma parcial..
// Técnica de curring..

function finalPrice(tax) {
    return function(price){
        return price * (1 + tax);
    }
};

const nycFinalPrice = finalPrice(1); // primeira chamada ;

console.log(nycFinalPrice(10)); // segunda chamada;
