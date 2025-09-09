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
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891", link: "memoria.html" },
  {nome: "Jogo da Velha", src: "https://images.unsplash.com/photo-1579566346927-c68383817a25", link: "velha.html" },
  {nome: "Jogo da Galinha", src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65", link: "jogodagalinha.html" },
  {nome: "Ping-Pong", src: "https://images.unsplash.com/photo-1617182635496-c5c474367085", link: "pingpong.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1611419010196-a360856fc42f", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1518715303843-586e350765b2", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1617258683488-df59909f25f0", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1543862809-2c9e0bcdc075", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1579156412503-f22426cc6386", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1514068574489-503a8eb91592", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1521714161819-15534968fc5f", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1572188863110-46d457c9234d", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1579702455224-c0dd4ac78234", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1575470180257-7183ddca844f", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1584253660192-de72b033c220", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1611523792722-16952e48cffa", link: "jogo.html" },
  {nome: "Jogo da Memória", src: "https://images.unsplash.com/photo-1536300007881-7e482242baa5", link: "memoria.html" }
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
