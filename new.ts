class entidade {
  id: number;
  name: string;
  constructor(id, name) {
    this.id = id,
    this.name = name
  }
  async grita() {
    console.log(this.id, 'gritei!', this.name.toLocaleUpperCase());
  }
}

const db: entidade[] = []
console.log(db)

const var1 = new entidade(1, 'alan')
const var2 = new entidade(2, 'ramalho')

db.push(var1, var2)

console.log(db)

const sel = 'ramalho'

const find = db.find((item) => item.name === sel)?.grita()
