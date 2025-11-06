/**
 * @jest-environment jsdom
 */
const { adicionarProduto, produtos } = require("../script");

describe("Cadastro de Produtos", () => {
  beforeEach(() => {
    produtos.length = 0; // limpa o array antes de cada teste
  });

  test("Deve adicionar um produto com nome e preço válidos", () => {
    const produto = adicionarProduto("Mouse", 99.9);
    expect(produto).toEqual({ nome: "Mouse", preco: 99.9 });
    expect(produtos).toHaveLength(1);
  });

  test("Deve lançar erro se o nome estiver vazio", () => {
    expect(() => adicionarProduto("", 50)).toThrow("Dados inválidos!");
  });

  test("Deve lançar erro se o preço for zero ou negativo", () => {
    expect(() => adicionarProduto("Teclado", 0)).toThrow("Dados inválidos!");
  });
});
