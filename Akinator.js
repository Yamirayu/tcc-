let dados = [];
let perguntas = [];
let possiveis = [];
let idxPergunta = 0;
let respostasDadas = 0;
const perguntaEl = document.getElementById("pergunta");
const resultadoEl = document.getElementById("resultado");
const btnSim = document.getElementById("sim");
const btnNao = document.getElementById("nao");
const btnIniciar = document.getElementById("iniciar");
const imgJuliano = document.getElementById("personagemJuliano");
let idxImagem = 1; // Começa com Juliano1.png

// Define imagem inicial logo ao carregar
imgJuliano.src = `Juliano${idxImagem}.png`;

// Carrega os dados do arquivo JSON
fetch("dados.json")
    .then(response => response.json())
    .then(json => {
        dados = json;
        perguntas = Object.keys(dados[0]).filter(p => p !== "Nome");
        btnSim.style.display = "none";
        btnNao.style.display = "none";
        btnIniciar.textContent = "Iniciar";
    });

// Mapeia perguntas técnicas para exibição
function formatarPergunta(chave) {
    const mapa = {
        "É hardware": "Esse item é um hardware?",
        "É software": "Esse item é um software?",
        "É acessado pela internet": "Esse item é acessado pela internet?",
        "É utilizado por empresas": "Esse item é utilizado por empresas?",
        "É utilizado por desenvolvedores": "Esse item é utilizado por desenvolvedores?",
        "Serve para comunicação": "Esse item serve para comunicação?",
        "Serve para armazenamento": "Esse item serve para armazenamento?",
        "Serve para programação": "Esse item serve para programação?",
        "É portátil": "Esse item é portátil?",
        "É código aberto": "Esse item é open source?",
        "Foi lançado antes de 2010": "Esse item foi lançado antes de 2010?",
        "É uma rede social": "Esse item é uma rede social?",
        "É uma linguagem de programação": "Esse item é uma linguagem de programação?",
        "É uma marca conhecida": "Esse item é de uma marca conhecida?",
        "É utilizado na educação": "Esse item é utilizado na educação?",
        "É utilizado em jogos": "Esse item é utilizado em jogos?",
        "Faz parte da IoT": "Esse item faz parte da Internet das Coisas?",
        "É um dispositivo eletrônico": "Esse item é um dispositivo eletrônico?"
    };
    return mapa[chave] || `Julinator: ${chave}?`;
}

// Inicia o jogo
btnIniciar.addEventListener("click", () => {
    possiveis = [...dados];
    idxPergunta = 0;
    respostasDadas = 0;
    idxImagem = 1;
    imgJuliano.src = `Juliano${idxImagem}.png`;
    resultadoEl.textContent = "";
    perguntaEl.textContent = formatarPergunta(perguntas[idxPergunta]);
    btnIniciar.style.display = "none";
    btnSim.style.display = "inline-block";
    btnNao.style.display = "inline-block";
});

// Processa a resposta do usuário
function responder(resposta) {
    const valor = resposta === "sim" ? 1 : 0;
    possiveis = possiveis.filter(p => p[perguntas[idxPergunta]] === valor);
    idxPergunta++;
    respostasDadas++;
    idxImagem = (idxImagem % 3) + 1;
    imgJuliano.src = `Juliano${idxImagem}.png`;

    if (possiveis.length === 1) {
        perguntaEl.textContent = "";
        resultadoEl.textContent = `Acredito que você pensou em: ${possiveis[0].Nome}. Acertei com ${respostasDadas} pergunta${respostasDadas > 1 ? 's' : ''}!`;
        btnSim.style.display = "none";
        btnNao.style.display = "none";
        btnIniciar.textContent = "Jogar novamente";
        btnIniciar.style.display = "inline-block";
        return;
    }

    if (possiveis.length === 0) {
        perguntaEl.textContent = "";
        const aleatorio = dados[Math.floor(Math.random() * dados.length)];
        resultadoEl.textContent = `Não consegui identificar com precisão. Mas talvez seja o ${aleatorio.Nome}. Fiz ${respostasDadas} pergunta${respostasDadas > 1 ? 's' : ''}.`;
        btnSim.style.display = "none";
        btnNao.style.display = "none";
        btnIniciar.textContent = "Jogar novamente";
        btnIniciar.style.display = "inline-block";
        return;
    }

    if (idxPergunta < perguntas.length) {
        perguntaEl.textContent = formatarPergunta(perguntas[idxPergunta]);
    } else {
        perguntaEl.textContent = "";
        const escolha = possiveis[Math.floor(Math.random() * possiveis.length)];
        resultadoEl.textContent = `Ainda não tenho certeza... mas pode ser: ${escolha.Nome}. Fiz ${respostasDadas} pergunta${respostasDadas > 1 ? 's' : ''}.`;
        btnSim.style.display = "none";
        btnNao.style.display = "none";
        btnIniciar.textContent = "Jogar novamente";
        btnIniciar.style.display = "inline-block";
    }
}

// Eventos dos botões
btnSim.addEventListener("click", () => responder("sim"));
btnNao.addEventListener("click", () => responder("não"));
