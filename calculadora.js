const etapas = [
    {
      titulo: "Etapa 1",
      explicacao: 'Crie uma <div> com o atributo id="calculadora" para representar a estrutura principal da calculadora. (Utilize aspas simples)',
      resposta: "<div id='calculadora'></div>"
    },
    {
      titulo: "Etapa 2",
      explicacao: 'Adicione um campo de entrada <input> do tipo "text" com id="display" para exibir os números digitados.',
      resposta: "<input type='text' id='display'>"
    },
    {
      titulo: "Etapa 3",
      explicacao: 'Crie um botão numérico usando a tag <button> com o número dentro, por exemplo: <button>1</button>.',
      resposta: "<button>1</button>"
    },
    {
      titulo: "Etapa 4",
      explicacao: 'Crie botões para as operações matemáticas, como <button>+</button> para adição.',
      resposta: "<button>+</button>"
    },
    {
      titulo: "Etapa 5",
      explicacao: 'Adicione um botão com o símbolo "=" usando a tag <button>, como <button>=</button>.',
      resposta: "<button>=</button>"
    },
    {
      titulo: "Etapa 6",
      explicacao: 'Crie um botão para limpar a calculadora com o texto "C", usando <button>C</button>.',
      resposta: "<button>C</button>"
    },
    {
      titulo: "Etapa 7",
      explicacao: 'No JavaScript, utilize o método addEventListener para detectar cliques nos botões da calculadora.',
      resposta: "addEventListener"
    },
    {
      titulo: "Etapa 8",
      explicacao: 'Use document.getElementById("display").value para acessar ou alterar o valor exibido no campo da calculadora.',
      resposta: "getElementById('display').value"
    }
  ];
  
  let etapaAtual = 0;
  let tentativas = 0;
  
  document.getElementById("btn-iniciar").addEventListener("click", () => {
    document.getElementById("explicacao").style.display = "none";
    document.getElementById("etapa").style.display = "block";
    carregarEtapa();
  });
  
  function carregarEtapa() {
    const etapa = etapas[etapaAtual];
    document.getElementById("titulo-etapa").innerText = etapa.titulo;
    document.getElementById("explicacao-etapa").innerText = etapa.explicacao;
    document.getElementById("codigoUsuario").value = "";
    document.getElementById("verificacao").innerText = "";
    document.getElementById("mostrarResposta").style.display = "none";
    tentativas = 0;
  }
  
  function verificarCodigo() {
    const entrada = document.getElementById("codigoUsuario").value.trim();
    const esperado = etapas[etapaAtual].resposta;
    if (entrada.includes(esperado)) {
      document.getElementById("verificacao").innerText = "✅ Correto!";
      document.getElementById("mostrarResposta").style.display = "none";
    } else {
      tentativas++;
      document.getElementById("verificacao").innerText = `❌ Tente novamente. (${tentativas}/4)`;
      if (tentativas >= 4) {
        document.getElementById("mostrarResposta").style.display = "inline";
      }
    }
  }
  
  function mostrarResposta() {
    document.getElementById("codigoUsuario").value = etapas[etapaAtual].resposta;
    document.getElementById("verificacao").innerText = "✅ Aqui está a resposta correta.";
  }
  
  function proximaEtapa() {
    etapaAtual++;
    if (etapaAtual < etapas.length) {
      carregarEtapa();
    } else {
      iniciarQuiz();
    }
  }
  
  function iniciarQuiz() {
    document.getElementById("etapa").style.display = "none";
    document.getElementById("quiz").style.display = "block";
  
    const perguntas = [
      {
        pergunta: "Qual tag usamos para criar a estrutura da calculadora?",
        opcoes: ["<div>", "<span>", "<section>", "<form>"],
        resposta: 0
      },
      {
        pergunta: "Qual elemento exibe os números digitados?",
        opcoes: ["<input>", "<textarea>", "<label>", "<p>"],
        resposta: 0
      },
      {
        pergunta: "Como adicionamos um botão em HTML?",
        opcoes: ["<btn>", "<button>", "<input type='btn'>", "<click>"],
        resposta: 1
      },
      {
        pergunta: "Qual operador representa multiplicação em JavaScript?",
        opcoes: ["x", "*", "×", "mult"],
        resposta: 1
      },
      {
        pergunta: "Como capturamos o clique de um botão?",
        opcoes: ["addEventListener", "onClick", "clickHandler", "buttonClick"],
        resposta: 0
      },
      {
        pergunta: "Como acessamos o valor do display?",
        opcoes: ["display.value", "getElementById('display').value", "input.value", "screen.text"],
        resposta: 1
      },
      {
        pergunta: "Qual botão usamos para limpar a calculadora?",
        opcoes: ["C", "AC", "DEL", "CLR"],
        resposta: 0
      },
      {
        pergunta: "Qual linguagem usamos para lógica da calculadora?",
        opcoes: ["HTML", "CSS", "JavaScript", "Python"],
        resposta: 2
      }
    ];
  
    let perguntaAtual = 0;
    let acertos = 0;
  
    function mostrarPergunta() {
    console.log("Renderizando pergunta:", perguntas[perguntaAtual].pergunta);
      const p = perguntas[perguntaAtual];
      let html = `<div class="pergunta"><h2>Pergunta ${perguntaAtual + 1}</h2><p>${p.pergunta}</p><ul>`;
      p.opcoes.forEach((op, i) => {
        html += `
          <li>
            <label>
              <input type="radio" name="q${perguntaAtual}" value="${i}"> ${op}
            </label>
          </li>`;
      });
      html += `</ul><button onclick="verificarResposta()">Enviar</button></div>`;
      document.getElementById("quiz").innerHTML = html;
    }
  
    window.verificarResposta = function () {
        const selecionado = document.querySelector(`input[name="q${perguntaAtual}"]:checked`);
        if (!selecionado) {
          alert("Selecione uma opção antes de continuar.");
          return;
        }
        if (parseInt(selecionado.value) === perguntas[perguntaAtual].resposta) {
          acertos++;
        }
        perguntaAtual++;
        if (perguntaAtual < perguntas.length) {
          mostrarPergunta();
        } else {
          mostrarResultadoFinal();
        }
      };
      
  
    function mostrarResultadoFinal() {
      document.getElementById("quiz").style.display = "none";
      document.getElementById("resultado-final").style.display = "block";
      document.getElementById("resultado-final").innerHTML = `
        <h2>Resultado Final</h2>
        <p>Você acertou ${acertos} de ${perguntas.length} perguntas.</p>
        <img src="${acertos < 5 ? 'ruim.jpg' : acertos <= 6 ? 'medio.jpg' : 'otimo.jpg'}" alt="Resultado">
      `;
    }
  
    mostrarPergunta();
  }
  