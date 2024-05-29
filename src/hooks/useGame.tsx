import { useEffect, useState } from 'react';
import {
  create2DArray,
  judgeFinish,
  openCell,
  toggleFlag,
  creatBoard,
  firstBombMapReload,
  levelsetting,
} from '../pages/function';

export const useGame = () => {
  const [board, setBoard] = useState(create2DArray(9, 9, -1));
  const [isFinished, setIsFinihed] = useState(false);
  const [mapSize, setMapSize] = useState([9, 9]);
  const [bombCount, setBombCount] = useState(10);
  const [preSettings, setPreSettings] = useState([9, 9, 10]);
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

  const customSettingHandler = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newPreSettings = structuredClone(preSettings);
    newPreSettings[index] = Number(e.target.value);
    setPreSettings(newPreSettings);
  };

  const reloadHandler = () => {
    const preMapSize = [preSettings[0], preSettings[1]];
    const preBombCount = preSettings[2];
    const preBombMap = create2DArray(preMapSize[0], preMapSize[1], 0);
    const preUserInput = create2DArray(preMapSize[0], preMapSize[1], -1);
    setBoard(creatBoard(preBombMap, preUserInput, preMapSize, isFinished, 0, 0));
    setMapSize(preMapSize);
    setBombCount(preBombCount);
    setBombMap(preBombMap);
    setUserInput(preUserInput);
    setIsActive(false);
    setSeconds(0);
    setIsFinihed(false);
  };

  const choiceLevelHandler = (level: number) => {
    const settings = levelsetting(level);
    const preMapSize = [settings[0], settings[1]];
    const preBombCount = settings[2];
    const preBombMap = create2DArray(preMapSize[0], preMapSize[1], 0);
    const preUserInput = create2DArray(preMapSize[0], preMapSize[1], -1);
    setBoard(creatBoard(preBombMap, preUserInput, preMapSize, isFinished, 0, 0));
    setPreSettings([settings[0], settings[1], settings[2]]);
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
    setBoard(
      creatBoard(
        create2DArray(mapSize[0], mapSize[1], 0),
        create2DArray(mapSize[0], mapSize[1], -1),
        mapSize,
        preIsFinished,
        0,
        0,
      ),
    );
    setIsFinihed(preIsFinished);
    setBombMap(create2DArray(mapSize[0], mapSize[1], 0));
    setUserInput(create2DArray(mapSize[0], mapSize[1], -1));
  };
  const handleRightClick = (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isFinished) return;
    const newUserInput = structuredClone(userInput);
    setUserInput(toggleFlag(newUserInput, x, y));
    setBoard(creatBoard(bombMap, newUserInput, mapSize, isFinished, x, y));
  };
  const clickHandler = (x: number, y: number) => {
    if (isFinished) return;
    setIsActive(true);
    const [newBombMap, newUserInput] = [structuredClone(bombMap), structuredClone(userInput)];
    const relodedBombMap = firstBombMapReload(newBombMap, x, y, bombCount, mapSize);
    const openedUserInput: number[][] = openCell(relodedBombMap, newUserInput, x, y, isFinished);
    const preIsFinished = isFinished
      ? true
      : judgeFinish(relodedBombMap, openedUserInput, x, y, bombCount);
    setBoard(creatBoard(relodedBombMap, openedUserInput, mapSize, preIsFinished, x, y));
    setIsActive(preIsFinished ? false : true);
    setIsFinihed(preIsFinished);
    setBombMap(relodedBombMap);
    setUserInput(openedUserInput);
  };

  return {
    isFinished,
    mapSize,
    bombCount,
    preSettings,
    bombMap,
    userInput,
    isActive,
    seconds,
    board,
    customSettingHandler,
    reloadHandler,
    choiceLevelHandler,
    resetHandler,
    handleRightClick,
    clickHandler,
  };
};
