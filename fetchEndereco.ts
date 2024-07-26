// Limpa o console
console.clear();
// Exibe mensagem de início
console.log('-');

// Define a interface Endereco
interface Endereco {
    cep: string;
    address_type: string;
    address_name: string;
}

// Define a URL base para a API de CEP
const baseUrl = 'https://cep.awesomeapi.com.br/json';

// Função assíncrona para buscar endereço a partir do CEP
async function buscaEndereco(cep: string): Promise<Endereco | Error> {
    try {
        // Faz a requisição para a API
        const response = await fetch(`${baseUrl}/${cep}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! message:'${response.statusText}' status:'${response.status}'`,);
        }
    
        // Converte a resposta para JSON
        let endereco = await response.json();
        // Retorna o endereço ou um erro se não for encontrado
        return endereco ? endereco as Endereco : new Error('CEP não encontrado');
    } catch (error) {
        // Loga o erro e o retorna
        console.error(error);
        return error;
    }
}

// Função principal assíncrona
async function run() {    
        // Busca o endereço para o CEP '20521100'
        const endereco = await buscaEndereco('20521100');     
        // Exibe o resultado no console
        console.log('fetchEndereco.ts:');
        console.log(endereco);
}

// Executa a função principal
run();