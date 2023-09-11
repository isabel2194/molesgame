import { useState, useEffect, useRef } from "react";
import { LEVELS, MOLE_SCORE_BY_LEVEL, MOLE_TIMER_BY_LEVEL } from "./utils";

const useGame = () => {
  const generateMoles = () =>
    new Array(9).fill({
      points: MOLE_SCORE_BY_LEVEL[level],
      visible: false,
    });

  const [level, setLevel] = useState(LEVELS.LOW);
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState(generateMoles());
  const [isStarted, setIsStarted] = useState(false);

  const prevLevelRef = useRef();
  let timer = useRef();

  const handleClickMole = (index) => {
    if (moles[index].visible) {
      setScore(score + moles[index].points);
      setMoles(moles.map((mole, i) => (i === index ? { ...mole, visible: false } : mole)));
    }
  };

  const changeMole = () => {
    const randomIndex = Math.floor(Math.random() * 9);
    setMoles(moles.map((mole, i) => (i === randomIndex ? { ...mole, visible: true } : { ...mole, visible: false })));
  };

  useEffect(() => {
    if (isStarted) {
      setMoles(generateMoles());
      if (level !== prevLevelRef.current) {
        clearInterval(timer.current);
        prevLevelRef.current = level;
      }
      timer.current = setInterval(changeMole, MOLE_TIMER_BY_LEVEL[level]);
    } else {
      clearInterval(timer.current);
    }
  }, [isStarted, level]);

  return {
    state: { level, score, moles, isStarted },
    actions: { setLevel, setScore, handleClickMole, setIsStarted },
  };
};

export default useGame;
