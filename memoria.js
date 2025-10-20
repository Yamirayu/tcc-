const emojiBase = ['💻','📱','🚗','🛜','🎮','🔦','💿','💾','🖨️','⌨️','👾','🖱️'];
const totalPairs = emojiBase.length;
let flippedCards = [], lockBoard = false, matchedPairs = 0;
let startTime, errors = 0, playerNick = null;
let ranking = [];

const board = document.createElement('div');
board.className = 'board';
document.getElementById('game-area').appendChild(board);

const restartBtn = document.querySelector('.restart-btn');
const nickInput = document.getElementById('playerNick');
const saveBtn = document.getElementById('saveRank');
restartBtn.addEventListener('click', reiniciarJogo);
saveBtn.addEventListener('click', salvarRanking);

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function iniciarJogo() {
  board.innerHTML = '';
  flippedCards = [];
  matchedPairs = 0;
  lockBoard = true;
  errors = 0;
  playerNick = null;
  nickInput.value = '';
  nickInput.style.display = 'none';
  saveBtn.style.display = 'none';
  nickInput.disabled = false;
  startTime = null;

  const emojis = shuffle([...emojiBase, ...emojiBase]);
  const cards = [];

  emojis.forEach(emoji => {
    const card = document.createElement('div');
    card.className = 'card flipped';
    card.dataset.emoji = emoji;
    card.textContent = emoji;
    board.appendChild(card);
    cards.push(card);
  });

  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove('flipped');
      card.textContent = '';
      card.addEventListener('click', () => virarCarta(card));
    });
    lockBoard = false;
    startTime = performance.now();
  }, 3000);

  carregarRanking();
}

function virarCarta(card) {
  if (lockBoard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(() => {
      const [a, b] = flippedCards;
      if (a.dataset.emoji === b.dataset.emoji) {
        matchedPairs++;
        if (matchedPairs === totalPairs) {
          nickInput.style.display = 'inline-block';
          saveBtn.style.display = 'inline-block';
        }
      } else {
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        a.textContent = '';
        b.textContent = '';
        errors++;
      }
      flippedCards = [];
      lockBoard = false;
    }, 800);
  }
}

function salvarRanking() {
  const nick = nickInput.value.trim();
  if (!playerNick && nick) {
    if (ranking.some(p => p.nick === nick)) {
      alert("Esse nome já está no ranking. Escolha outro.");
      return;
    }

    playerNick = nick;
    const tempoMs = performance.now() - startTime;
    const tempoFormatado = formatarTempo(tempoMs);

    ranking.push({ nick: playerNick, tempoMs, tempoFormatado, erros: errors });

    localStorage.setItem('rankingMemoria', JSON.stringify(ranking));

    nickInput.disabled = true;
    nickInput.style.display = 'none';
    saveBtn.style.display = 'none';
    atualizarRanking();
  }
}

function carregarRanking() {
  const salvo = localStorage.getItem('rankingMemoria');
  if (salvo) {
    ranking = JSON.parse(salvo);
    atualizarRanking();
  }
}

function formatarTempo(ms) {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  const msec = Math.floor(ms % 1000);
  return `${min}m ${sec}s ${msec}ms`;
}

function atualizarRanking() {
  const ordenado = [...ranking].sort((a, b) => a.tempoMs - b.tempoMs);
  const tbody = document.querySelector('#ranking-table tbody');
  tbody.innerHTML = '';

  ordenado.forEach(p => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.nick}</td>
      <td>${p.tempoFormatado}</td>
      <td>${p.erros}</td>
      <td><button class="remove-btn" onclick="removerJogadorPorNick('${p.nick}')">❌</button></td>
    `;
    tbody.appendChild(row);
  });
}

function removerJogadorPorNick(nick) {
  ranking = ranking.filter(p => p.nick !== nick);
  localStorage.setItem('rankingMemoria', JSON.stringify(ranking));
  atualizarRanking();
}

function reiniciarJogo() {
  iniciarJogo();
}

iniciarJogo();
