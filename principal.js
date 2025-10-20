// Elementos principais
const slider = document.querySelector(".carrossel");
const template = document.getElementById("jogo0");

// Configurações
let activeIndex = 0;
let itemsPerPage = window.innerWidth < 900 ? 4 : 6;

// Dados dos jogos
const movies = [
  { nome: "Jogo da Memória", src: "memoriacapa.png", link: "memoria.html" },
  { nome: "Jogo da Velha", src: "velhacapa.png", link: "velha.html" },
  { nome: "Jogo da Galinha", src: "galinhacapa.png", link: "jogodagalinha.html" },
  { nome: "Ping-Pong", src: "pingpongcapa.jpeg", link: "pingpong.html" },
  { nome: "Julinator", src: "julinatorcapa.jpg", link: "estrategia.html" },
  { nome: "Lipenator", src: "lipenatorcapa.jpg", link: "reflexo.html" }
];

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

// Preenche o carrossel
function populateSlider() {
  movies.forEach((movie, index) => {
    const clone = template.cloneNode(true);
    clone.id = `jogo${index}`;
    clone.setAttribute("data-nome", movie.nome.toLowerCase());

    const link = document.createElement("a");
    link.href = movie.link || "#";
    link.target = "_blank";

    const img = clone.querySelector("img");
    img.loading = "lazy";
    img.setAttribute("data-src", movie.src);
    img.src = "";
    img.alt = `Jogo ${index + 1}`;
    img.parentNode.replaceChild(link, img);
    link.appendChild(img);
    observer.observe(img);

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

  template.style.display = "none";
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

// Busca de jogos
function sugerirJogos() {
  const termo = document.getElementById("busca").value.toLowerCase();
  const lista = document.getElementById("sugestoes");
  lista.innerHTML = "";

  const encontrados = movies.filter(movie =>
    movie.nome.toLowerCase().includes(termo) && termo !== ""
  );

  if (encontrados.length > 0) {
    lista.classList.add("aberta");
    encontrados.forEach((movie) => {
      const item = document.createElement("li");
      const termoRegex = new RegExp(`(${termo})`, "gi");
      const nomeDestacado = movie.nome.replace(termoRegex, "<strong>$1</strong>");
      item.innerHTML = `<span>${nomeDestacado}</span>`;
      item.onclick = () => rolarParaJogo(movie.nome);
      lista.appendChild(item);
    });
  } else if (termo !== "") {
    lista.classList.add("aberta");
    const item = document.createElement("li");
    item.innerHTML = `<em>Nenhum jogo com esse nome foi identificado ;(</em>`;
    item.style.color = "var(--cinza-claro)";
    item.style.textAlign = "center";
    lista.appendChild(item);
  } else {
    lista.classList.remove("aberta");
  }
}

// Rolar e destacar jogo por nome
function rolarParaJogo(nomeBuscado) {
  document.querySelectorAll(".cartao-jogo").forEach(j => j.classList.remove("destaque"));

  const alvo = Array.from(document.querySelectorAll(".cartao-jogo")).find(j =>
    j.getAttribute("data-nome") === nomeBuscado.toLowerCase()
  );

  if (alvo) {
    alvo.scrollIntoView({ behavior: "smooth", block: "center" });
    alvo.classList.add("destaque");
    document.getElementById("sugestoes").innerHTML = "";
    document.getElementById("busca").value = "";
  }
}

// Footer dinâmico
const devs = [
  { nome: "Wellyngton (Gigante)", insta: "wellygigante" },
  { nome: "Kaique Cordeiro", insta: "kaique.cordeiro" },
  { nome: "Yara De Morais", insta: "yaramorais.dev" },
  { nome: "Erik Vensceslau (Capivara)", insta: "capivara.erik" },
  { nome: "Gustavo (Musquitão)", insta: "gustavomusquitao" }
];

let devIndex = 0;
const nomeEl = document.getElementById("dev-nome");
const instaEl = document.getElementById("dev-instagram");
const container = document.getElementById("dev-info");

function atualizarFooter() {
  container.classList.remove("fade-in");
  container.classList.add("fade-out");

  setTimeout(() => {
    devIndex = (devIndex + 1) % devs.length;
    const dev = devs[devIndex];
    nomeEl.textContent = dev.nome;
    instaEl.textContent = `@${dev.insta}`;
    instaEl.href = `https://instagram.com/${dev.insta}`;
    container.classList.remove("fade-out");
    container.classList.add("fade-in");
  }, 600);
}

// Inicialização
populateSlider();
setInterval(atualizarFooter, 5000);

function mostrarExplicacao(tipo) {
  const area = document.getElementById("area-explicativa");
  area.classList.remove("fade-in");
  area.classList.add("fade-out");

  setTimeout(() => {
    if (tipo === "categorias") {
      area.innerHTML = `
        <h3>🎮 Categorias de Jogos</h3>
        <p>Os jogos são divididos em categorias que estimulam diferentes habilidades:</p>
        <ul>
          <li><strong>Lógica:</strong> Desafios que envolvem raciocínio e algoritmos</li>
          <li><strong>Reflexo:</strong> Teste sua velocidade de reação</li>
          <li><strong>Memória:</strong> Exercite sua capacidade de retenção</li>
          <li><strong>Estratégia:</strong> Planeje e vença com inteligência</li>
        </ul>
        <img src="categorias.png" alt="Categorias de jogos">
      `;
    } else if (tipo === "informacoes") {
      area.innerHTML = `
        <h3>ℹ️ Sobre o Projeto</h3>
        <p>Este site foi criado para transformar o ensino de lógica de programação em uma experiência divertida e envolvente. Cada jogo foi pensado para estimular habilidades específicas como raciocínio, memória, reflexo e estratégia.</p>
        <p>Ideal para estudantes, professores e curiosos que querem aprender brincando!</p>
        <img src="sobre.png" alt="Sobre o projeto">
      `;
    }

    area.classList.remove("fade-out");
    area.classList.add("fade-in");
  }, 300);
}
