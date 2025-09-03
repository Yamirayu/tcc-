const palavras = ["javascript", "programador", "html", "css", "forca"];
const palavra = palavras[Math.floor(Math.random() * palavras.length)];
let erros = 0;
let acertos = [];

const palavraDiv = document.getElementById("palavra");
const tecladoDiv = document.getElementById("teclado");
const errosSpan = document.getElementById("contador-erros");
const mensagemP = document.getElementById("mensagem");

// Exibe a palavra com letras acertadas ou "_"
function mostrarPalavra() {
  palavraDiv.innerHTML = palavra
    .split("")
    .map(letra => (acertos.includes(letra) ? letra : "_"))
    .join(" ");
}

// Cria os botões do teclado
function criarTeclado() {
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i).toLowerCase();
    const botao = document.createElement("button");
    botao.textContent = letra;
    botao.onclick = () => verificarLetra(letra, botao);
    tecladoDiv.appendChild(botao);
  }
}

// Verifica se a letra está na palavra
function verificarLetra(letra, botao) {
  botao.disabled = true;

  if (palavra.includes(letra)) {
    botao.classList.add("correct");
    if (!acertos.includes(letra)) {
      acertos.push(letra);
    }
    mostrarPalavra();

    // Verifica se todas as letras foram acertadas
    if (!palavra.split("").some(l => !acertos.includes(l))) {
      mensagemP.textContent = "Você venceu! 🎉";

      // Efeito wave nos botões corretos
      const botoesAcertados = [...tecladoDiv.children].filter(b =>
        acertos.includes(b.textContent)
      );
      botoesAcertados.forEach((botao, i) => {
        setTimeout(() => {
          botao.classList.add("letra-acertada");
        }, i * 100);
      });

      // Efeito visual na palavra
      palavraDiv.classList.add("letra-acertada");

      // Chama a tela de parabéns
      mostrarTelaParabens();
    }
  } else {
    botao.classList.add("wrong");
    erros++;
    errosSpan.textContent = erros;

    if (erros >= 6) {
      mensagemP.textContent = `Você perdeu! A palavra era "${palavra}". 😢`;
      tecladoDiv.querySelectorAll("button").forEach(b => b.disabled = true);

      // Revela a palavra e aplica efeito de "quebra"
      palavraDiv.textContent = palavra.split("").join(" ");
      palavraDiv.classList.add("letra-quebrada");
    }
  }
}

// Permite jogar com o teclado físico
document.addEventListener("keydown", (e) => {
  const letra = e.key.toLowerCase();
  const botao = [...tecladoDiv.children].find(b => b.textContent === letra);
  if (botao && !botao.disabled) {
    verificarLetra(letra, botao);
  }
});

// Botão de reinício
document.getElementById("reiniciar").onclick = () => location.reload();

let tempo = 0;
let cronometroAtivo = false;
const cronometroEl = document.getElementById("cronometro");

function atualizarCronometro() {
  const minutos = String(Math.floor(tempo / 60)).padStart(2, "0");
  const segundos = String(tempo % 60).padStart(2, "0");
  cronometroEl.textContent = `${minutos}:${segundos}`;
}

let intervalo;

document.addEventListener("keydown", () => {
  if (!cronometroAtivo) {
    cronometroAtivo = true;
    intervalo = setInterval(() => {
      tempo++;
      atualizarCronometro();
    }, 1000);
  }
});

function mostrarTelaParabens() {
  clearInterval(intervalo); // para o cronômetro

  // Cria o overlay
  const overlay = document.createElement("div");
  overlay.id = "parabens-overlay";
  overlay.innerHTML = `
    <div id="parabens-box">
      <h2>🎉 Parabéns!</h2>
      <p>Você acertou a palavra em <strong>${cronometroEl.textContent}</strong></p>
      <input type="text" id="nome-jogador" placeholder="Digite seu nome">
      <button id="salvar-ranking">Salvar</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // Desfoca o fundo
  document.body.classList.add("desfocado");

  // Salva no ranking
  document.getElementById("salvar-ranking").onclick = () => {
    const nome = document.getElementById("nome-jogador").value || "Anônimo";
    const tempoFinal = cronometroEl.textContent;
    adicionarAoRanking(nome, tempoFinal);
    overlay.remove();
    document.body.classList.remove("desfocado");
  };
}

function adicionarAoRanking(nome, tempo) {
  const novoItem = document.createElement("li");
  novoItem.textContent = `${nome} - ${tempo}`;
  novoItem.classList.add("bronze"); // ou lógica pra ouro/prata/bronze
  document.getElementById("ranking-list").appendChild(novoItem);
}

// Inicializa o jogo
mostrarPalavra();
criarTeclado();
