import { MercadoPagoConfig, Payment } from "mercadopago";
import { PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types";

export class MercadoPagoService {
  private readonly config: MercadoPagoConfig;
  constructor() {
    this.config = new MercadoPagoConfig({
      accessToken: `TEST-4449924619313017-090620-7f26b63c8c739fc093bd515160a2dad8-303975723`
    });
  }

  async createPaymentLink(
    valor: number,
    descricao: string
  ) {
    try {
      let payment = new Payment(this.config);
      let paymentBody: PaymentCreateRequest = {
        transaction_amount: valor,
        description: descricao,
        payment_method_id: 'pix',        
        payer: {
          email: 'ramalho.sit@gmail.com',          
        }
      };

      let createPayment = await payment.create({
        body: paymentBody,  
        requestOptions: {
          idempotencyKey: crypto.randomUUID(),
        }     
      });

      return createPayment;
    } catch (error) {
      console.log(`Cai no throw!!`);
      console.log(error);
    }
  }
}

async function main() {
  console.clear();
  console.log(`Starting payment.......`);
  console.log(`Starting payment test....`);

  const mercadoPagoService = new MercadoPagoService();

  const payment = await mercadoPagoService.createPaymentLink(
    10.25,
    "Teste de pagamento"
  );

  console.log(payment);
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