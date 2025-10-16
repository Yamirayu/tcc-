// Elementos principais
const slider = document.querySelector(".carrossel");
const btnLeft = document.getElementById("moverEsquerda");
const btnRight = document.getElementById("moverDireita");
const template = document.getElementById("jogo0");

// Configurações
let activeIndex = 0;
let itemsPerPage = window.innerWidth < 900 ? 4 : 6;

// Dados dos jogos
const movies = [
  { nome: "Jogo da Memória", src: "memoriacapa.png", link: "memoria.html" },
  { nome: "Jogo da Velha", src: "velha.jpg", link: "velha.html" },
  { nome: "Jogo da Galinha", src: "galinha.jpg", link: "jogodagalinha.html" },
  { nome: "Ping-Pong", src: "pingpong.jpg", link: "pingpong.html" },
  { nome: "Julinator", src: "julinatorcapa.jpg", link: "Akinator.html" },
  { nome: "Lipenator", src: "lipenatorcapa.jpg", link: "Akinator2.html" },
];

// Dados extras (mock)
const descriptions = Array(movies.length).fill("Empolgante · Estratégico · Educativo");
const ratings = Array(movies.length).fill("Livre");
const matches = Array(movies.length).fill(95);

// Lazy loading com IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const realSrc = img.getAttribute("data-src");
      if (realSrc) {
        img.src = realSrc;
        img.removeAttribute("data-src");
      }
      observer.unobserve(img);
    }
  });
});

// Função para preencher o carrossel
function populateSlider() {
  movies.forEach((movie, index) => {
    const clone = template.cloneNode(true);
    clone.id = "";

    // Link clicável
    const link = document.createElement("a");
    link.href = movie.link || "#";
    link.target = "_blank";

    // Imagem com lazy loading
    const img = clone.querySelector("img");
    img.loading = "lazy";
    img.setAttribute("data-src", movie.src);
    img.src = ""; // placeholder leve
    img.alt = `Jogo ${index + 1}`;
    img.parentNode.replaceChild(link, img);
    link.appendChild(img);
    observer.observe(img); // ativa o lazy loading

    // Texto descritivo
    const textContainer = clone.querySelector(".texto-descricao");
    textContainer.innerHTML = `
      <strong>${movie.nome}</strong><br>
      <span class="porcentagem-acerto">${matches[index]}%</span>
      <span class="classificacao">${ratings[index]}</span>
      <span class="duracao">15min</span>
      <br><br>
      <span>${descriptions[index]}</span>
    `;

    slider.appendChild(clone);
  });

  template.remove(); // Remove o modelo original
}

// Navegação
function scrollCarrossel(direction) {
  const movieWidth = document.querySelector(".cartao-jogo").offsetWidth;
  const scrollAmount = movieWidth * itemsPerPage;

  if (direction === "right") {
    activeIndex++;
    if (activeIndex * itemsPerPage >= slider.children.length) {
      activeIndex = 0;
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  } else {
    activeIndex = Math.max(activeIndex - 1, 0);
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }
}

// Eventos
btnRight.addEventListener("click", () => scrollCarrossel("right"));
btnLeft.addEventListener("click", () => scrollCarrossel("left"));

// Inicialização
populateSlider();

// 🔄 Atualiza indicadores visuais
function updateIndicators(index) {
  indicators.forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

// ⬅️ Botão Esquerda
btnLeft.addEventListener("click", () => {
  const movieWidth = document.querySelector(".movie").offsetWidth;
  const scrollAmount = movieWidth * 6;

  slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });

  activeIndex = (activeIndex - 1 + indicators.length) % indicators.length;
  updateIndicators(activeIndex);
});

// ➡️ Botão Direita
btnRight.addEventListener("click", () => {
  const movieWidth = document.querySelector(".movie").offsetWidth;
  const scrollAmount = movieWidth * 6;

  if (activeIndex === indicators.length - 1) {
    populateSlider(); // looping
    activeIndex = 0;
  } else {
    activeIndex++;
  }

  slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  updateIndicators(activeIndex);
});

// Scroll Right button
btnRight.addEventListener("click", (e) => {
  let movieWidth = document.querySelector(".movie").getBoundingClientRect().width;
  let scrollDistance = movieWidth * 6;

  console.log(`movieWidth = ${movieWidth}`);
  console.log(`scrolling right ${scrollDistance}`);

  if (activeIndex == 2) {
    populateSlider();
    slider.scrollBy({ top: 0, left: +scrollDistance, behavior: "smooth" });
    activeIndex = 0;
    updateIndicators(activeIndex);
  } else {
    slider.scrollBy({ top: 0, left: +scrollDistance, behavior: "smooth" });
    activeIndex = (activeIndex + 1) % 3;
    console.log(activeIndex);
    updateIndicators(activeIndex);
  }
});

// Busca e sugestão
function sugerirJogos() {
  const termo = document.getElementById("busca").value.toLowerCase();
  const lista = document.getElementById("sugestoes");
  lista.innerHTML = "";

  movies.forEach((movie, index) => {
    if (movie.nome.toLowerCase().includes(termo) && termo !== "") {
      const item = document.createElement("li");
      item.textContent = movie.nome;
      item.onclick = () => rolarParaJogo(index);
      lista.appendChild(item);
    }
  });
}

function rolarParaJogo(index) {
  const jogos = document.querySelectorAll(".cartao-jogo");
  jogos.forEach(j => j.classList.remove("destaque"));

  const alvo = jogos[index];
  if (alvo) {
    alvo.scrollIntoView({ behavior: "smooth", block: "center" });
    alvo.classList.add("destaque");
    document.getElementById("sugestoes").innerHTML = "";
    document.getElementById("busca").value = "";
  }
}
