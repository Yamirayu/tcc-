const towers = [[], [], []];
const numDisks = 4;
let selectedTower = null;
let moveCount = 0;
let timeLeft = 180;
let timerInterval = null;
let gameOver = false;
let timerStarted = false;

function initializeGame() {
  towers[0] = [];
  towers[1] = [];
  towers[2] = [];
  for (let i = numDisks - 1; i >= 0; i--) {
    towers[0].push(i);
  }
  moveCount = 0;
  selectedTower = null;
  timeLeft = 180;
  gameOver = false;
  timerStarted = false;
  clearError();
  clearSuccess();
  showElements();
  render();
  updateTimerDisplay();
  clearInterval(timerInterval);
}

function render() {
  for (let i = 0; i < 3; i++) {
    const towerEl = document.getElementById(`tower-${i}`);
    towerEl.innerHTML = '';
    towers[i].forEach(disk => {
      const diskEl = document.createElement('div');
      diskEl.classList.add('disk', `disk-${disk}`);
      towerEl.appendChild(diskEl);
    });

    towerEl.onclick = () => handleTowerClick(i);
  }

  document.getElementById('moves').textContent = `Movimentos: ${moveCount}`;
}

function handleTowerClick(towerIndex) {
  if (gameOver) return;

  if (selectedTower === null) {
    if (towers[towerIndex].length === 0) return;
    selectedTower = towerIndex;
    highlightTopDisk(towerIndex);
  } else if (selectedTower === towerIndex) {
    selectedTower = null;
    removeHighlights();
    clearError();
  } else {
    moveDisk(selectedTower, towerIndex);
    selectedTower = null;
    removeHighlights();
  }
}

function moveDisk(from, to) {
  const fromTower = towers[from];
  const toTower = towers[to];
  const disk = fromTower[fromTower.length - 1];

  if (
    toTower.length === 0 ||
    disk < toTower[toTower.length - 1]
  ) {
    fromTower.pop();
    toTower.push(disk);
    moveCount++;
    clearError();
    render();
    if (!timerStarted) {
      timerStarted = true;
      timerInterval = setInterval(updateTimer, 1000);
    }
    checkWin();
  } else {
    showError('Movimento inválido! Não pode colocar disco maior sobre menor.');
  }
}

function highlightTopDisk(towerIndex) {
  const towerEl = document.getElementById(`tower-${towerIndex}`);
  const disks = towerEl.querySelectorAll('.disk');
  if (disks.length > 0) {
    disks[disks.length - 1].style.border = '2px dashed #1b5e20';
  }
}

function removeHighlights() {
  document.querySelectorAll('.disk').forEach(disk => {
    disk.style.border = '2px solid #388e3c';
  });
}

function showError(message) {
  const errorEl = document.getElementById('error-message');
  errorEl.textContent = message;
  errorEl.style.opacity = 1;
}

function clearError() {
  const errorEl = document.getElementById('error-message');
  errorEl.textContent = '';
  errorEl.style.opacity = 0;
}

function showSuccess(message) {
  const successEl = document.getElementById('success-message');
  successEl.textContent = message;
  successEl.style.opacity = 1;
}

function clearSuccess() {
  const successEl = document.getElementById('success-message');
  successEl.textContent = '';
  successEl.style.opacity = 0;
}

function hideElements() {
  document.getElementById('moves').style.display = 'none';
  document.getElementById('timer').style.display = 'none';
}

function showElements() {
  document.getElementById('moves').style.display = 'block';
  document.getElementById('timer').style.display = 'block';
}

function checkWin() {
  if (towers[2].length === numDisks || towers[1].length === numDisks) {
    clearInterval(timerInterval);
    gameOver = true;
    hideElements();
    const timeUsed = 180 - timeLeft;
    const minutes = Math.floor(timeUsed / 60);
    const seconds = timeUsed % 60;
    showSuccess(`🎉 Parabéns! Você resolveu em ${moveCount} movimentos e ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} minutos.`);
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimerDisplay();
  } else {
    clearInterval(timerInterval);
    gameOver = true;
    showError('⏱️ Tempo esgotado! Tente novamente.');
    hideElements();
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent =
    `Tempo restante: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('reset-button').onclick = () => {
  initializeGame();
};

initializeGame();
