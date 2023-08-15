console.log('Starting...');


export class PersonDto {
  name: string;
  lastName: string;
  age: number;
}


type FindPerson = PersonDto[keyof PersonDto]

const lista: PersonDto[] = [
  { name: 'Alan', lastName: 'Ramalho', age: 26 },
  { name: 'John', lastName: 'Doe', age: 25 },
];


function buscaPessoa(param: FindPerson): PersonDto | boolean {
  const findByName = lista.filter((pessoa) => pessoa.name === param)[0];
  const findByLastName = lista.filter((pessoa) => pessoa.lastName === param)[0];
  const findByAge = lista.filter((pessoa) => pessoa.age === param)[0];
  if (findByName) {
    return findByName;
  }
  if (findByLastName) {
    return findByLastName;
  }
  if (findByAge) {
    return findByAge;
  }

  return false;
}

console.log(buscaPessoa('John'));
