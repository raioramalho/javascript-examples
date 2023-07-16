export class Dev {
  private name: string;
  private age: number;
  private tipo: string;
  constructor(name: string, age: number, tipo: string) {
    this.name = name;
    this.age = age;
    this.tipo = tipo;
  }
  saudacao() {
    console.log(`Olá me chamo ${this.name} e sou ${this.tipo}`);
  }
}


const FrontDev = function (nome: string, age: number) {
  const newDev = new Dev(nome, age, 'FrontEndDev');
  Object.setPrototypeOf(this, newDev);
}

const BackDev = function (nome: string, age: number) {
  const newDev = new Dev(nome, age, 'BackEndDev');
  Object.setPrototypeOf(this, newDev);
}

const Alan: Dev = new BackDev('Alan', 26);
const Viviane: Dev = new FrontDev('Viviane', 24);


console.log(Alan)
Alan.saudacao()


console.log(Viviane)
Viviane.saudacao()
