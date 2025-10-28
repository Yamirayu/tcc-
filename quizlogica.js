const telaInicial = document.getElementById("tela-inicial");
const btnIniciar = document.getElementById("btn-iniciar");
const quizContainer = document.getElementById("quiz-container");
const perguntas = [
    {
      pergunta: "Qual estrutura permite repetir um bloco de código enquanto uma condição for verdadeira?",
      opcoes: ["break", "if", "switch", "while"],
      resposta: 3,
      explicacao: "O 'while' é uma estrutura de repetição que continua executando enquanto a condição for verdadeira."
    },
    {
      pergunta: "Qual é a função principal de um algoritmo?",
      opcoes: ["Executar comandos simultâneos", "Resolver um problema", "Criar interfaces gráficas", "Armazenar dados"],
      resposta: 1,
      explicacao: "Algoritmos são sequências de passos para resolver problemas ou realizar tarefas específicas."
    },
    {
      pergunta: "Qual o resultado lógico de 'true AND false'?",
      opcoes: ["true", "null", "undefined", "false"],
      resposta: 3,
      explicacao: "Na lógica booleana, 'AND' só retorna true se ambos os valores forem true. Aqui, retorna false."
    },
    {
      pergunta: "Qual operador lógico retorna verdadeiro apenas se ambos os operandos forem verdadeiros?",
      opcoes: ["AND", "OR", "NOT", "XOR"],
      resposta: 0,
      explicacao: "O operador 'AND' exige que ambos os lados sejam verdadeiros para retornar true."
    },
    {
      pergunta: "Qual é o resultado da expressão 'not (true or false)'?",
      opcoes: ["false", "null", "true", "undefined"],
      resposta: 0,
      explicacao: "'true or false' resulta em true. O 'not' inverte para false."
    },
    {
      pergunta: "Qual estrutura de dados segue o princípio FIFO?",
      opcoes: ["Hash", "Pilha", "Árvore", "Fila"],
      resposta: 3,
      explicacao: "Fila (Queue) segue o princípio FIFO: o primeiro a entrar é o primeiro a sair."
    },
    {
      pergunta: "Qual estrutura de dados segue o princípio LIFO?",
      opcoes: ["Fila", "Pilha", "Árvore", "Hash"],
      resposta: 1,
      explicacao: "Pilha (Stack) segue o princípio LIFO: o último a entrar é o primeiro a sair."
    },
    {
      pergunta: "Qual operador representa a disjunção lógica?",
      opcoes: ["AND", "OR", "NOT", "=="],
      resposta: 1,
      explicacao: "A disjunção lógica é representada por 'OR', que retorna true se pelo menos um valor for true."
    },
    {
      pergunta: "Qual é o valor da expressão '(5 > 3) AND (2 < 1)'?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 1,
      explicacao: "A primeira parte é true, a segunda é false. 'AND' exige ambas como true, então retorna false."
    },
    {
      pergunta: "Qual é a saída da expressão '(3 == 3) OR (4 < 2)'?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 0,
      explicacao: "A primeira parte é true, a segunda é false. 'OR' retorna true se pelo menos uma for true."
    },
    {
      pergunta: "Qual estrutura de controle é usada para tomar decisões com base em condições?",
      opcoes: ["if", "while", "for", "break"],
      resposta: 0,
      explicacao: "O 'if' permite executar blocos de código com base em condições lógicas."
    },
    {
      pergunta: "Qual operador lógico inverte o valor de uma expressão booleana?",
      opcoes: ["AND", "OR", "NOT", "=="],
      resposta: 2,
      explicacao: "O operador 'NOT' inverte o valor lógico: true vira false e vice-versa."
    },
    {
      pergunta: "Qual é o valor da expressão '(true OR false) AND false'?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 1,
      explicacao: "'true OR false' é true. 'true AND false' é false."
    },
    {
      pergunta: "Qual é o resultado de '!(false AND true)'?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 0,
      explicacao: "'false AND true' é false. O '!' inverte para true."
    },
    {
      pergunta: "Qual estrutura de repetição é usada quando sabemos o número de vezes que o bloco deve ser executado?",
      opcoes: ["while", "for", "if", "switch"],
      resposta: 1,
      explicacao: "O 'for' é ideal quando o número de repetições é conhecido."
    },
    {
      pergunta: "Qual é o valor da expressão '(5 != 3) AND (2 == 2)'?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 0,
      explicacao: "Ambas as comparações são verdadeiras. 'AND' retorna true."
    },
    {
      pergunta: "Qual é o valor da expressão '(4 > 2) OR (1 > 3)'?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 0,
      explicacao: "A primeira é true, a segunda é false. 'OR' retorna true."
    },
    {
      pergunta: "Qual é o valor da expressão '(5 < 3) AND (2 > 1)'?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 1,
      explicacao: "A primeira é false, a segunda é true. 'AND' exige ambas como true, então retorna false."
    },
    {
      pergunta: "Qual é o valor da expressão 'true XOR false'?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 0,
      explicacao: "XOR retorna true se os valores forem diferentes."
    },
    {
      pergunta: "Qual é o valor da expressão 'true XOR true'?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 1,
      explicacao: "XOR retorna false se os valores forem iguais."
    },
    {
      pergunta: "Qual é o valor da expressão lógica: (true AND true) OR false?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 0,
      explicacao: "'true AND true' é true. 'true OR false' continua sendo true."
    },
    {
      pergunta: "Qual operador lógico retorna verdadeiro apenas se os operandos forem diferentes?",
      opcoes: ["AND", "OR", "NOT", "XOR"],
      resposta: 3,
      explicacao: "XOR (ou exclusivo) retorna true apenas quando os valores são diferentes."
    },
    {
      pergunta: "Qual é o resultado da expressão: !(true AND false) OR (false OR true)?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 0,
      explicacao: "'true AND false' é false, então '!' vira true. 'false OR true' é true. 'true OR true' = true."
    },
    {
      pergunta: "Qual estrutura de controle permite múltiplas verificações de valor em uma única variável?",
      opcoes: ["if", "while", "switch", "for"],
      resposta: 2,
      explicacao: "O 'switch' permite testar vários casos de uma mesma variável."
    },
    {
      pergunta: "Qual é o valor da expressão: (5 > 2) AND !(3 == 3)?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 1,
      explicacao: "5 > 2 é true, mas !(3 == 3) é false. 'true AND false' = false."
    },
    {
      pergunta: "Qual estrutura lógica representa uma escolha entre dois caminhos?",
      opcoes: ["loop", "condicional", "sequência", "repetição"],
      resposta: 1,
      explicacao: "A condicional permite tomar decisões entre dois ou mais caminhos lógicos."
    },
    {
      pergunta: "Qual é o valor da expressão: (false OR false) AND true?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 1,
      explicacao: "'false OR false' é false. 'false AND true' continua sendo false."
    },
    {
      pergunta: "Qual operador lógico é usado para negar uma condição?",
      opcoes: ["AND", "OR", "NOT", "=="],
      resposta: 2,
      explicacao: "O operador 'NOT' inverte o valor lógico da condição."
    },
    {
      pergunta: "Qual é o valor da expressão: !(false OR false)?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 0,
      explicacao: "'false OR false' é false. O '!' inverte para true."
    },
    {
      pergunta: "Qual é o valor da expressão: (true AND true) AND (false OR true)?",
      opcoes: ["true", "false", "undefined", "null"],
      resposta: 0,
      explicacao: "Todas as partes da expressão resultam em true, então o resultado final é true."
    }
    
  ];

  quizContainer.style.display = "none";

