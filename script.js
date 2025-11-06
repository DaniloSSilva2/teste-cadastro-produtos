// script.js
const produtos = [];

function adicionarProduto(nome, preco) {
  if (!nome || preco <= 0) {
    throw new Error("Dados inválidos!");
  }

  const produto = { nome, preco };
  produtos.push(produto);
  return produto;
}

function atualizarLista() {
  const lista = document.getElementById("lista-produtos");
  if (!lista) return;
  lista.innerHTML = "";

  produtos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} - R$ ${p.preco.toFixed(2)}`;
    lista.appendChild(li);
  });
}

if (typeof document !== "undefined") {
  document.getElementById("form-cadastro")?.addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    adicionarProduto(nome, preco);
    atualizarLista();
  });
}

// Exportar funções para testes
module.exports = { adicionarProduto, produtos };
