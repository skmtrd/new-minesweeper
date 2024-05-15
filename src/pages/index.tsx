import { use, useState } from 'react';
import styles from './index.module.css';
const getRandomIntNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const initBombMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const initUserInput = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
];
const board = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
];

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

const openCell = (bombMap: number[][], userInput: number[][], x: number, y: number) => {
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
const creatBoard = (
  bombMap: number[][],
  userInput: number[][],
  board: number[][],
  mapSize: number[],
) => {
  for (let y = 0; y < mapSize[0]; y++) {
    for (let x = 0; x < mapSize[1]; x++) {
      if (userInput[y][x] === 0) {
        board[y][x] = bombMap[y][x];
      } else if (userInput[y][x] === -1 || userInput[y][x] === 10) {
        board[y][x] = userInput[y][x];
      }
    }
  }
};
const Home = () => {
  const [mapSize, setMapSize] = useState([9, 9]);
  const [bombCount, setBombCount] = useState(10);
  const [bombMap, setBombMap] = useState(initBombMap);
  const [userInput, setUserInput] = useState(initUserInput);

  const resetHandler = () => {
    console.log('reset');
    creatBoard(initBombMap, initUserInput, board, mapSize);
    setBombMap(initBombMap);
    setUserInput(initUserInput);
  };
  const handleRightClick = (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newUserInput = structuredClone(userInput);
    if (newUserInput[y][x] === -1) {
      newUserInput[y][x] = 10;
    } else if (newUserInput[y][x] === 10) {
      newUserInput[y][x] = -1;
    }
    setUserInput(newUserInput);
    creatBoard(bombMap, newUserInput, board, mapSize);
  };
  const clickHandler = (x: number, y: number) => {
    const [newBombMap, newUserInput, newBombCount, newMapSize] = [
      structuredClone(bombMap),
      structuredClone(userInput),
      structuredClone(bombCount),
      structuredClone(mapSize),
    ];
    const relodedBombMap = firstBombMapReload(newBombMap, x, y, bombCount, mapSize);
    const openedUserInput: number[][] = openCell(relodedBombMap, newUserInput, x, y);
    creatBoard(relodedBombMap, openedUserInput, board, newMapSize);
    setBombMap(relodedBombMap);
    setUserInput(openedUserInput);
    setBombCount(newBombCount);
    setMapSize(newMapSize);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBoard}>
        <div className={styles.numberBox} style={{ marginRight: 10 }}>
          100
        </div>
        <div className={styles.resetBottom}>
          <div
            className={styles.faceImage}
            onClick={() => resetHandler()}
            style={{ backgroundPosition: '-242px 0px' }}
          />
        </div>
        <div className={styles.numberBox} style={{ marginLeft: 10 }}>
          100
        </div>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              onClick={() => clickHandler(x, y)}
              onContextMenu={(e) => handleRightClick(x, y, e)}
              style={{
                backgroundColor: board[y][x] === -1 || board[y][x] === 10 ? '#7f7f7f' : '#a7a7a7',
              }}
            >
              <div
                className={styles.image}
                style={{
                  backgroundPosition: `${-22 * (cell - 1)}px 0px `,
                }}
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
