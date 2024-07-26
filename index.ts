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
            }
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
    console.log(endereco);
}

main();

// Pontuação do código:
// Profissionalismo: 8/10
// - Boa estrutura e organização do código
// - Uso adequado de interfaces e tipos
// - Tratamento de erros implementado
// - Poderia melhorar com comentários explicativos

// Agilidade/Performance: 7/10
// - Uso de async/await para operações assíncronas
// - Fetch API utilizada de forma eficiente
// - Poderia melhorar com cache de resultados para CEPs já consultados
// - Considerar uso de timeout para a requisição fetch