import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import BaseBoard from '../components/BaseBoard';
import LevelBox from '../components/LevelBox';
import React from 'react';
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
      <LevelBox
        preSettings={preSettings}
        choiceLevelHandler={choiceLevelHandler}
        customSettingHandler={customSettingHandler}
        reloadHandler={reloadHandler}
      />
      <BaseBoard
        mapSize={mapSize}
        bombCount={bombCount}
        board={board}
        isFinished={isFinished}
        seconds={seconds}
        resetHandler={resetHandler}
        handleRightClick={handleRightClick}
        clickHandler={clickHandler}
      />
    </div>
  );
};

export default Home;
