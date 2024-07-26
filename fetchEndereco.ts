console.clear();
console.log('-');

interface Endereco {
    cep: string;
    address_type: string;
    address_name: string;
}

const BASE_URL = 'https://cep.awesomeapi.com.br/json';

async function fetchEndereco(cep: string): Promise<Endereco | Error> {
    try {
        const response = await fetch(`${BASE_URL}/${cep}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            signal: AbortSignal.timeout(600),
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! message:'${response.statusText}' status:'${response.status}'`,);
        }
    
        let endereco = await response.json();
        return endereco ? endereco as Endereco : new Error('CEP não encontrado');
    } catch (error) {    
        console.log(error);
        return error;
    }
}

async function main() {            
    const endereco = await fetchEndereco('205211000');     
    console.log('fetchEndereco.ts:');
    endereco  instanceof Error ? console.log({message:endereco.message, name:endereco.name}) : console.log(endereco);     
}

main();

// Análise e pontuação do código:
// 
// Profissionalismo:
// Estrutura e organização do código: 8/10
// - O código está bem estruturado, com funções e interfaces claramente definidas.
// - Poderia ser melhorado com a separação em módulos e uso de constantes para strings fixas.
// 
// Uso de interfaces e tipos: 7/10
// - A interface Endereco está bem definida.
// - Poderia ser melhorado com o uso de tipos mais específicos para erros.
// 
// Tratamento de erros: 6/10
// - Há tratamento básico de erros com try/catch.
// - Poderia ser melhorado com tratamento mais específico de diferentes tipos de erros.
// 
// Comentários e documentação: 3/10
// - Faltam comentários explicativos e documentação das funções.
// 
// Agilidade/Performance:
// Uso de async/await: 9/10
// - Uso correto e consistente de async/await.
// 
// Eficiência nas operações assíncronas: 8/10
// - Bom uso de fetch com timeout.
// - Poderia ser melhorado com cancelamento de requisições desnecessárias.
// 
// Implementação de cache: 0/10
// - Não há implementação de cache, o que poderia melhorar significativamente a performance para CEPs frequentemente consultados.
// 
// Outras otimizações de performance: 5/10
// - O uso de AbortSignal.timeout é uma boa prática.
// - Poderia ser melhorado com validação do CEP antes da requisição e uso de memoização.
// 
// Pontuação total: 46/80