btnIniciar.addEventListener("click", () => {
  telaInicial.style.display = "none";
  quizContainer.style.display = "block";
  carregarPergunta();
});


  function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  let todasPerguntas = embaralhar(perguntas); // embaralha todas
  let perguntasRodada = todasPerguntas.slice(0, 10); // pega as 10 primeiras
  let indiceAtual = 0;
  let acertos = 0;
  let respondeu = false;
  
  const perguntaEl = document.getElementById("quiz-pergunta");
  const opcoesEl = document.getElementById("quiz-opcoes");
  const proximoBtn = document.getElementById("quiz-proximo");
  const dicaBtn = document.getElementById("quiz-dica");
  const explicacaoEl = document.getElementById("quiz-explicacao");
  
  function carregarPergunta() {
    const atual = perguntasRodada[indiceAtual];
    perguntaEl.textContent = atual.pergunta;
    opcoesEl.innerHTML = "";
    explicacaoEl.textContent = "";
    explicacaoEl.style.display = "none";
    respondeu = false;
    dicaBtn.disabled = false;
  
    atual.opcoes.forEach((opcao, i) => {
      const li = document.createElement("li");
      li.textContent = opcao;
      li.onclick = () => verificarResposta(i);
      opcoesEl.appendChild(li);
    });
  
    proximoBtn.disabled = true;
  }
  
  function verificarResposta(indiceSelecionado) {
    const atual = perguntasRodada[indiceAtual];
    const correta = atual.resposta;
    const opcoes = opcoesEl.querySelectorAll("li");
  
    opcoes.forEach((li, i) => {
      li.style.backgroundColor = i === correta ? "#00cc66" : "#ff4d4d";
      li.style.color = "#fff";
      li.style.pointerEvents = "none";
    });
  
    if (indiceSelecionado === correta) acertos++;
    respondeu = true;
    proximoBtn.disabled = false;
  }
  
  dicaBtn.addEventListener("click", () => {
    const atual = perguntasRodada[indiceAtual];
    explicacaoEl.textContent = atual.explicacao;
    explicacaoEl.style.display = "block";
  });
  
  proximoBtn.addEventListener("click", () => {
    indiceAtual++;
    if (indiceAtual < perguntasRodada.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  });
  
  function mostrarResultado() {
    perguntaEl.textContent = "Quiz finalizado!";
    opcoesEl.innerHTML = `<li>Você acertou ${acertos} de ${perguntasRodada.length} questões.</li>`;
    explicacaoEl.textContent = "";
    explicacaoEl.style.display = "none";
    proximoBtn.textContent = "Nova Rodada";
    proximoBtn.style.display = "inline-block";
    proximoBtn.disabled = false;
    dicaBtn.style.display = "none";
  
    proximoBtn.onclick = () => {
      // Remove perguntas já usadas
      todasPerguntas = todasPerguntas.filter(p => !perguntasRodada.includes(p));
  
      if (todasPerguntas.length >= 10) {
        perguntasRodada = embaralhar(todasPerguntas).slice(0, 10);
        indiceAtual = 0;
        acertos = 0;
        dicaBtn.style.display = "inline-block";
        proximoBtn.textContent = "Próxima Pergunta";
        proximoBtn.onclick = null; // remove o novo comportamento
        carregarPergunta();
      } else {
        perguntaEl.textContent = "Todas as perguntas foram usadas!";
        opcoesEl.innerHTML = "";
        proximoBtn.style.display = "none";
      }
    };
  }
  
  carregarPergunta();
  