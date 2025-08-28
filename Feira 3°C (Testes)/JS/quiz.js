const perguntas = [
    {
      pergunta: "Qual é a capital do Brasil?",
      opcoes: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
      resposta: "Brasília"
    },
    {
      pergunta: "Quantos dias tem uma semana?",
      opcoes: ["5", "6", "7", "8"],
      resposta: "7"
    },
    {
      pergunta: "Quem pintou a Mona Lisa?",
      opcoes: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
      resposta: "Da Vinci"
    },
    {
      pergunta: "Qual planeta é conhecido como o planeta vermelho?",
      opcoes: ["Júpiter", "Saturno", "Marte", "Vênus"],
      resposta: "Marte"
    },
    {
      pergunta: "Em que ano o homem pisou na Lua pela primeira vez?",
      opcoes: ["1965", "1969", "1972", "1959"],
      resposta: "1969"
    },
    {
      pergunta: "Qual animal é conhecido como o rei da selva?",
      opcoes: ["Tigre", "Elefante", "Leão", "Pantera"],
      resposta: "Leão"
    },
    {
      pergunta: "Quantas letras tem o alfabeto português?",
      opcoes: ["26", "28", "24", "23"],
      resposta: "26"
    },
    {
      pergunta: "Qual é o maior oceano do mundo?",
      opcoes: ["Atlântico", "Índico", "Ártico", "Pacífico"],
      resposta: "Pacífico"
    },
    {
      pergunta: "O que é H2O?",
      opcoes: ["Ácido", "Água", "Oxigênio", "Hidrogênio"],
      resposta: "Água"
    },
    {
      pergunta: "Qual destes países não faz parte da América do Sul?",
      opcoes: ["Argentina", "Chile", "México", "Colômbia"],
      resposta: "México"
    }
  ]
  
  let vidas = 5
  let acertos = 0
  let erros = 0
  let indice = 0
  let inicioTempo = Date.now()
  
  function atualizarVidas() {
    document.getElementById("vidas").textContent = "💗".repeat(vidas)
  }
  
  function carregarPergunta() {
    const perguntaAtual = perguntas[indice]
    document.getElementById("proxima").style.display = "none"
    document.getElementById("pergunta").textContent = perguntaAtual.pergunta
    const divOpcoes = document.getElementById("opcoes")
    divOpcoes.innerHTML = ""
    document.getElementById("quiz").classList.remove("tremor")
  
    perguntaAtual.opcoes.forEach(opcao => {
      const botao = document.createElement("button")
      botao.textContent = opcao
      botao.onclick = () => verificarResposta(botao, opcao)
      divOpcoes.appendChild(botao)
    })
  
    atualizarVidas()
  }
  
  function verificarResposta(botaoSelecionado, opcaoSelecionada) {
    const respostaCorreta = perguntas[indice].resposta
  
    if (opcaoSelecionada === respostaCorreta) {
      acertos++
      botaoSelecionado.style.backgroundColor = "#00c853"
      botaoSelecionado.disabled = true
  
      const botoes = document.querySelectorAll("#opcoes button")
      botoes.forEach(btn => btn.disabled = true)
  
      document.getElementById("proxima").style.display = "inline-block"
    } else {
      erros++
      vidas--
      botaoSelecionado.classList.add("erro")
      botaoSelecionado.disabled = true
      document.getElementById("quiz").classList.add("tremor")
      atualizarVidas()
  
      if (vidas === 0) {
        const botoes = document.querySelectorAll("#opcoes button")
        botoes.forEach(btn => {
          btn.disabled = true
          if (btn.textContent === respostaCorreta) {
            btn.style.backgroundColor = "#00c853"
          }
        })
        setTimeout(() => finalizarJogo(false), 800)
      }
    }
  }
  
  document.getElementById("proxima").onclick = () => {
    indice++
    if (indice < perguntas.length) {
      carregarPergunta()
    } else {
      finalizarJogo(true)
    }
  }
  
  function finalizarJogo(vitoria) {
    const tempoFinal = Math.floor((Date.now() - inicioTempo) / 1000)
    document.getElementById("quiz").style.display = "none"
    const resultadoDiv = document.getElementById("resultado")
    resultadoDiv.style.display = "block"
  
    const mensagem = vitoria
      ? "<h2>Parabéns, você venceu! 🎉</h2>"
      : "<h2>Você perdeu! 😢</h2>"
  
    resultadoDiv.innerHTML = `
      ${mensagem}
      <p>Acertos: ${acertos}</p>
      <p>Erros: ${erros}</p>
      <p>Tempo: ${tempoFinal}s</p>
      <button onclick="recomecarJogo()" id="recomecar">🔁 Recomeçar</button>
    `
  }
  
  function recomecarJogo() {
    vidas = 5
    acertos = 0
    erros = 0
    indice = 0
    inicioTempo = Date.now()
  
    document.getElementById("resultado").style.display = "none"
    document.getElementById("quiz").style.display = "block"
    carregarPergunta()
  }
  
  carregarPergunta()
  
  setInterval(() => {
    const tempo = Math.floor((Date.now() - inicioTempo) / 1000)
    document.getElementById("tempo").textContent = `⏱️ ${tempo}s`
  }, 1000)
  