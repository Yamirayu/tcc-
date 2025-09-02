document.addEventListener("DOMContentLoaded", () => {
  const grade = document.querySelector(".grade");
  const pontuacaoElemento = document.getElementById("pontuacao");
  const resultadoElemento = document.getElementById("resultado");
  let quadrados = [];
  const largura = 4;
  let pontuacao = 0;

  function criarTabuleiro() {
    for (let i = 0; i < largura * largura; i++) {
      const quadrado = document.createElement("div");
      quadrado.innerHTML = 0;
      quadrado.classList.add("quadrado");
      grade.appendChild(quadrado);
      quadrados.push(quadrado);
    }
    gerarNumero();
    gerarNumero();
  }

  function gerarNumero() {
    const numeroAleatorio = Math.floor(Math.random() * quadrados.length);
    if (quadrados[numeroAleatorio].innerHTML == 0) {
      quadrados[numeroAleatorio].innerHTML = 2;
      verificarDerrota();
    } else {
      gerarNumero();
    }
  }

  function moverDireita() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        const linha = [
          parseInt(quadrados[i].innerHTML),
          parseInt(quadrados[i + 1].innerHTML),
          parseInt(quadrados[i + 2].innerHTML),
          parseInt(quadrados[i + 3].innerHTML),
        ];
        const filtrada = linha.filter((num) => num);
        const faltando = 4 - filtrada.length;
        const zeros = Array(faltando).fill(0);
        const novaLinha = zeros.concat(filtrada);

        quadrados[i].innerHTML = novaLinha[0];
        quadrados[i + 1].innerHTML = novaLinha[1];
        quadrados[i + 2].innerHTML = novaLinha[2];
        quadrados[i + 3].innerHTML = novaLinha[3];
      }
    }
  }

  function moverEsquerda() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        const linha = [
          parseInt(quadrados[i].innerHTML),
          parseInt(quadrados[i + 1].innerHTML),
          parseInt(quadrados[i + 2].innerHTML),
          parseInt(quadrados[i + 3].innerHTML),
        ];
        const filtrada = linha.filter((num) => num);
        const faltando = 4 - filtrada.length;
        const zeros = Array(faltando).fill(0);
        const novaLinha = filtrada.concat(zeros);

        quadrados[i].innerHTML = novaLinha[0];
        quadrados[i + 1].innerHTML = novaLinha[1];
        quadrados[i + 2].innerHTML = novaLinha[2];
        quadrados[i + 3].innerHTML = novaLinha[3];
      }
    }
  }

  function moverCima() {
    for (let i = 0; i < 4; i++) {
      const coluna = [
        parseInt(quadrados[i].innerHTML),
        parseInt(quadrados[i + largura].innerHTML),
        parseInt(quadrados[i + largura * 2].innerHTML),
        parseInt(quadrados[i + largura * 3].innerHTML),
      ];
      const filtrada = coluna.filter((num) => num);
      const faltando = 4 - filtrada.length;
      const zeros = Array(faltando).fill(0);
      const novaColuna = filtrada.concat(zeros);

      quadrados[i].innerHTML = novaColuna[0];
      quadrados[i + largura].innerHTML = novaColuna[1];
      quadrados[i + largura * 2].innerHTML = novaColuna[2];
      quadrados[i + largura * 3].innerHTML = novaColuna[3];
    }
  }

  function moverBaixo() {
    for (let i = 0; i < 4; i++) {
      const coluna = [
        parseInt(quadrados[i].innerHTML),
        parseInt(quadrados[i + largura].innerHTML),
        parseInt(quadrados[i + largura * 2].innerHTML),
        parseInt(quadrados[i + largura * 3].innerHTML),
      ];
      const filtrada = coluna.filter((num) => num);
      const faltando = 4 - filtrada.length;
      const zeros = Array(faltando).fill(0);
      const novaColuna = zeros.concat(filtrada);

      quadrados[i].innerHTML = novaColuna[0];
      quadrados[i + largura].innerHTML = novaColuna[1];
      quadrados[i + largura * 2].innerHTML = novaColuna[2];
      quadrados[i + largura * 3].innerHTML = novaColuna[3];
    }
  }

  function combinarLinha() {
    for (let i = 0; i < 15; i++) {
      if (quadrados[i].innerHTML === quadrados[i + 1].innerHTML) {
        const soma = parseInt(quadrados[i].innerHTML) + parseInt(quadrados[i + 1].innerHTML);
        quadrados[i].innerHTML = soma;
        quadrados[i + 1].innerHTML = 0;
        pontuacao += soma;
        pontuacaoElemento.innerHTML = pontuacao;
      }
    }
    verificarVitoria();
  }

  function combinarColuna() {
    for (let i = 0; i < 12; i++) {
      if (quadrados[i].innerHTML === quadrados[i + largura].innerHTML) {
        const soma = parseInt(quadrados[i].innerHTML) + parseInt(quadrados[i + largura].innerHTML);
        quadrados[i].innerHTML = soma;
        quadrados[i + largura].innerHTML = 0;
        pontuacao += soma;
        pontuacaoElemento.innerHTML = pontuacao;
      }
    }
    verificarVitoria();
  }

  function controle(tecla) {
    if (tecla.keyCode === 37) moverEsquerdaCombinada();
    else if (tecla.keyCode === 38) moverCimaCombinada();
    else if (tecla.keyCode === 39) moverDireitaCombinada();
    else if (tecla.keyCode === 40) moverBaixoCombinada();
  }
  document.addEventListener("keyup", controle);

  function moverDireitaCombinada() {
    moverDireita();
    combinarLinha();
    moverDireita();
    gerarNumero();
  }

  function moverEsquerdaCombinada() {
    moverEsquerda();
    combinarLinha();
    moverEsquerda();
    gerarNumero();
  }

  function moverCimaCombinada() {
    moverCima();
    combinarColuna();
    moverCima();
    gerarNumero();
  }

  function moverBaixoCombinada() {
    moverBaixo();
    combinarColuna();
    moverBaixo();
    gerarNumero();
  }

  function verificarVitoria() {
    for (let i = 0; i < quadrados.length; i++) {
      if (quadrados[i].innerHTML == 2048) {
        resultadoElemento.innerHTML = "Você VENCEU!";
        document.removeEventListener("keyup", controle);
        setTimeout(() => limpar(), 3000);
      }
    }
  }

  function verificarDerrota() {
    let zeros = 0;
    for (let i = 0; i < quadrados.length; i++) {
      if (quadrados[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultadoElemento.innerHTML = "Você PERDEU!";
      document.removeEventListener("keyup", controle);
      setTimeout(() => limpar(), 3000);
    }
  }

  function limpar() {
    clearInterval(temporizador);
  }

  function adicionarCores() {
    const cores = {
      "0": "#afa192",
      "2": "#f5f7f9",
      "4": "#e0e6ed",
      "8": "#b0c4de",
      "16": "#a2b5d0",
      "32": "#8fa3c1",
      "64": "#6e87b0",
      "128": "#5a6f99",
      "256": "#4a5c80",
      "512": "#3b4a6a",
      "1024": "#2f3b55",
      "2048": "#1f2a3f"
    };

    for (let i = 0; i < quadrados.length; i++) {
      const valor = parseInt(quadrados[i].innerHTML);
      quadrados[i].style.backgroundColor = cores[valor] || "#ffffff";
    }
  }

  criarTabuleiro();
  adicionarCores();
  const temporizador = setInterval(adicionarCores, 50);
});
