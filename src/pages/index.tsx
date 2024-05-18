import { useEffect, useState } from 'react';
import styles from './index.module.css';
import {
  create2DArray,
  judgeFinish,
  openCell,
  toggleFlag,
  creatBoard,
  firstBombMapReload,
  levelsetting,
} from './function';

let board = [
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

const Home = () => {
  const [isFinished, setIsFinihed] = useState(false);
  const [mapSize, setMapSize] = useState([9, 9]);
  const [bombCount, setBombCount] = useState(10);
  const [bombMap, setBombMap] = useState(create2DArray(mapSize[0], mapSize[1], 0));
  const [userInput, setUserInput] = useState(create2DArray(mapSize[0], mapSize[1], -1));
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: number | null = null;
    if (isActive) {
      interval = window.setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      window.clearInterval(interval ?? 0);
    }
    return () => clearInterval(interval ?? 0);
  }, [isActive, seconds]);

  const choiceLevelHandler = (level: number) => {
    const settings = levelsetting(level);
    const preMapSize = [settings[0], settings[1]];
    const preBombCount = settings[2];
    const preBombMap = create2DArray(preMapSize[0], preMapSize[1], 0);
    const preUserInput = create2DArray(preMapSize[0], preMapSize[1], -1);
    board = create2DArray(preMapSize[0], preMapSize[1], -1);
    creatBoard(preBombMap, preUserInput, board, preMapSize, isFinished);
    setIsActive(false);
    setSeconds(0);
    setIsFinihed(false);
    setMapSize(preMapSize);
    setBombCount(preBombCount);
    setBombMap(preBombMap);
    setUserInput(preUserInput);
  };
  const resetHandler = () => {
    setIsActive(false);
    setSeconds(0);
    const preIsFinished = false;
    creatBoard(
      create2DArray(mapSize[0], mapSize[1], 0),
      create2DArray(mapSize[0], mapSize[1], -1),
      board,
      mapSize,
      preIsFinished,
    );
    setIsFinihed(preIsFinished);
    setBombMap(create2DArray(mapSize[0], mapSize[1], 0));
    setUserInput(create2DArray(mapSize[0], mapSize[1], -1));
  };
  const handleRightClick = (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newUserInput = structuredClone(userInput);
    setUserInput(toggleFlag(newUserInput, x, y));
    creatBoard(bombMap, newUserInput, board, mapSize, isFinished);
  };
  const clickHandler = (x: number, y: number) => {
    setIsActive(true);
    const [newBombMap, newUserInput] = [structuredClone(bombMap), structuredClone(userInput)];
    const relodedBombMap = firstBombMapReload(newBombMap, x, y, bombCount, mapSize);
    const openedUserInput: number[][] = openCell(relodedBombMap, newUserInput, x, y, isFinished);
    const preIsFinished = isFinished
      ? true
      : judgeFinish(relodedBombMap, openedUserInput, x, y, bombCount);
    creatBoard(relodedBombMap, openedUserInput, board, mapSize, preIsFinished);
    setIsActive(preIsFinished ? false : true);
    setIsFinihed(preIsFinished);
    setBombMap(relodedBombMap);
    setUserInput(openedUserInput);
  };

  return (
    <div className={styles.container}>
      <div className={styles.choceLevel}>
        <div className={styles.levelStrings} onClick={() => choiceLevelHandler(0)}>
          初級
        </div>
        <div className={styles.levelStrings} onClick={() => choiceLevelHandler(1)}>
          中級
        </div>
        <div className={styles.levelStrings} onClick={() => choiceLevelHandler(2)}>
          上級
        </div>
      </div>
      <div
        className={styles.baseBoard}
        style={{ width: mapSize[1] * 30 + 50, height: mapSize[0] * 30 + 150 }}
      >
        <div className={styles.topBoard} style={{ width: mapSize[1] * 30 }}>
          <div className={styles.numberBox} style={{ marginRight: 10 }}>
            {bombCount - board.flat().filter((cell) => cell === 10).length}
          </div>
          <div className={styles.resetBottom}>
            <div
              className={styles.faceImage}
              onClick={() => resetHandler()}
              style={{ backgroundPosition: '-242px 0px' }}
            />
          </div>
          <div className={styles.numberBox} style={{ marginLeft: 10 }}>
            {seconds}
          </div>
        </div>
        <div className={styles.board} style={{ width: mapSize[1] * 30, height: mapSize[0] * 30 }}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
                onContextMenu={(e) => handleRightClick(x, y, e)}
                style={{
                  backgroundColor: board[y][x] === -1 || board[y][x] === 10 ? '#c6c6c6' : '#c6c6c6',
                  borderWidth: board[y][x] === -1 || board[y][x] === 10 ? 3 : 1.5,
                  borderColor:
                    board[y][x] === -1 || board[y][x] === 10
                      ? '#fff #808080 #808080 #fff'
                      : '#838383',
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
    </div>
  );
};

export default Home;
