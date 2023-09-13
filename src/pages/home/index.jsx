import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { useGlobalContext } from "../../contexts/global";
import moleImage from "../../assets/mole.png";

const Home = () => {
  const {
    state: { user },
    actions: { setUser },
  } = useGlobalContext();

  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const handleCheckAndPlay = () => {
    if (user) {
      setHasError(false);
      navigate("/game");
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="home_page">
      <img className="home_page--image" src={moleImage} />
      <h1 className="home_title" data-testid="home_title">
        Catch Moli
      </h1>
      <div className="home_content">
        <TextField
          error={hasError}
          className="home_username"
          label="Username"
          variant="standard"
          inputProps={{
            "data-testid": "home_username",
          }}
          FormHelperTextProps={{ "data-testid": "home_username--error" }}
          helperText={hasError ? "Enter a username" : ""}
          onChange={(value) => setUser(value.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleCheckAndPlay();
            }
          }}
        />
        <Button data-testid="home_button" variant="contained" onClick={handleCheckAndPlay}>
          Join
        </Button>
      </div>
    </div>
  );
};

export default Home;
