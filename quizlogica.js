const perguntas = [
    {
      pergunta: "Qual estrutura de controle permite repetir um bloco de código enquanto uma condição for verdadeira?",
      opcoes: ["break", "if", "switch", "while"],
      resposta: 3
    },
    {
      pergunta: "Qual é a função principal de um algoritmo?",
      opcoes: ["Executar comandos simultâneos", "Resolver um problema", "Criar interfaces gráficas", "Armazenar dados"],
      resposta: 1
    },
    {
      pergunta: "Em lógica booleana, qual é o resultado de 'true AND false'?",
      opcoes: ["true", "null", "undefined", "false"],
      resposta: 3
    },
    {
      pergunta: "Qual linguagem é mais usada para desenvolvimento web front-end?",
      opcoes: ["JavaScript", "C++", "Java", "Python"],
      resposta: 0
    },
    {
      pergunta: "Qual é a saída do código: `print(2 ** 3)` em Python?",
      opcoes: ["8", "6", "9", "5"],
      resposta: 0
    },
    {
      pergunta: "Qual estrutura de dados armazena elementos em pares chave-valor?",
      opcoes: ["Conjunto", "Tupla", "Lista", "Dicionário"],
      resposta: 3
    },
    {
      pergunta: "Qual é o objetivo da normalização em banco de dados?",
      opcoes: ["Evitar duplicidade", "Aumentar a redundância", "Criar tabelas temporárias", "Melhorar a performance"],
      resposta: 0
    },
    {
      pergunta: "Qual comando SQL é usado para inserir dados em uma tabela?",
      opcoes: ["SELECT", "INSERT", "UPDATE", "DELETE"],
      resposta: 1
    },
    {
      pergunta: "O que significa IDE no contexto de programação?",
      opcoes: ["Editor de Código Inteligente", "Ambiente de Desenvolvimento Integrado", "Sistema de Execução de Dados", "Interface de Desenvolvimento Estático"],
      resposta: 1
    },
    {
      pergunta: "Qual é a função do operador '!=' em programação?",
      opcoes: ["Atribuição", "Comparação de diferença", "Comparação de igualdade", "Negação"],
      resposta: 1
    },
    {
      pergunta: "Qual dos seguintes é um tipo de loop em JavaScript?",
      opcoes: ["for", "repeat", "cycle", "loop"],
      resposta: 0
    },
    {
      pergunta: "Qual é a principal vantagem de usar funções em programação?",
      opcoes: ["Aumentam a complexidade", "Eliminam erros", "Reduzem a velocidade", "Promovem reutilização de código"],
      resposta: 3
    },
    {
      pergunta: "Qual é o resultado da expressão lógica: `not (true or false)`?",
      opcoes: ["false", "null", "true", "undefined"],
      resposta: 0
    },
    {
      pergunta: "Qual dos seguintes é um paradigma de programação?",
      opcoes: ["Orientado a objetos", "Dinâmico", "Estático", "Modular"],
      resposta: 0
    },
    {
      pergunta: "Qual é a finalidade do comando 'return' em uma função?",
      opcoes: ["Executar um loop", "Mostrar erro", "Retornar um valor", "Encerrar o programa"],
      resposta: 2
    },
    {
      pergunta: "Qual é o nome do processo de encontrar e corrigir erros no código?",
      opcoes: ["Deploy", "Compilação", "Debug", "Build"],
      resposta: 2
    },
    {
      pergunta: "Qual estrutura de dados segue o princípio FIFO?",
      opcoes: ["Hash", "Pilha", "Árvore", "Fila"],
      resposta: 3
    },
    {
      pergunta: "Qual linguagem é conhecida por sua simplicidade e uso em ensino de lógica?",
      opcoes: ["Python", "Ruby", "Assembly", "C#"],
      resposta: 0
    },
    {
      pergunta: "Qual é a função de um compilador?",
      opcoes: ["Traduzir código para linguagem de máquina", "Executar código diretamente", "Editar arquivos", "Criar banco de dados"],
      resposta: 0
    },
    {
      pergunta: "Qual dos seguintes é um exemplo de linguagem de marcação?",
      opcoes: ["Java", "HTML", "C++", "Python"],
      resposta: 1
    }
  ];
  
  // Embaralha as perguntas
  function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  const perguntasEmbaralhadas = embaralhar(perguntas);
  
  let indiceAtual = 0;
  let acertos = 0;
  
  const perguntaEl = document.getElementById("quiz-pergunta");
  const opcoesEl = document.getElementById("quiz-opcoes");
  const proximoBtn = document.getElementById("quiz-proximo");
  
  function carregarPergunta() {
    const atual = perguntasEmbaralhadas[indiceAtual];
    perguntaEl.textContent = atual.pergunta;
    opcoesEl.innerHTML = "";
  
    atual.opcoes.forEach((opcao, i) => {
      const li = document.createElement("li");
      li.textContent = opcao;
      li.onclick = () => verificarResposta(i, li);
      opcoesEl.appendChild(li);
    });
  
    proximoBtn.disabled = true;
  }
  
  function verificarResposta(indiceSelecionado, elemento) {
    const correta = perguntasEmbaralhadas[indiceAtual].resposta;
    const opcoes = opcoesEl.querySelectorAll("li");
  
    opcoes.forEach((li, i) => {
      li.style.backgroundColor = i === correta ? "#00cc66" : "#ff4d4d";
      li.style.color = "#fff";
      li.style.pointerEvents = "none";
    });
  
    if (indiceSelecionado === correta) acertos++;
    proximoBtn.disabled = false;
  }
  
  proximoBtn.addEventListener("click", () => {
    indiceAtual++;
    if (indiceAtual < perguntasEmbaralhadas.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  });
  
  function mostrarResultado() {
    perguntaEl.textContent = "Quiz finalizado!";
    opcoesEl.innerHTML = `<li>Você acertou ${acertos} de ${perguntasEmbaralhadas.length} questões.</li>`;
    proximoBtn.style.display = "none";
  }
  
  carregarPergunta();
  
  