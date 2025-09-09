const palavras = ["javascript", "programador", "forca", "html", "css"];
let palavraSelecionada = "";
let letrasCorretas = [];
let erros = 0;
const maxErros = 6;

const palavraDiv = document.getElementById("palavra");
const tecladoDiv = document.getElementById("teclado");
const contadorErros = document.getElementById("contador-erros");
const mensagem = document.getElementById("mensagem");
const botaoReiniciar = document.getElementById("reiniciar");

let inicioCronometro = null;
let intervaloCronometro = null;

function iniciarJogo() {
  palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
  letrasCorretas = [];
  erros = 0;
  contadorErros.textContent = erros;
  mensagem.textContent = "";
  palavraDiv.innerHTML = palavraSelecionada
    .split("")
    .map(() => "_")
    .join(" ");
  gerarTeclado();

  // Resetar cronômetro
  clearInterval(intervaloCronometro);
  inicioCronometro = null;
  document.getElementById("cronometro").textContent = "00:00:000";
}

function gerarTeclado() {
  tecladoDiv.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i).toLowerCase();
    const botao = document.createElement("button");
    botao.textContent = letra;
    botao.onclick = () => verificarLetra(letra, botao);
    tecladoDiv.appendChild(botao);
  }
}

function verificarLetra(letra, botao) {
    botao.disabled = true;
  
    if (!inicioCronometro) iniciarCronometro();
  
    if (palavraSelecionada.includes(letra)) {
      letrasCorretas.push(letra);
      botao.classList.add("correto");
      atualizarPalavra();
    } else {
      erros++;
      botao.classList.add("errado");
      contadorErros.textContent = erros;
  
      if (erros >= maxErros) {
        desativarTeclado();
        mensagem.textContent = `Você perdeu! A palavra era "${palavraSelecionada}". 😢`;
        pararCronometro();
        return;
      }
    }
  
    if (verificarVitoria()) {
      const tempoFinal = pararCronometro();
      desativarTeclado();
      mostrarCampoNome(tempoFinal);
    }
  }  

function atualizarPalavra() {
  palavraDiv.innerHTML = palavraSelecionada
    .split("")
    .map(letra => (letrasCorretas.includes(letra) ? letra : "_"))
    .join(" ");
}

function verificarVitoria() {
  return palavraSelecionada.split("").every(letra => letrasCorretas.includes(letra));
}

function desativarTeclado() {
  const botoes = tecladoDiv.querySelectorAll("button");
  botoes.forEach(botao => botao.disabled = true);
}

function iniciarCronometro() {
  inicioCronometro = Date.now();
  intervaloCronometro = setInterval(() => {
    const tempoAtual = Date.now() - inicioCronometro;
    const minutos = Math.floor(tempoAtual / 60000);
    const segundos = Math.floor((tempoAtual % 60000) / 1000);
    const milissegundos = tempoAtual % 1000;

    document.getElementById("cronometro").textContent =
      `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}:${String(milissegundos).padStart(3, "0")}`;
  }, 50);
}

function pararCronometro() {
  clearInterval(intervaloCronometro);
  return Date.now() - inicioCronometro;
}

function mostrarCampoNome(tempoFinal) {
  const input = document.createElement("input");
  input.placeholder = "Digite seu nome";
  input.id = "input-nome";

  const botaoSalvar = document.createElement("button");
  botaoSalvar.textContent = "Salvar";

  mensagem.innerHTML = "Você venceu! 🎉";
  mensagem.appendChild(input);
  mensagem.appendChild(botaoSalvar);
  input.focus();

  function salvar() {
    const nome = input.value.trim() || "Anônimo";
    salvarNoRanking(nome, tempoFinal);
    mensagem.innerHTML = "";
    atualizarRanking();
  }

  botaoSalvar.onclick = salvar;

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      salvar();
    }
  });
}

function salvarNoRanking(nome, tempoMs) {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    const nomeNormalizado = nome.trim().toLowerCase();
  
    let jogadorExistente = ranking.find(j => j.nome.toLowerCase() === nomeNormalizado);
  
    if (jogadorExistente) {
      if (tempoMs < jogadorExistente.tempo) {
        jogadorExistente.tempo = tempoMs; // tempo melhor → atualiza
      } else {
        jogadorExistente.tempoPior = true; // tempo pior → marca ❌
      }
    } else {
      ranking.push({ nome, tempo: tempoMs });
    }
  
    ranking.sort((a, b) => a.tempo - b.tempo);
    localStorage.setItem("ranking", JSON.stringify(ranking));
  }  

function atualizarRanking() {
  const lista = document.getElementById("ranking-list");
  lista.innerHTML = "";
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.forEach((jogador, index) => {
    const li = document.createElement("li");
    const medalha = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅";
    const tempoFormatado = formatarTempo(jogador.tempo);
    li.textContent = `${medalha} ${jogador.nome} - ${tempoFormatado}`;
    lista.appendChild(li);
  });

  ranking.forEach((jogador, index) => {
    const li = document.createElement("li");
    const medalha = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅";
    const tempoFormatado = formatarTempo(jogador.tempo);
    li.textContent = `${medalha} ${jogador.nome} - ${tempoFormatado}`;
  
    if (jogador.tempoPior) {
      const x = document.createElement("span");
      x.textContent = "❌";
      x.classList.add("x-tempo-pior");
      li.appendChild(x);
      delete jogador.tempoPior; // limpa pra não ficar ❌ pra sempre
      localStorage.setItem("ranking", JSON.stringify(ranking));
    }
  
    lista.appendChild(li);
  });  
}

document.getElementById("limpar-ranking").onclick = () => {
    localStorage.removeItem("ranking");
    atualizarRanking();
  };  

function formatarTempo(ms) {
  const minutos = Math.floor(ms / 60000);
  const segundos = Math.floor((ms % 60000) / 1000);
  const milissegundos = ms % 1000;
  return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}:${String(milissegundos).padStart(3, "0")}`;
}

botaoReiniciar.onclick = iniciarJogo;

iniciarJogo();
