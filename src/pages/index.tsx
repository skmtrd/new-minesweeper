import styles from './index.module.css';
import { useGame } from '../hooks/useGame';

const Home = () => {
  const {
    isFinished,
    mapSize,
    bombCount,
    preSettings,
    seconds,
    board,
    customSettingHandler,
    reloadHandler,
    choiceLevelHandler,
    resetHandler,
    handleRightClick,
    clickHandler,
  } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.choceLevel} style={{}}>
        <div className={styles.levelStrings} onClick={() => choiceLevelHandler(0)}>
          初級
        </div>
        <div className={styles.levelStrings} onClick={() => choiceLevelHandler(1)}>
          中級
        </div>
        <div className={styles.levelStrings} onClick={() => choiceLevelHandler(2)}>
          上級
        </div>
        <div className={styles.levelStrings} onClick={() => choiceLevelHandler(3)}>
          カスタム
        </div>
      </div>
      <div className={styles.settingCustomBox}>
        <h1>縦幅</h1>
        <input
          className={styles.input}
          type="number"
          value={preSettings[0]}
          onChange={(e) => customSettingHandler(0, e)}
        />
        <h1>横幅</h1>
        <input
          className={styles.input}
          type="number"
          value={preSettings[1]}
          onChange={(e) => customSettingHandler(1, e)}
        />
        <h1>爆弾の数</h1>
        <input
          className={styles.input}
          type="number"
          value={preSettings[2]}
          onChange={(e) => customSettingHandler(2, e)}
        />
        <div className={styles.reload} onClick={reloadHandler}>
          更新
        </div>
      </div>
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
              // style={{ backgroundPosition: '-242px 0px' }}
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
    </div>
  );
};

export default Home;
