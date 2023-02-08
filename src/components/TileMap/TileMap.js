import React, { useEffect, useState } from "react";
import Game from "./game";

const CANVAS_WIDTH = "100vw";
const CANVAS_HEIGHT = "100vh";

const TileMap = () => {
  const [isGameRunning, setGameRunning] = useState(false);
  const [game, setGame] = useState();
  const canvasRef = React.createRef();

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (!game) return;

    initGame();
    renderGame();
  }, [game]);

  const start = () => {
    if (!isGameRunning) {
      setGame(new Game(getContext()));
    }
    setGameRunning({ isGameRunning: !isGameRunning });
  };

  const initGame = async () => {
    await game.init();
  };

  const renderGame = () => {
    requestAnimationFrame((elapsed) => {
      game.render(elapsed);

      if (isGameRunning) {
        renderGame();
      }
    });
  };

  const getContext = () => canvasRef.current.getContext("2d");

  return (
    <div>
      <div className="gameContainer">
        <canvas
          ref={canvasRef}
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            background: "#04F489",
          }}
        />
      </div>
    </div>
  );
};

export default TileMap;
