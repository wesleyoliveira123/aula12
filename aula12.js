const inputTitulo = document.getElementById('tituloNota');
const botaoAdicionar = document.getElementById('botaoAdicionar');
const listaNotas = document.getElementById('listaNotas');

function carregarNotas() {
  const notas = JSON.parse(localStorage.getItem('notas')) || [];
  listaNotas.innerHTML = '';

  notas.forEach(nota => {
    const item = document.createElement('li');
    item.textContent = nota.titulo;

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.classList.add('remove-btn');
    botaoRemover.onclick = () => removerNota(nota.titulo);

    item.appendChild(botaoRemover);
    listaNotas.appendChild(item);
  });
}

function adicionarNota() {
  const titulo = inputTitulo.value.trim();
  if (titulo === '') return alert('Digite um título válido.');

  let notas = JSON.parse(localStorage.getItem('notas')) || [];

  if (notas.find(n => n.titulo === titulo)) {
    return alert('Já existe uma nota com este título.');
  }

  notas.push({ titulo });
  localStorage.setItem('notas', JSON.stringify(notas));
  inputTitulo.value = '';
  carregarNotas();
}

function removerNota(titulo) {
  let notas = JSON.parse(localStorage.getItem('notas')) || [];
  notas = notas.filter(n => n.titulo !== titulo);
  localStorage.setItem('notas', JSON.stringify(notas));
  carregarNotas();
}

botaoAdicionar.addEventListener('click', adicionarNota);
window.addEventListener('DOMContentLoaded', carregarNotas);
