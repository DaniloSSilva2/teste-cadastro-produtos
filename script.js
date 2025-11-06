let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarLocal() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function adicionarProduto(nome, preco) {
  if (!nome || !preco) throw new Error("Campos obrigatórios");
  produtos.push({ nome, preco });
  salvarLocal();
}

function excluirProduto(i) {
  if (i < 0 || i >= produtos.length) throw new Error("Índice inválido");
  produtos.splice(i, 1);
  salvarLocal();
}

module.exports = { adicionarProduto, excluirProduto, produtos };
}

// Exportar funções para testes
module.exports = { adicionarProduto, produtos };

