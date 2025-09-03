// Jogo Da Velha
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // Linhas
  [0,3,6], [1,4,7], [2,5,8], // Colunas
  [0,4,8], [2,4,6]           // Diagonais
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('X', 'O', 'clicked');
    cell.textContent = ''; 
    cell.addEventListener('click', handleClick, { once: true });
  });
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
  gameActive = true;
}

function handleClick(e) {
  const cell = e.target;
  cell.classList.add(currentPlayer);
  cell.classList.add('clicked');
  cell.textContent = currentPlayer;
  
  if (checkWin(currentPlayer)) {
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }
  
  if ([...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'))) {
    statusText.textContent = 'Empate!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
}

function checkWin(player) {
  return winningCombos.some(combo => {
    return combo.every(index => cells[index].classList.contains(player));
  });
}

restartBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  startGame();
});

startGame();
