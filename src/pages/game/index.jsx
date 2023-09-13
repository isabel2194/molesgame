import React from "react";
import cn from "classnames";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import UserMenu from "./components/userMenu";
import Cell from "../../components/cell";
import { useGlobalContext } from "../../contexts/global";
import { LEVELS } from "./utils";
import useGame from "./useGame";
import "./index.css";
import Mole from "./components/mole";

const Game = () => {
  const {
    state: { user },
  } = useGlobalContext();

  const {
    state: { level, score, time, moles, isStarted, openedUserMenu },
    actions: { setLevel, handleClickMole, setIsStarted, setOpenedUserMenu },
  } = useGame();

  return (
    <div className="game_page">
      <AppBar position="static" className="game_header">
        <FormControl sx={{ minWidth: 110 }} size="small">
          <InputLabel id="level-selector-label">Level</InputLabel>
          <Select
            labelId="level-selector-label"
            className="game_level-selector"
            onChange={(event) => setLevel(event.target.value)}
            value={level}
            label="Level"
            data-testid="game_level-selector"
            sx={{ color: "gray" }}
          >
            <MenuItem value={LEVELS.LOW} data-testid="game_level-selector--low">
              Low
            </MenuItem>
            <MenuItem value={LEVELS.MEDIUM} data-testid="game_level-selector--medium">
              Medium
            </MenuItem>
            <MenuItem value={LEVELS.HIGH} data-testid="game_level-selector--high">
              High
            </MenuItem>
          </Select>
        </FormControl>
        <h1 className="game_title" data-testid="game_title">
          Catch Moli
        </h1>
        <div className="game_header-right-actions" onClick={(e) => setOpenedUserMenu(e.currentTarget)}>
          <Avatar />
          <span className="game_header-username" data-testid="game_header-username">
            {user ?? "User"}
          </span>
        </div>
        <UserMenu element={openedUserMenu} handleClose={() => setOpenedUserMenu(null)} />
      </AppBar>
      <div className="game_content">
        <div
          className={cn("game_info", {
            "game_info--end": !isStarted,
          })}
        >
          {!isStarted ? (
            <p className="game_info_start">You have 20 seconds to catch as many Molis as you can.</p>
          ) : (
            <p data-testid="game_time">Time: {time} sec. </p>
          )}
          <p data-testid="game_score">Score: {score}</p>
        </div>
        {isStarted && (
          <div className="game_content-panel">
            <div className="game_board">
              {moles.map((mole, index) => (
                <Cell
                  className="game_board-cell"
                  testId="game_board-cell"
                  key={`mole_${index}`}
                  onClick={() => handleClickMole(index)}
                >
                  <Mole visible={mole.visible} />
                </Cell>
              ))}
            </div>
          </div>
        )}
        <Button
          variant="contained"
          className="game_button"
          data-testid="game_button"
          color={isStarted ? "error" : "success"}
          onClick={() => setIsStarted(!isStarted)}
        >
          {isStarted ? "STOP" : "START"}
        </Button>
      </div>
    </div>
  );
};

export default Game;
