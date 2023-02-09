import Loader from "./loader";
import TileMap from "./constants";
import Camera from "./camera";
import Keyboard from "./keyboard";
import React from "react";

class Game {
  constructor({ ctx, size }) {
    this.ctx = ctx;
    this.size = size;
    this.loader = new Loader();
    this.tileMap = new TileMap(size);
    this.camera = new Camera(this.tileMap, size.width, size.height);
    this.keyboard = new Keyboard();
    this._previousElapsed = 0;
    this.hoverDrawing = { x: 0, y: 0 };
  }

  init = async () => {
    this.keyboard.listenForEvents([
      this.keyboard.LEFT,
      this.keyboard.RIGHT,
      this.keyboard.UP,
      this.keyboard.DOWN,
    ]);
    const tiles = await this.loader.loadImage("tiles", "./assets/tiles.png");
    this.tileAtlas = this.loader.getImage("tiles");
    this.images = {
      tiles,
    };
  };

  drawLayer = (layerIndex) => {
    var startColumn = Math.floor(this.camera.x / this.tileMap.tileSize);
    var endColumn = Math.floor(
      startColumn + this.camera.width / this.tileMap.tileSize
    );
    var startRow = Math.floor(this.camera.y / this.tileMap.tileSize);
    var endRow =
      startRow + Math.floor(this.camera.height / this.tileMap.tileSize);
    var offsetX = -this.camera.x + startColumn * this.tileMap.tileSize;
    var offsetY = -this.camera.y + startRow * this.tileMap.tileSize;
    const dim = { startColumn, endColumn, startRow, endRow, offsetX, offsetY };
    console.log("Dimensions", dim);
    for (
      let columnIndex = startColumn;
      columnIndex < endColumn;
      columnIndex++
    ) {
      for (let rowIndex = startRow; rowIndex < endRow; rowIndex++) {
        let tile = this.tileMap.getTile(layerIndex, columnIndex, rowIndex);
        const x = (columnIndex - startColumn) * this.tileMap.tileSize + offsetX;
        const y = (rowIndex - startRow) * this.tileMap.tileSize + offsetY;

        if (tile !== 0) {
          if (!this.tileAtlas) return;
          // console.log("X and Y", [
          //   this.tileAtlas, // image
          //   tile, // source x
          //   0, // source y
          //   this.tileMap.tileSize, // source width
          //   this.tileMap.tileSize, // source height
          //   Math.round(x), // target x
          //   Math.round(y), // target y
          //   this.tileMap.tileSize, // target width
          //   this.tileMap.tileSize,
          // ]); // target height]);
          // 0 => empty tile
          this.ctx.drawImage(
            this.tileAtlas, // image
            tile * this.tileMap.tileSize - this.tileMap.tileSize, // source x
            0, // source y
            this.tileMap.tileSize, // source width
            this.tileMap.tileSize, // source height
            Math.round(x), // target x
            Math.round(y), // target y
            this.tileMap.tileSize, // target width
            this.tileMap.tileSize // target height
          );
        }
      }
    }
  };

  update = (delta) => {
    // handle camera movement with arrow keys
    let dirX = 0;
    let dirY = 0;
    if (this.keyboard.isDown(this.keyboard.LEFT)) {
      dirX = -1;
    }
    if (this.keyboard.isDown(this.keyboard.RIGHT)) {
      dirX = 1;
    }
    if (this.keyboard.isDown(this.keyboard.UP)) {
      dirY = -1;
    }
    if (this.keyboard.isDown(this.keyboard.DOWN)) {
      dirY = 1;
    }
    this.camera.move(delta, dirX, dirY);
  };

  getDelta = (elapsed) => {
    // compute delta time in seconds -- also cap it
    let delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;
    return delta;
  };

  render = (elapsed) => {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height);
    console.log("let's render the game", this);
    // this.update(this.getDelta(elapsed));
    // draw map background layer
    this.drawLayer(0);
    // draw map top layer
    this.drawLayer(1);
  };

  drawMapTile = (position) => {
    const tile = this.tileMap.getTile(0, position.x, position.y);

    this.ctx.drawImage(
      this.tileAtlas, // image
      tile * this.tileMap.tileSize - this.tileMap.tileSize, // source x
      0, // source y
      this.tileMap.tileSize, // source width
      this.tileMap.tileSize, // source height
      position.x * this.tileMap.tileSize, // target x
      (position.y - 1) * this.tileMap.tileSize, // target y
      this.tileMap.tileSize, // target width
      this.tileMap.tileSize // target height
    );
  };

  hoverHighlight = (mousePosition) => {
    const tile = this.tileMap.getTile(0, mousePosition.x, mousePosition.y);
    // Don't draw in the twice in the same position
    if (
      this.hoverDrawing.x === mousePosition.x &&
      this.hoverDrawing.y === mousePosition.y
    )
      return;
    this.drawMapTile(this.hoverDrawing);
    this.hoverDrawing = { ...mousePosition };
    if (tile === 1) {
      this.ctx.drawImage(
        this.tileAtlas, // image
        6 * this.tileMap.tileSize - this.tileMap.tileSize, // source x
        0, // source y
        this.tileMap.tileSize, // source width
        this.tileMap.tileSize, // source height
        Math.round(mousePosition.x * this.tileMap.tileSize), // target x
        Math.round((mousePosition.y - 1) * this.tileMap.tileSize), // target y
        this.tileMap.tileSize, // target width
        this.tileMap.tileSize // target height
      );
    }
  };
}
export default Game;
