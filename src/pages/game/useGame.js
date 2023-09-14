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
  const [time, setTime] = useState(20);
  const [moles, setMoles] = useState(generateMoles());
  const [isStarted, setIsStarted] = useState(false);
  const [openedUserMenu, setOpenedUserMenu] = useState(false);

  const prevLevelRef = useRef();
  let molesTimer = useRef();
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

  const initialiceGame = () => {
    setTime(20);
    setScore(0);
  };

  useEffect(() => {
    if (isStarted) {
      setMoles(generateMoles());
      if (level !== prevLevelRef.current) {
        clearInterval(molesTimer.current);
        prevLevelRef.current = level;
      }
      molesTimer.current = setInterval(changeMole, MOLE_TIMER_BY_LEVEL[level]);
    } else {
      clearInterval(molesTimer.current);
    }
  }, [isStarted, level]);

  useEffect(() => {
    if (isStarted) {
      initialiceGame();
      timer.current = setInterval(() => setTime((time) => time - 1), 1000);
    } else {
      clearInterval(timer.current);
    }
  }, [isStarted]);

  useEffect(() => {
    if (time === 0) {
      setIsStarted(false);
      clearInterval(timer.current);
    }
  }, [time]);

  return {
    state: { level, score, time, moles, isStarted, openedUserMenu },
    actions: { setLevel, setScore, handleClickMole, setIsStarted, setOpenedUserMenu },
  };
};

export default useGame;
