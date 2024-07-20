console.clear();
console.log('Starting....');

class Database {
    public db: Product[] = [];
    public list() {
        return this.db.map((product) => {
            return product.getProduct();
        });
    }
}

const database = new Database();

class Product {
    private id: string;
    private name: string;
    private price: number;
    private categories: Category[] = [];
    private discounts: Discount[] = [];
    constructor(name: string, price: number) {
        this.id = crypto.randomUUID().split('-')[0];
        this.name = name;
        this.price = price;
    }
    getProduct() {
        return {
            id: this.id,
            name: this.name,
            price: this.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
            categories: this.categories.map(category => category.getCategory()),
            discounts: this.discounts.map(discount => discount.getDiscount())
        };
    }

    addCategory(category: Category) {
        this.categories.push(category);
    }

    addDiscount(discount: Discount) {
        if (!this.discounts.some(d => d.getId() === discount.getId())) {
            this.discounts.push(discount);
            this.applyDiscount(discount);
        }        
    }

    applyDiscount(discount: Discount) {
        this.price = this.price * (1 - discount.getPercentage() / 100);
    }

    private applyDiscounts() {        
        this.discounts.forEach(discount => {
            this.applyDiscount(discount);
        });             
    }

    save() {
        database.db.push(this);
    }

    update(name: string, price: number) {
        this.name = name;
        this.price = price;        
        this.applyDiscounts();
        const index = database.db.findIndex(product => product.id === this.id);
        if (index >= 0) {
            database.db[index] = this;
        }
    }

    delete() {
        const index = database.db.findIndex(product => product.id === this.id);
        if (index >= 0) {
            database.db.splice(index, 1);
        }
    }
}

class Category {
    private id: string;
    private name: string;
    constructor(name: string) {
        this.id = crypto.randomUUID().split('-')[0];
        this.name = name;
    }
    getCategory() {
        return {
            id: this.id,
            name: this.name
        };
    }
}

class Discount {
    private id: string;
    private name: string;
    private percentage: number;
    constructor(name: string, percentage: number) {
        this.id = crypto.randomUUID().split('-')[0];
        this.name = name;
        this.percentage = percentage;
    }

    getDiscount() {
        return {
            id: this.id,
            name: this.name,
            percentage: `${this.percentage}%`
        };
    }

    getPercentage() {
        return this.percentage;
    }

    getId() {
        return this.id;
    }
}

const testCategory = new Category('test');
const testProduct = new Product('test', 20);
const testDiscount = new Discount('test', 10);
const testDiscount2 = new Discount('test2', 5);

testProduct.addCategory(testCategory);
testProduct.addDiscount(testDiscount);
testProduct.addDiscount(testDiscount2);

testProduct.save();

console.log('---- ---------------- ----');
console.log(testProduct.getProduct());
console.log('---- List database ----');
console.log(database.list());
console.log('---- ---------------- ----');
