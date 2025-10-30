const board = document.getElementById("board");
const SIZE = 8;
let currentPlayer = "white";
let selectedPiece = null;

function createBoard() {
  board.innerHTML = "";
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = row;
      square.dataset.col = col;

      const isDark = (row + col) % 2 !== 0;
      square.classList.add(isDark ? "dark" : "light");

      if (isDark && row < 3) {
        const piece = createPiece("black");
        square.appendChild(piece);
      } else if (isDark && row > 4) {
        const piece = createPiece("white");
        square.appendChild(piece);
      }

      square.addEventListener("click", () => handleSquareClick(square));
      board.appendChild(square);
    }
  }
}

function createPiece(color) {
  const piece = document.createElement("div");
  piece.classList.add("piece", color);
  piece.addEventListener("click", (e) => {
    e.stopPropagation();
    if (color !== currentPlayer || isGameOver()) return;

    const capturers = getCapturingPieces(currentPlayer);
    if (capturers.length > 0 && !capturers.includes(piece)) {
      showMustCaptureWarning(capturers);
      return;
    }

    if (selectedPiece) {
      selectedPiece.classList.remove("selected");
      clearHighlights();
    }
    selectedPiece = piece;
    piece.classList.add("selected");
    highlightValidMoves(piece);
  });
  return piece;
}

function handleSquareClick(target) {
  if (!selectedPiece || !target.classList.contains("highlight") || isGameOver()) return;

  const fromSquare = selectedPiece.parentElement;
  const fromRow = parseInt(fromSquare.dataset.row);
  const fromCol = parseInt(fromSquare.dataset.col);
  const toRow = parseInt(target.dataset.row);
  const toCol = parseInt(target.dataset.col);

  const color = selectedPiece.classList.contains("white") ? "white" : "black";
  const isKing = selectedPiece.classList.contains("king");

  let captured = false;

  if (isKing) {
    const dr = Math.sign(toRow - fromRow);
    const dc = Math.sign(toCol - fromCol);
    let r = fromRow + dr;
    let c = fromCol + dc;
    while (r !== toRow && c !== toCol) {
      const midSquare = document.querySelector(
        `.square[data-row="${r}"][data-col="${c}"]`
      );
      const midPiece = midSquare?.querySelector(".piece");
      if (midPiece && !midPiece.classList.contains(color)) {
        midSquare.removeChild(midPiece);
        captured = true;
        break;
      } else if (midPiece) {
        break;
      }
      r += dr;
      c += dc;
    }
  } else {
    const deltaRow = toRow - fromRow;
    const deltaCol = toCol - fromCol;
    if (Math.abs(deltaRow) === 2 && Math.abs(deltaCol) === 2) {
      const midRow = (fromRow + toRow) / 2;
      const midCol = (fromCol + toCol) / 2;
      const midSquare = document.querySelector(
        `.square[data-row="${midRow}"][data-col="${midCol}"]`
      );
      const midPiece = midSquare?.querySelector(".piece");

      if (midPiece && !midPiece.classList.contains(color)) {
        midSquare.removeChild(midPiece);
        captured = true;
      }
    }
  }

  movePiece(selectedPiece, target);
  checkPromotion(selectedPiece, toRow, color);

  if (captured && hasFurtherCaptures(selectedPiece)) {
    selectedPiece.classList.add("selected");
    highlightValidMoves(selectedPiece);
  } else {
    selectedPiece.classList.remove("selected");
    selectedPiece = null;
    clearHighlights();
    checkVictory();
    if (!isGameOver()) {
      switchTurn();
    }
  }
}

function isForwardMove(deltaRow, color) {
  return (color === "white" && deltaRow < 0) ||
         (color === "black" && deltaRow > 0);
}

function movePiece(piece, targetSquare) {
  targetSquare.appendChild(piece);
}

function checkPromotion(piece, row, color) {
  if ((color === "white" && row === 0) ||
      (color === "black" && row === 7)) {
    piece.classList.add("king");
  }
}

