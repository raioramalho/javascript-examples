// interface CalcularTotal {
//     execute(item1: number, item2: number): number;
// }

// class CalcularTotalItens implements CalcularTotal {
//     execute(item1: number, item2: number): number {
//         return item1 + item2;
//     }
// }

// class CalcularTotalComDesconto implements CalcularTotal {
//     private readonly DESCONTO = 10;

//     execute(item1: number, item2: number): number {
//         return item1 + item2 - this.DESCONTO;
//     }
// }

// class CalcularTotalFactory {
//     static create(tipo: string): CalcularTotal {
//         const calculadoras = {
//             'itens': CalcularTotalItens,
//             'desconto': CalcularTotalComDesconto
//         };

//         const Calculadora = calculadoras[tipo];
//         if (!Calculadora) {
//             throw new Error('Tipo de cálculo não encontrado');
//         }

//         return new Calculadora();
//     }
// }

// function main(): void {
//     console.clear();
//     console.log('Iniciando...');

//     const calculos = [
//         { tipo: 'itens', valores: [10, 20] },
//         { tipo: 'desconto', valores: [10, 20] },
//         { tipo: 'itens', valores: [20, 20] }
//     ];

//     calculos.forEach(({ tipo, valores: [valor1, valor2] }) => {
//         const calculo = CalcularTotalFactory.create(tipo);
//         console.log(`Tipo: ${tipo}, Resultado: ${calculo.execute(valor1, valor2)}`);
//     });
// }

// main();