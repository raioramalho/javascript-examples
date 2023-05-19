import { expect, test } from "vitest";
import Item from "./item";
import Order from "./order";
import Soup from './soup';
import Whisky from './whisky';
import Eletronic from './eletronic';


test('Deve criar um pedido e calcular o total', function () {
  //given
  const order = new Order();
  order.addItem(new Whisky('Jack Deniels', 180));
  order.addItem(new Whisky('Old Par', 100));
  //when
  const total = order.getTotal();
  expect(total).toBe(280);
});

test('Deve criar um pedido e calcular os impostos', function () {
  //given
  const order = new Order();
  order.addItem(new Whisky('Jack Deniels', 180)); //10%
  order.addItem(new Whisky('Old Par', 100)); //10%
  order.addItem(new Soup('Dell Vale', 100)); //1%
  order.addItem(new Eletronic('TV', 1000)) //30%
  order.addItem(new Item('Water', 'Rio do céu', 10)); //insento
  //when
  const taxes = order.getTaxes();
  expect(taxes).toBe(329);
});

test('Deve criar um pedido e imprimir uma mensagem', function () {
  //given
  const order = new Order();
  order.addItem(new Whisky('Jack Deniels', 180)); //10%
  order.addItem(new Whisky('Old Par', 100)); //10%
  order.addItem(new Soup('Dell Vale', 100)); //1%
  order.addItem(new Eletronic('TV', 1000)) //30%
  order.addItem(new Item('Water', 'Rio do céu 500ml', 10)); //insento
  order.addItem(new Item('Water', 'Rio do céu 1L', 15)); //insento
  //when
  const message = order.printMessage();
  expect(message).toBe('Obrigado pela comprar o total foi de R$1405, os impostos de R$329.');
});
