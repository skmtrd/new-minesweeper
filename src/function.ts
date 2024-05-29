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
  levelsetting,
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

const judgeFinish = (
  bombMap: number[][],
  userInput: number[][],
  x: number,
  y: number,
  bombCount: number,
) => {
  if (
    userInput.flat().filter((cell) => cell === -1).length +
      userInput.flat().filter((cell) => cell === 10).length ===
    bombCount
  )
    return true;
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
  if (isFinished) return userInput;
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
  const newBombMap: number[][] = plantBomb(bombMap, x, y, bombCount, mapSize);
  const newBombMapWithNumber: number[][] = plantNumber(newBombMap, mapSize);
  return newBombMapWithNumber;
};
const plantBomb = (
  bombMap: number[][],
  x: number,
  y: number,
  bombCount: number,
  mapSize: number[],
) => {
  while (bombMap.flat().filter((cell) => cell === 11).length < bombCount) {
    const bombX = getRandomIntNumber(0, mapSize[1] - 1);
    const bombY = getRandomIntNumber(0, mapSize[0] - 1);
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
  mapSize: number[],
  isFinished: boolean,
  x: number,
  y: number,
) => {
  const board = create2DArray(mapSize[0], mapSize[1], -1);
  for (let i = 0; i < mapSize[0]; i++) {
    for (let j = 0; j < mapSize[1]; j++) {
      if (userInput[i][j] === 0) {
        board[i][j] = bombMap[i][j];
      } else if (userInput[i][j] === -1 || userInput[i][j] === 10) {
        board[i][j] = userInput[i][j];
        if (isFinished === true && bombMap[i][j] === 11) {
          board[i][j] = 10;
        }
      }
      if (isFinished === true && bombMap[y][x] === 11) {
        if (bombMap[i][j] === 11) {
          board[i][j] = 11;
        }
      }
    }
  }
  return board;
};

const levelsetting = (level: number) => {
  switch (level) {
    case 0:
      return [9, 9, 10];
    case 1:
      return [16, 16, 40];
    case 2:
      return [16, 30, 99];
    case 3:
      return [16, 30, 99];
    default:
      return [9, 9, 10];
  }
};
