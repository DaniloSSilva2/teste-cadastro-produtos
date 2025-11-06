// Mock do localStorage antes de importar o script
let adicionarProduto, excluirProduto, produtos;

beforeAll(() => {
  // Simula o localStorage
  global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = String(value);
    },
    clear() {
      this.store = {};
    }
  };

  // Importa o script APÓS criar o mock
  ({ adicionarProduto, excluirProduto, produtos } = require("../script"));
});

describe("Cadastro de Produtos", () => {
  beforeEach(() => {
    produtos.length = 0; // limpa o array antes de cada teste
    localStorage.clear();
  });

  // ---------- TESTES DE ADIÇÃO ----------
  test("deve adicionar um produto válido", () => {
    adicionarProduto("Mouse", 120);
    expect(produtos.length).toBe(1);
    expect(produtos[0]).toEqual({ nome: "Mouse", preco: 120 });
  });

  test("deve lançar erro se o nome estiver vazio", () => {
    expect(() => adicionarProduto("", 120)).toThrow("Nome obrigatório");
    expect(produtos.length).toBe(0);
  });

  test("deve lançar erro se o preço for zero", () => {
    expect(() => adicionarProduto("Teclado", 0)).toThrow("Preço inválido");
    expect(produtos.length).toBe(0);
  });

  test("deve lançar erro se o preço for negativo", () => {
    expect(() => adicionarProduto("Monitor", -50)).toThrow("Preço inválido");
    expect(produtos.length).toBe(0);
  });

  // ---------- TESTES DE EXCLUSÃO ----------
  test("deve excluir produto corretamente", () => {
    adicionarProduto("Teclado", 250);
    excluirProduto(0);
    expect(produtos.length).toBe(0);
  });

  test("deve lançar erro ao excluir índice inválido", () => {
    expect(() => excluirProduto(5)).toThrow("Índice inválido");
  });
});

