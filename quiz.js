let respostaCorreta;
let vidas = 3;

function gerarPergunta() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 9) + 1; // evita divisão por zero
  const operacoes = ["+", "-", "*", "/"];
  const operacao = operacoes[Math.floor(Math.random() * operacoes.length)];

  let textoPergunta = `${num1} ${operacao} ${num2}`;
  switch (operacao) {
    case "+": respostaCorreta = num1 + num2; break;
    case "-": respostaCorreta = num1 - num2; break;
    case "*": respostaCorreta = num1 * num2; break;
    case "/": respostaCorreta = parseFloat((num1 / num2).toFixed(2)); break;
  }

  document.getElementById("botao-proxima").style.display = "none";
  document.getElementById("pergunta").textContent = `Quanto é ${textoPergunta}?`;
  document.getElementById("mensagem").textContent = "";
  gerarOpcoes(respostaCorreta);
}

function gerarOpcoes(correta) {
  const divRespostas = document.getElementById("respostas");
  divRespostas.innerHTML = "";

  let opcoes = [correta];
  while (opcoes.length < 4) {
    let falsa = parseFloat((correta + Math.floor(Math.random() * 10) - 5).toFixed(2));
    if (!opcoes.includes(falsa)) opcoes.push(falsa);
  }

  opcoes = opcoes.sort(() => Math.random() - 0.5);

  opcoes.forEach(opcao => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.onclick = () => verificarResposta(opcao, botao);
    divRespostas.appendChild(botao);
  });
}

function verificarResposta(selecionada, botaoClicado) {
  const mensagem = document.getElementById("mensagem");
  const divRespostas = document.getElementById("respostas");
  const botaoProxima = document.getElementById("botao-proxima");

  const todosBotoes = divRespostas.querySelectorAll("button");
  todosBotoes.forEach(btn => btn.disabled = true);

  if (selecionada === respostaCorreta) {
    mensagem.textContent = "✔️ Correto!";
    mensagem.className = "correct";
    botaoClicado.classList.add("botao-correto");
    mostrarIconeFeedback("✔️", botaoClicado);
    botaoProxima.style.display = "block";
  } else {
    vidas--;
    atualizarVidas();

    mensagem.textContent = `❌ Errado! A resposta certa era ${respostaCorreta}.`;
    mensagem.className = "incorrect";
    botaoClicado.classList.add("botao-incorreto");
    mostrarIconeFeedback("❌", botaoClicado);

    // Destaca a alternativa correta
    todosBotoes.forEach(btn => {
      if (parseFloat(btn.textContent) === respostaCorreta) {
        btn.classList.add("botao-correto");
        mostrarIconeFeedback("✔️", btn);
      }
    });

    if (vidas <= 0) {
      mensagem.textContent += " Fim de jogo.";
      botaoProxima.style.display = "none";
      mostrarBotaoReiniciar();
    } else {
      botaoProxima.style.display = "block";
    }
  }
}

function mostrarIconeFeedback(simbolo, botao) {
  const icone = document.createElement("span");
  icone.textContent = simbolo;
  icone.className = "feedback-icon";
  botao.appendChild(icone);

  setTimeout(() => {
    if (icone) icone.remove();
  }, 2000);
}

function atualizarVidas() {
  const divVidas = document.getElementById("vidas");
  divVidas.textContent = "❤️".repeat(vidas);
}

function mostrarBotaoReiniciar() {
  const botaoReiniciar = document.createElement("button");
  botaoReiniciar.textContent = "Tentar novamente";
  botaoReiniciar.className = "botao-reiniciar";
  botaoReiniciar.style.backgroundColor = "#2196F3";
  botaoReiniciar.style.color = "white";
  botaoReiniciar.style.border = "none";
  botaoReiniciar.style.padding = "12px 20px";
  botaoReiniciar.style.borderRadius = "8px";
  botaoReiniciar.style.cursor = "pointer";
  botaoReiniciar.style.fontSize = "16px";
  botaoReiniciar.style.marginTop = "20px";
  botaoReiniciar.onclick = reiniciarJogo;

  document.querySelector(".quiz-container").appendChild(botaoReiniciar);
}

function reiniciarJogo() {
  vidas = 3;
  atualizarVidas();
  document.getElementById("mensagem").textContent = "";
  document.getElementById("respostas").innerHTML = "";
  document.getElementById("botao-proxima").style.display = "none";

  const botaoReiniciar = document.querySelector(".quiz-container button:last-child");
  if (botaoReiniciar && botaoReiniciar.textContent === "Tentar novamente") {
    botaoReiniciar.remove();
  }

  gerarPergunta();
}

// Inicialização
document.getElementById("botao-proxima").style.display = "none";
document.getElementById("botao-proxima").onclick = gerarPergunta;
atualizarVidas();
gerarPergunta();
