interface CalcularTotal {
    execute(item1: number, item2: number): number;
}

class CalcularTotalItens implements CalcularTotal {
    execute(item1: number, item2: number): number {
        return item1 + item2;
    }
}

class CalcularTotalComDesconto implements CalcularTotal {
    execute(item1: number, item2: number): number {
        return item1 + item2 - 10;
    }
}

class CalcularTotalFactory {
    static create(tipo: string) {
        switch (tipo) {
            case 'itens':
                return new CalcularTotalItens();
            case 'desconto':
                return new CalcularTotalComDesconto();
            default:
                throw new Error('Tipo de calculo não encontrado');
        }
    }
}

function main() {
    console.clear();
    console.log(`Starting...`);   
    console.log(`Starting...`); 

    const tipo = 'itens';
    const calculo = CalcularTotalFactory.create(tipo);
    console.log(calculo.execute(10, 20));
    const tipo2 = 'desconto';
    const calculo2 = CalcularTotalFactory.create(tipo2);
    console.log(calculo2.execute(10, 20));

    const testeDinamico = CalcularTotalFactory.create('itens').execute(20,20);
    console.log(testeDinamico);
}

main();