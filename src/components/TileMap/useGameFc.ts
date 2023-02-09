// import Loader from "./loader";
// import TileMap from "./constants";
// import Camera from "./camera";
// import Keyboard from "./keyboard";
// import { useState } from "react";
// import { useRecoilValue } from "recoil";
// import { canvaContextState } from "@/src/atoms/canvaContextAtom";

// const useGame = () => {
//   const [_previousElapsed, setPreviousElapsed] = useState(0);
//   const [tileAtlas, setTileAtlas] = useState();
//   const [images, setimages] = useState();
//   const context = useRecoilValue(canvaContextState);

//   const loader = new Loader();
//   const tileMap = new TileMap(size);
//   const camera = new Camera(tileMap, context.size.width, context.size.height);
//   const keyboard = new Keyboard();

//   const init = async () => {
//     keyboard.listenForEvents([
//       keyboard.LEFT,
//       keyboard.RIGHT,
//       keyboard.UP,
//       keyboard.DOWN,
//     ]);
//     const tiles = await loader.loadImage("tiles", "./assets/tiles.png");
//     const tileAtlasImages = loader.getImage("tiles");
//     setTileAtlas(tileAtlasImages);
//     setimages({ tiles });
//   };

//   const drawLayer = (layerIndex: number) => {
//     var startColumn = Math.floor(camera.x / tileMap.tileSize);
//     var endColumn = startColumn + camera.width / tileMap.tileSize;
//     var startRow = Math.floor(camera.y / tileMap.tileSize);
//     var endRow = startRow + Math.floor(camera.height / tileMap.tileSize);
//     var offsetX = -camera.x + startColumn * tileMap.tileSize;
//     var offsetY = -camera.y + startRow * tileMap.tileSize;
//     // const dim = { startColumn, endColumn, startRow, endRow, offsetX, offsetY };
//     for (
//       let columnIndex = startColumn;
//       columnIndex < endColumn;
//       columnIndex++
//     ) {
//       for (let rowIndex = startRow; rowIndex < endRow; rowIndex++) {
//         let tile = tileMap.getTile(layerIndex, columnIndex, rowIndex);
//         const x = (columnIndex - startColumn) * tileMap.tileSize + offsetX;
//         const y = (rowIndex - startRow) * tileMap.tileSize + offsetY;
//         if (tile !== 0) {
//           // 0 => empty tile
//           ctx.drawImage(
//             images, // image
//             // (tile - 1) * tileMap.tileSize, // source x
//             0, // source x
//             0, // source y
//             tileMap.tileSize, // source width
//             tileMap.tileSize, // source height
//             Math.round(x), // target x
//             Math.round(y), // target y
//             tileMap.tileSize, // target width
//             tileMap.tileSize // target height
//           );
//         }
//       }
//     }
//   };

//   const update = (delta: number) => {
//     // handle camera movement with arrow keys
//     let dirX = 0;
//     let dirY = 0;
//     if (keyboard.isDown(keyboard.LEFT)) {
//       dirX = -1;
//     }
//     if (keyboard.isDown(keyboard.RIGHT)) {
//       dirX = 1;
//     }
//     if (keyboard.isDown(keyboard.UP)) {
//       dirY = -1;
//     }
//     if (keyboard.isDown(keyboard.DOWN)) {
//       dirY = 1;
//     }

//     camera.move(delta, dirX, dirY);
//   };

//   const getDelta = (elapsed: number) => {
//     // compute delta time in seconds -- also cap it
//     let delta = (elapsed - _previousElapsed) / 1000.0;
//     delta = Math.min(delta, 0.25); // maximum delta of 250 ms
//     setPreviousElapsed(elapsed);
//     return delta;
//   };

//   const render = (elapsed: number) => {
//     if (!context.ctx) return;
//     console.log("CTX", ctx);
//     // context.fillStyle = "rgb(200, 0, 0)";
//     // context.fillRect(10, 10, 50, 50);

//     context.ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
//     context.ctx.fillRect(30, 30, 50, 50);
//     // context.ctx.drawImage(
//     //   tileAtlas, // image
//     //   // (tile - 1) * tileMap.tileSize, // source x
//     //   0, // source x
//     //   0, // source y
//     //   tileMap.tileSize, // source width
//     //   tileMap.tileSize, // source height
//     //   0, // target x
//     //   0, // target y
//     //   tileMap.tileSize, // target width
//     //   tileMap.tileSize // target height
//     // );
//     // update(getDelta(elapsed));
//     // draw map background layer
//     // drawLayer(0);
//     // draw map top layer
//     // drawLayer(1);
//   };
//   return {
//     render,
//     init,
//   };
// };
// export default useGame;
