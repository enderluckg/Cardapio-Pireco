function pesquisa()
{
    document.getElementById('LogoHeader').style.marginRight = '70vw'
    document.getElementById('divPesquisa').style.width = '70vw'
    document.getElementById('imgPesquisa').style.left = '90%'
    document.getElementById('inputPesquisa').style.display = 'block'
}

let produtosGlobais = [];

fetch("https://script.google.com/macros/s/AKfycbwQZ-GWfW8DxvJS8RutHqlyk9M8SXLJNa-tzXXEs6vLcf94oj8xWUWiztipNNYaxX94/exec")
  .then(res => res.json())
  .then(produtos => {

    produtosGlobais = produtos; // salva todos
    montarTela(produtos);
  });


function montarTela(lista) {

  const container = document.getElementById("Content");
  container.innerHTML = "";

  const categorias = {};

  lista.forEach(p => {
    if (!categorias[p.Categoria]) {
      categorias[p.Categoria] = [];
    }
    categorias[p.Categoria].push(p);
  });

  for (let categoria in categorias) {

    container.innerHTML += `
      <div class="categoria">
        <h2>${categoria}</h2>
        <div id="${categoria}"></div>
      </div>
    `;

    const div = document.getElementById(categoria);

    categorias[categoria].forEach(item => {
      div.innerHTML += `
        <div class="Produto">
          <span>${item.Nome}</span> 
          <span>${item.Preço}</span>
        </div>
        <div class="Descricao">${item.Descrição}</div>
      `;
    });
  }
}

function filtrarProdutos() {

  const termo = removerAcentos( document.getElementById("inputPesquisa").value.toLowerCase());

  const filtrados = produtosGlobais.filter(p => 
      p.Nome.toLowerCase().includes(termo) ||
      p.Descrição.toLowerCase().includes(termo)
  );

  montarTela(filtrados);
}

function removerAcentos(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

