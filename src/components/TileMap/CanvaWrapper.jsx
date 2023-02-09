import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Game from "./game";
import { canvaContextState } from "@/src/atoms/canvaContextAtom";

const CANVAS_WIDTH = "100vw";
const CANVAS_HEIGHT = "100vh";
const tileSize = 64;
const canvasRef = React.createRef();

const CanvaWrapper = () => {
  // const [isGameRunning, setGameRunning] = useState(false);
  // const [windowDimensions, setWindowDimensions] = useState({
  //   width: 1024,
  //   height: 670,
  // });
  // // const [context, setContext] = useState();
  const [game, setGame] = useState();
  const [init, setInitDone] = useState(false);
  const [context, setContext] = useRecoilState(canvaContextState);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const { init, render } = useGame();

  // Init
  useEffect(() => {
    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }
    function handleResize() {
      setContext({ ...context, size: getWindowDimensions() });
    }

    window.addEventListener("resize", handleResize);
    const ctx = canvasRef.current.getContext("2d");
    setContext({
      ctx: ctx,
      size: getWindowDimensions(),
    });

    if (game) game.render();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse listener
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: Math.floor(event.clientX / tileSize),
        y: Math.floor(event.clientY / tileSize),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Create the Game
  useEffect(() => {
    if (!context.ctx) return;
    if (game) return;
    console.log("We got a context", context);
    setGame(new Game({ ...context }));
  }, [context]);

  // Init the game
  useEffect(() => {
    const initTheGame = async () => {
      await game.init();
      game.render();
      setInitDone(true);
    };
    if (!game) return;
    if (init) return;
    console.log("We got a game", game);

    initTheGame();
  }, [game]);

  useEffect(() => {
    if (!game) return;
    game.hoverHighlight(mousePosition);
  }, [mousePosition]);

  return (
    <div>
      Mouse Position: {JSON.stringify(mousePosition)}
      <div className="GameContainer">
        <canvas
          ref={canvasRef}
          width={context.size.width}
          height={context.size.height}
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

export default CanvaWrapper;
