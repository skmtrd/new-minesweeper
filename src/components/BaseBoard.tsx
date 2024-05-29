import styles from '../pages/index.module.css';
import React from 'react';
type Props = {
  mapSize: number[];
  bombCount: number;
  board: number[][];
  isFinished: boolean;
  seconds: number;
  resetHandler: () => void;
  handleRightClick: (x: number, y: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  clickHandler: (x: number, y: number) => void;
};

const BaseBoard: React.FC<Props> = ({
  mapSize,
  bombCount,
  board,
  isFinished,
  seconds,
  resetHandler,
  handleRightClick,
  clickHandler,
}) => {
  return (
    <div
      className={styles.baseBoard}
      style={{ width: mapSize[1] * 30 + 50, height: mapSize[0] * 30 + 180 }}
    >
      <div className={styles.topBoard} style={{ width: mapSize[1] * 30 }}>
        <div className={styles.numberBox} style={{ marginRight: 10 }}>
          {bombCount - board.flat().filter((cell) => cell === 10).length}
        </div>
        <div className={styles.resetBottom}>
          <div
            className={styles.faceImage}
            onClick={() => resetHandler()}
            style={{
              backgroundPosition: isFinished
                ? board.flat().some((cell) => cell === 11)
                  ? '-286px 0px'
                  : '-264px 0px'
                : '-242px 0px',
            }}
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
  );
};

export default BaseBoard;
