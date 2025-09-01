// ================================
// ELEMENTOS DO DOM
// ================================
const carrossel = document.querySelector(".carrossel");
const btnEsquerda = document.getElementById("moverEsquerda");
const btnDireita = document.getElementById("moverDireita");
const indicadores = document.querySelectorAll(".indicador");

let indiceAtivo = 0;

// ================================
// DADOS DOS JOGOS
// ================================
const jogos = [
  { src: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?...", link: "memoria.html" },
  { src: "https://images.unsplash.com/photo-1579566346927-c68383817a25?...", link: "velha.html" },
  { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?...", link: "html.html" },
  { src: "https://images.unsplash.com/photo-1617182635496-c5c474367085?..." },
  { src: "https://images.unsplash.com/photo-1611419010196-a360856fc42f?..." },
  { src: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?..." },
  { src: "https://images.unsplash.com/photo-1518715303843-586e350765b2?..." },
  { src: "https://images.unsplash.com/photo-1617258683488-df59909f25f0?..." },
  { src: "https://images.unsplash.com/photo-1543862809-2c9e0bcdc075?..." },
  { src: "https://images.unsplash.com/photo-1579156412503-f22426cc6386?..." },
  { src: "https://images.unsplash.com/photo-1514068574489-503a8eb91592?..." },
  { src: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?..." },
  { src: "https://images.unsplash.com/photo-1572188863110-46d457c9234d?..." },
  { src: "https://images.unsplash.com/photo-1579702455224-c0dd4ac78234?..." },
  { src: "https://images.unsplash.com/photo-1575470180257-7183ddca844f?..." },
  { src: "https://images.unsplash.com/photo-1584253660192-de72b033c220?..." },
  { src: "https://images.unsplash.com/photo-1611523792722-16952e48cffa?..." },
  { src: "https://images.unsplash.com/photo-1536300007881-7e482242baa5?...", link: "memoria.html" }
];

const descricoes = [
  "Aventura épica nas montanhas geladas.",
  "Drama intenso sobre escolhas difíceis.",
  "Comédia leve para toda a família.",
  "Suspense psicológico que prende do início ao fim.",
  "Documentário revelador sobre tecnologia.",
  "Romance em meio ao caos urbano.",
  "História inspiradora de superação.",
  "Mistério envolvente com reviravoltas.",
  "Animação divertida e educativa.",
  "Ficção científica com visual impressionante.",
  "Narrativa poética sobre amizade.",
  "Exploração profunda da natureza humana.",
  "Viagem emocionante pelo desconhecido.",
  "Retrato realista da juventude moderna.",
  "Ação explosiva e adrenalina pura.",
  "Reflexão sobre o futuro da sociedade.",
  "Humor ácido e inteligente.",
  "Trama envolvente com personagens marcantes."
];

const classificacoes = [
  "Livre", "10 anos", "12 anos", "14 anos", "16 anos", "99 anos", "L", "1", "2 anos", "4 anos", "6 anos", "111 anos", "9", "19", "29 anos", "49 anos", "69 anos", "1119 anos"
];

const porcentagensAcerto = [
  97, 85, 92, 88, 90, 95, 80, 99, 87, 93, 91, 89, 96, 84, 86, 94, 98, 82
];

// ================================
// FUNÇÃO: Preenche o carrossel
// ================================
function preencherCarrossel() {
  jogos.forEach((jogo, indice) => {
    const modelo = document.getElementById("jogo0");
    const clone = modelo.cloneNode(true);

    // Link
    const link = document.createElement("a");
    if (jogo.link) link.href = jogo.link;
    link.target = "_blank";

    // Imagem
    const img = clone.querySelector("img");
    img.src = jogo.src;
    img.parentNode.replaceChild(link, img);
    link.appendChild(img);

    // Texto
    const texto = clone.querySelector(".texto-descricao");
    texto.innerHTML = `
      <span class="porcentagem-acerto">${porcentagensAcerto[indice]}</span>
      <span class="classificacao">${classificacoes[indice % classificacoes.length]}</span>
      <span class="duracao"></span>
      <br><br>
      <span>${descricoes[indice]}</span>
    `;

    carrossel.insertBefore(clone, carrossel.lastChild);
  });
}

preencherCarrossel();

// Remove o modelo original
document.getElementById("jogo0").remove();

// ================================
// FUNÇÃO: Atualiza indicadores
// ================================
function atualizarIndicadores(indice) {
  indicadores.forEach(ind => ind.classList.remove("ativo"));
  indicadores[indice].classList.add("ativo");
}

// ================================
// EVENTOS DE NAVEGAÇÃO
// ================================
btnEsquerda.addEventListener("click", () => {
  const largura = document.querySelector(".cartao-jogo").getBoundingClientRect().width;
  const distancia = largura * 6;

  carrossel.scrollBy({ left: -distancia, behavior: "smooth" });
  indiceAtivo = (indiceAtivo - 1 + 3) % 3;
  atualizarIndicadores(indiceAtivo);
});

btnDireita.addEventListener("click", () => {
  const largura = document.querySelector(".cartao-jogo").getBoundingClientRect().width;
  const distancia = largura * 6;

  if (indiceAtivo === 2) {
    preencherCarrossel();
    carrossel.scrollBy({ left: distancia, behavior: "smooth" });
    indiceAtivo = 0;
  } else {
    carrossel.scrollBy({ left: distancia, behavior: "smooth" });
    indiceAtivo = (indiceAtivo + 1) % 3;
  }

  atualizarIndicadores(indiceAtivo);
});
