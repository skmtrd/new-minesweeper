import { useState } from 'react';
import styles from './index.module.css';
import {
  create2DArray,
  judgeFinish,
  openCell,
  toggleFlag,
  creatBoard,
  firstBombMapReload,
} from './function';

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

const Home = () => {
  const [isFinished, setIsFinihed] = useState(false);
  const [mapSize, setMapSize] = useState([9, 9]);
  const [bombCount, setBombCount] = useState(10);
  const [bombMap, setBombMap] = useState(create2DArray(mapSize[0], mapSize[1], 0));
  const [userInput, setUserInput] = useState(create2DArray(mapSize[0], mapSize[1], -1));
  const resetHandler = () => {
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
    const [newBombMap, newUserInput] = [structuredClone(bombMap), structuredClone(userInput)];
    const relodedBombMap = firstBombMapReload(newBombMap, x, y, bombCount, mapSize);
    const openedUserInput: number[][] = openCell(relodedBombMap, newUserInput, x, y, isFinished);
    const preIsFinished = isFinished
      ? true
      : judgeFinish(relodedBombMap, openedUserInput, x, y, bombCount);
    creatBoard(relodedBombMap, openedUserInput, board, mapSize, preIsFinished);
    setIsFinihed(preIsFinished);
    setBombMap(relodedBombMap);
    setUserInput(openedUserInput);
  };

  return (
    <div className={styles.container}>
      <div>{isFinished === true ? 'finish' : ''}</div>
      <div className={styles.baseBoard}>
        <div className={styles.topBoard}>
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