function switchTurn() {
  document.getElementById("turn").textContent =
    `Vez do jogador: ${currentPlayer === "white" ? "Pretas ⚫" : "Brancas ⚪"}`;
  currentPlayer = currentPlayer === "white" ? "black" : "white";
}

function resetGame() {
  currentPlayer = "white";
  selectedPiece = null;
  createBoard();
  switchTurn();
}

function highlightValidMoves(piece) {
  clearHighlights();

  const square = piece.parentElement;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  const color = piece.classList.contains("white") ? "white" : "black";
  const isKing = piece.classList.contains("king");

  const directions = [
    [-1, -1], [-1, 1],
    [1, -1], [1, 1]
  ];

  const capturers = getCapturingPieces(currentPlayer);

  directions.forEach(([dr, dc]) => {
    let r = row + dr;
    let c = col + dc;
    let foundEnemy = false;

    while (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
      const target = document.querySelector(
        `.square[data-row="${r}"][data-col="${c}"]`
      );
      if (!target) break;

      const targetPiece = target.querySelector(".piece");

      if (!targetPiece && !foundEnemy) {
        if (!isKing && Math.abs(r - row) === 1 && isForwardMove(dr, color) && capturers.length === 0) {
          target.classList.add("highlight");
        } else if (isKing && capturers.length === 0) {
          target.classList.add("highlight");
        }
      } else if (targetPiece && !targetPiece.classList.contains(color) && !foundEnemy) {
        foundEnemy = true;
        r += dr;
        c += dc;
        continue;
      } else if (!targetPiece && foundEnemy) {
        target.classList.add("highlight");
      } else {
        break;
      }

      if (!isKing) break;
      r += dr;
      c += dc;
    }
  });
}

function clearHighlights() {
  document.querySelectorAll(".square.highlight").forEach(sq =>
    sq.classList.remove("highlight")
  );
}

function hasFurtherCaptures(piece) {
  const square = piece.parentElement;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  const color = piece.classList.contains("white") ? "white" : "black";
  const isKing = piece.classList.contains("king");

  const directions = [
    [-1, -1], [-1, 1],
    [1, -1], [1, 1]
  ];

  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;
    let foundEnemy = false;

    while (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
      const midSquare = document.querySelector(
        `.square[data-row="${r}"][data-col="${c}"]`
      );
      const midPiece = midSquare?.querySelector(".piece");

      if (!midSquare) break;

      if (midPiece && !midPiece.classList.contains(color) && !foundEnemy) {
        foundEnemy = true;
        r += dr;
        c += dc;
        continue;
      } else if (!midPiece && foundEnemy) {
        return true;
      } else {
        break;
      }

      if (!isKing) break;
      r += dr;
      c += dc;
    }
  }
  return false;
}

function getCapturingPieces(color) {
  const pieces = Array.from(document.querySelectorAll(`.piece.${color}`));
  return pieces.filter(piece => hasFurtherCaptures(piece));
}

function showMustCaptureWarning(pieces) {
  pieces.forEach(p => p.classList.add("must-capture"));
  setTimeout(() => {
    pieces.forEach(p => p.classList.remove("must-capture"));
  }, 1500);
}

function checkVictory() {
  const whitePieces = document.querySelectorAll(".piece.white");
  const blackPieces = document.querySelectorAll(".piece.black");
  const turnDisplay = document.getElementById("turn");

  if (whitePieces.length === 0) {
    turnDisplay.textContent = "Vitória das Pretas! ⚫";
  } else if (blackPieces.length === 0) {
    turnDisplay.textContent = "Vitória das Brancas! ⚪";
  }
}

function isGameOver() {
  const whitePieces = document.querySelectorAll(".piece.white");
  const blackPieces = document.querySelectorAll(".piece.black");
  return whitePieces.length === 0 || blackPieces.length === 0;
}

// Inicializa o jogo após o carregamento completo da página
window.onload = () => {
  createBoard();
  switchTurn();
};
