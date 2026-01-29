function pesquisa() {
  document.getElementById('LogoHeader').style.marginRight = '70vw'
  document.getElementById('divPesquisa').style.width = '70vw'
  document.getElementById('imgPesquisa').style.left = '90%'
  document.getElementById('inputPesquisa').style.display = 'block'
  document.getElementById('themeToggle').style.display = 'none'
}

function fechaPesquisa() {
  document.getElementById('LogoHeader').style.marginRight = '0'
  document.getElementById('divPesquisa').style.width = '10vw'
  document.getElementById('imgPesquisa').style.left = '50%'
  document.getElementById('inputPesquisa').style.display = 'none'
  document.getElementById('themeToggle').style.display = 'block'
}

function inicio() {
  document.getElementById('LogoHeader').style.marginRight = '0'
  document.getElementById('divPesquisa').style.width = '10vw'
  document.getElementById('imgPesquisa').style.left = '50%'
  document.getElementById('inputPesquisa').style.display = 'none'
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  document.getElementById('themeToggle').style.display = 'block'
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

  const termo = document.getElementById("inputPesquisa").value.toLowerCase();

  const filtrados = produtosGlobais.filter(p =>
    p.Nome.toLowerCase().includes(termo) ||
    p.Descrição.toLowerCase().includes(termo)
  );

  montarTela(filtrados);
}




document.querySelectorAll('.Classes').forEach(item => {
  item.addEventListener('click', () => {
    // Remove selection from others if needed, or just scroll
    const categoriaNome = item.innerText.trim();
    const alvo = document.getElementById(categoriaNome);

    if (alvo) {
      // Scroll to the parent .categoria div to include the header
      alvo.parentElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Dark Mode Logic
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggle');

  body.classList.toggle('dark-mode');

  // Update button and save preference
  if (body.classList.contains('dark-mode')) {
    btn.innerText = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    btn.innerText = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

// Initialize Theme
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const btn = document.getElementById('themeToggle');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (btn) btn.innerText = '☀️';
  }
})();
