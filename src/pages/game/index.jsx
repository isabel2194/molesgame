import React from "react";
import cn from "classnames";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Cell from "../../components/cell";
import { useGlobalContext } from "../../contexts/global";
import { LEVELS } from "./utils";
import useGame from "./useGame";
import "./index.css";
import { Button } from "@mui/material";
import Mole from "./components/mole";

const Game = () => {
  const {
    state: { user },
  } = useGlobalContext();

  const {
    state: { level, score, moles, isStarted },
    actions: { setLevel, handleClickMole, setIsStarted },
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
            sx={{ color: "gray" }}
          >
            <MenuItem value={LEVELS.LOW}>Low</MenuItem>
            <MenuItem value={LEVELS.MEDIUM}>Medium</MenuItem>
            <MenuItem value={LEVELS.HIGH}>High</MenuItem>
          </Select>
        </FormControl>
        <h1 className="game_title">Aplasta a Topi</h1>
        <div className="game_header_right-actions">
          <Avatar />
          <span className="game_header_user-name">{user ?? "User"}</span>
        </div>
      </AppBar>
      <div className="game_content">
        <div
          className={cn("game_score", {
            "game_score--end": !isStarted,
          })}
        >
          Score: {score}
        </div>
        {isStarted && (
          <div className="game_content-panel">
            <div className="game_board">
              {moles.map((mole, index) => (
                <Cell className="game_board-cell" key={`mole_${index}`} onClick={() => handleClickMole(index)}>
                  <Mole visible={mole.visible} />
                </Cell>
              ))}
            </div>
          </div>
        )}
        <Button
          variant="contained"
          className="game_button"
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
