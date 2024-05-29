import styles from '../pages/index.module.css';
import React from 'react';
type Props = {
  preSettings: number[];
  choiceLevelHandler: (level: number) => void;
  customSettingHandler: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  reloadHandler: () => void;
};

const LevelBox: React.FC<Props> = ({
  preSettings,
  choiceLevelHandler,
  customSettingHandler,
  reloadHandler,
}) => {
  return (
    <>
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
    </>
  );
};

export default LevelBox;
