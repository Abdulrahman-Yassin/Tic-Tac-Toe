let currentPlayer = "X";
let NUMBER_OF_ROWS = 3;
let turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;
let createBoardArray = () => {
  let board = [];

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => "_"));
  }

  return board;
};
let board = createBoardArray();
let resetButton = document.querySelector("#reset");

let getCellPlacement = (index, numberOfRows) => {
  let row = Math.floor(index / numberOfRows);
  let col = index % numberOfRows;

  return [row, col];
};

let checkRows = (currentPlayer) => {
  let column = 0;

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    while (column < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        column = 0;
        break;
      }
      column++;
    }

    if (column === NUMBER_OF_ROWS) {
      return true;
    }
  }
};

let checkColumns = () => {
  let row = 0;

  for (let column = 0; column < NUMBER_OF_ROWS; column++) {
    while (row < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        row = 0;
        break;
      }
      row++;
    }

    if (row === NUMBER_OF_ROWS) {
      return true;
    }
  }
};

let checkDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][count] !== currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};

let checkReverseDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][NUMBER_OF_ROWS - 1 - count] !== currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};

let checkWin = (currentPlayer) => {

  if (checkRows(currentPlayer)) return true;

  if (checkColumns(currentPlayer)) return true;

  if (checkDiagonals(currentPlayer)) return true;

  if (checkReverseDiagonals(currentPlayer)) return true;
};


let resetBoard = () => {
  document.querySelector(".board").remove();
  createBoard();
  board = createBoardArray();

  currentPlayer = "X";
  turnsCounter = 0;
};

let runWinEvent = (currentPlayer) => {
  setTimeout(() => {
    alert(`Player ${currentPlayer} won!`);
    resetBoard();
  }, 100);
};

let runDrawEvent = () => {
  setTimeout(() => {
    alert2()
    resetBoard();
  }, 100);
};



let drawMarkInCell = (cell, currentPlayer) => {
  cell.querySelector(".value").textContent = currentPlayer;
  cell.classList.add(`cell--${currentPlayer}`);
};

let cellClickHandler = (event, index) => {
  let cell = event.target;
  let [row, col] = getCellPlacement(index, NUMBER_OF_ROWS);

  if (board[row][col] === "_") {
    turnsCounter++;
    board[row][col] = currentPlayer;

    drawMarkInCell(cell, currentPlayer);

    if (checkWin(currentPlayer)) {
      runWinEvent(currentPlayer);
    } else {
      turnsCounter === turns && runDrawEvent();

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
};

let createCell = (index) => {
  let cellElementString = `<div class="cell" role="button" tabindex="${index + 1}"><span class="value"></span></div>`;
  let cellElement = document.createRange().createContextualFragment(cellElementString);

  cellElement.querySelector(".cell").onclick = (event) => cellClickHandler(event, index);
  cellElement.querySelector(".cell").onkeydown = (event) =>
    event.key === "Enter" ? cellClickHandler(event, index) : true;

  return cellElement;
};

let createBoard = () => {
  let container = document.querySelector(".container");
  let board = document.createElement("div");

  board.classList.add("board");

  for (let i = 0; i < NUMBER_OF_ROWS ** 2; i++) {
    let cellElement = createCell(i);
    board.appendChild(cellElement);
    document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
  }

  container.insertAdjacentElement("afterbegin", board);
};

resetButton.addEventListener("click", resetBoard);
createBoard();

let cellWeakness = document.querySelector(".button")
let plus = () => {
  NUMBER_OF_ROWS = NUMBER_OF_ROWS + 1;
  turns = NUMBER_OF_ROWS ** 2; 
};

cellWeakness.addEventListener("click", plus );
