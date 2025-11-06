// cria mock do localStorage antes de importar o script
let adicionarProduto, excluirProduto, produtos;

beforeAll(() => {
  // mock do localStorage
  global.localStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    clear() { this.store = {}; }
  };

  // importa o script APÓS criar o mock
  ({ adicionarProduto, excluirProduto, produtos } = require("../script"));
});

describe("Cadastro de Produtos", () => {
  beforeEach(() => {
    produtos.length = 0; // limpa o array antes de cada teste
    localStorage.clear();
  });

  test("deve adicionar um produto válido", () => {
    adicionarProduto("Mouse", 120);
    expect(produtos.length).toBe(1);
    expect(produtos[0]).toEqual({ nome: "Mouse", preco: 120 });
  });

  test("não deve adicionar produto com campos vazios", () => {
    expect(() => adicionarProduto("", 120)).toThrow("Campos obrigatórios");
  });

  test("deve excluir produto corretamente", () => {
    adicionarProduto("Teclado", 250);
    excluirProduto(0);
    expect(produtos.length).toBe(0);
  });

  test("deve lançar erro ao excluir índice inválido", () => {
    expect(() => excluirProduto(5)).toThrow("Índice inválido");
  });
});
