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
const imgJulia = document.querySelector('.personagem-julia');

btnSim.style.display = "none";
btnNao.style.display = "none";
btnIniciar.textContent = "Carregando dados...";

// FUNÇÃO PARA EMBARALHAR ARRAYS (Fisher-Yates)
function embaralhar(array) {
    let currentIndex = array.length, randomIndex;
    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// MÉTODO DE CARREGAMENTO: XMLHttpRequest 
function carregarDadosXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "dados.json", true); 
    
    xhr.onload = function() {
        if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
            try {
                dados = JSON.parse(xhr.responseText);
                if (dados.length === 0) {
                    throw new Error("O arquivo dados.json está vazio.");
                }
                
                perguntas = Object.keys(dados[0]).filter(p => p !== "Nome");
                
                btnIniciar.textContent = "Iniciar";
                perguntaEl.textContent = `Clique em Iniciar para começar!`;
                
                // CONFIGURA A IMAGEM INICIAL Juliano1.png
                if (imgJulia) {
                    imgJulia.src = `Juliano1.png`;
                }
            } catch (e) {
                perguntaEl.textContent = `Erro: O arquivo dados.json está inválido ou vazio. Detalhe: ${e.message}`;
                btnIniciar.style.display = "none";
            }
        } else {
            perguntaEl.textContent = `🚨 Falha Crítica: Não foi possível ler 'dados.json'. Status: ${xhr.status}.`;
            btnIniciar.style.display = "none";
        }
    };
    
    xhr.onerror = function() {
        perguntaEl.textContent = "Erro de Rede/Acesso: Falha ao tentar carregar o 'dados.json'.";
        btnIniciar.style.display = "none";
    };
    
    xhr.send();
}

carregarDadosXHR(); 


// Mapeia perguntas para exibição
function formatarPergunta(chave) {
    const mapa = {
        "É da cor amarela": "Esse item é da cor amarela?",
        "É da cor azul": "Esse item é da cor azul?",
        "É da cor verde": "Esse item é da cor verde?",
        "É da cor vermelha": "Esse item é da cor vermelha?",
        "É da cor rosa": "Esse item é da cor rosa?",
        "É da cor preta": "Esse item é da cor preta?",
        "É da cor branca": "Esse item é da cor branca?",
        "É da cor roxa": "Esse item é da cor roxa?",
        "É da cor cinza": "Esse item é da cor cinza?",
        "É um objeto eletrônico": "Esse item é um objeto eletrônico?",
        "É uma comida": "Esse item é uma comida?",
        "É um animal": "Esse item é um animal?",
        "É um vegetal": "Esse item é um vegetal?",
        "É um brinquedo": "Esse item é um brinquedo?",
        "É usado para vestir": "Esse item é usado para vestir?",
        "É usado em casa": "Esse item é usado em casa?",
        "É usado em cozinha": "Esse item é usado em cozinha?",
        "É um item de escola": "Esse item é um item de escola?"
    };
    return mapa[chave] || `Julinator: ${chave}?`;
}

// Inicia o jogo
btnIniciar.addEventListener("click", () => {
    if (dados.length === 0 || perguntas.length === 0) {
        perguntaEl.textContent = "Aguarde o carregamento dos dados.";
        return;
    }

    possiveis = [...dados];
    idxPergunta = 0;
    respostasDadas = 0;
    resultadoEl.textContent = "";
    
    // Embaralha as perguntas a cada novo jogo
    perguntas = embaralhar(perguntas);
    
    // Mantém a imagem Juliano1.png no início do jogo (antes da primeira resposta)
    if (imgJulia) {
        imgJulia.src = `Juliano1.png`;
        console.log("IMAGEM INICIAL: Juliano1.png"); // DEPURAR
    }
    
    perguntaEl.textContent = formatarPergunta(perguntas[idxPergunta]);
    btnIniciar.style.display = "none";
    btnSim.style.display = "inline-block";
    btnNao.style.display = "inline-block";
});

// Processa a resposta do usuário
function responder(resposta) {
    const valor = resposta === "sim" ? 1 : 0;
    const chavePerguntaAtual = perguntas[idxPergunta];
    
    if (!chavePerguntaAtual) {
         perguntaEl.textContent = "Erro: Acabaram as perguntas. Jogo finalizado.";
         finalizarJogo();
         return;
    }
    
    possiveis = possiveis.filter(p => p[chavePerguntaAtual] === valor);
    idxPergunta++;
    respostasDadas++;
    
    // === ALTERNA ALEATORIAMENTE ENTRE Juliano2.png e Juliano3.png ===
    if (imgJulia) {
        const proximaImg = Math.random() < 0.5 ? 2 : 3;
        const nomeArquivo = `Juliano${proximaImg}.png`; // Constrói o nome do arquivo
        imgJulia.src = nomeArquivo;
        
        console.log(`IMAGEM TROCADA (Resposta ${respostasDadas}): ${nomeArquivo}`); // DEPURAR
    }
    // =================================================================

    // 1. VERIFICA SE O JOGO JÁ TEM UM VENCEDOR CLARO (ACERTO IMEDIATO)
    if (possiveis.length === 1) {
        perguntaEl.textContent = "";
        resultadoEl.textContent = `Acredito que você pensou em: ${possiveis[0].Nome}. Acertei com ${respostasDadas} pergunta${respostasDadas > 1 ? 's' : ''}!`;
        finalizarJogo();
        return;
    }

    // 2. VERIFICA SE AS PERGUNTAS ACABARAM (TENTATIVA FORÇADA APÓS A 18ª PERGUNTA)
    if (idxPergunta >= perguntas.length) {
        perguntaEl.textContent = "";
        if (possiveis.length === 0) {
            const aleatorio = dados.length > 0 ? dados[Math.floor(Math.random() * dados.length)] : {Nome: "um item"};
            resultadoEl.textContent = `Não consegui identificar com precisão. Mas talvez seja o ${aleatorio.Nome}. Fiz ${respostasDadas} pergunta${respostasDadas > 1 ? 's' : ''}.`;
        } else {
            const escolha = possiveis[Math.floor(Math.random() * possiveis.length)];
            resultadoEl.textContent = `Chegamos ao fim das ${respostasDadas} perguntas. Minha melhor tentativa é: ${escolha.Nome}.`;
        }
        finalizarJogo();
        return;
    }

    // 3. CONTINUA PERGUNTANDO
    perguntaEl.textContent = formatarPergunta(perguntas[idxPergunta]);
}

// Função para centralizar a lógica de finalização do jogo
function finalizarJogo() {
    btnSim.style.display = "none";
    btnNao.style.display = "none";
    btnIniciar.textContent = "Jogar novamente";
    btnIniciar.style.display = "inline-block";
    
    // === RETORNA PARA A IMAGEM INICIAL Juliano1.png APÓS FIM DO JOGO ===
    if (imgJulia) {
        imgJulia.src = `Juliano1.png`; 
        console.log("IMAGEM FINAL: Juliano1.png"); // DEPURAR
    }
}

// Eventos dos botões
btnSim.addEventListener("click", () => responder("sim"));
btnNao.addEventListener("click", () => responder("não"));
