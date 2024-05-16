export {
  create2DArray,
  judgeFinish,
  rescuersiveOpen,
  openCell,
  plantBomb,
  plantNumber,
  toggleFlag,
  creatBoard,
  firstBombMapReload,
  getRandomIntNumber,
  directions,
};

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
const getRandomIntNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const create2DArray = (rows: number, cols: number, value: number) => {
  const array = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(value);
    }
    array.push(row);
  }
  return array;
};

const judgeFinish = (bombMap: number[][], userInput: number[][], x: number, y: number) => {
  if (bombMap[y][x] === 11) {
    return true;
  }
  return false;
};
const rescuersiveOpen = (bombMap: number[][], userInput: number[][], x: number, y: number) => {
  if (bombMap[y] === undefined || userInput[y] === undefined || userInput[y][x] === 0)
    return userInput;
  if (bombMap[y][x] !== 0) {
    userInput[y][x] = 0;
    return userInput;
  } else if (bombMap[y][x] === 0) {
    userInput[y][x] = 0;
  }
  for (const dir of directions) {
    rescuersiveOpen(bombMap, userInput, x + dir[1], y + dir[0]);
  }
  return userInput;
};
const openCell = (
  bombMap: number[][],
  userInput: number[][],
  x: number,
  y: number,
  isFinished: boolean,
) => {
  if (userInput[y][x] === 10 || isFinished) return userInput;
  if (userInput[y][x] === 10) {
    return userInput;
  } else if (bombMap[y][x] !== 0) {
    userInput[y][x] = 0;
    return userInput;
  } else {
    const newUserInput = rescuersiveOpen(bombMap, userInput, x, y);
    return newUserInput;
  }
};
const firstBombMapReload = (
  bombMap: number[][],
  x: number,
  y: number,
  bombCount: number,
  mapSize: number[],
) => {
  if (bombMap.flat().filter((cell) => cell === 11).length !== 0) return bombMap;
  const newBombMap: number[][] = plantBomb(bombMap, x, y, bombCount);
  const newBombMapWithNumber: number[][] = plantNumber(newBombMap, mapSize);
  return newBombMapWithNumber;
};
const plantBomb = (bombMap: number[][], x: number, y: number, bombCount: number) => {
  while (bombMap.flat().filter((cell) => cell === 11).length < bombCount) {
    const bombX = getRandomIntNumber(0, 8);
    const bombY = getRandomIntNumber(0, 8);
    if (bombX !== x && bombY !== y) {
      bombMap[bombY][bombX] = 11;
    }
  }
  return bombMap;
};
const plantNumber = (bombMap: number[][], mapSize: number[]) => {
  for (let y = 0; y < mapSize[0]; y++) {
    for (let x = 0; x < mapSize[1]; x++) {
      const bombCount = [0];
      for (const dir of directions) {
        if (bombMap[y][x] === 11) break;
        if (bombMap[y + dir[0]] !== undefined && bombMap[y + dir[0]][x + dir[1]] === 11) {
          bombCount[0]++;
        }
        bombMap[y][x] = bombCount[0];
      }
    }
  }
  return bombMap;
};
const toggleFlag = (userInput: number[][], x: number, y: number) => {
  if (userInput[y][x] === -1) {
    userInput[y][x] = 10;
  } else if (userInput[y][x] === 10) {
    userInput[y][x] = -1;
  }
  return userInput;
};
const creatBoard = (
  bombMap: number[][],
  userInput: number[][],
  board: number[][],
  mapSize: number[],
  isFinished: boolean,
) => {
  for (let y = 0; y < mapSize[0]; y++) {
    for (let x = 0; x < mapSize[1]; x++) {
      if (isFinished === true && bombMap[y][x] === 11) {
        board[y][x] = bombMap[y][x];
      } else if (userInput[y][x] === 0) {
        board[y][x] = bombMap[y][x];
      } else if (userInput[y][x] === -1 || userInput[y][x] === 10) {
        board[y][x] = userInput[y][x];
      }
    }
  }
};
