import React, { useContext, useEffect } from "react";

import Grid from "./Grid";
import ImagesBuffer from "./ImagesBuffer";
import Map from "./Map";
import CanvasContext from "./canvasContext";
import { MAP_DIMENSIONS, TILE_SIZE, MAP_TILE_IMAGES } from "./constants";
import useMapImages from "@/src/hooks/useMapImages";

const TileView = () => {
  const width = MAP_DIMENSIONS.COLS * TILE_SIZE;
  const height = MAP_DIMENSIONS.ROWS * TILE_SIZE;
  const ctx = useContext(CanvasContext);
  const { imageBuffer } = useMapImages();

  useEffect(() => {
    ctx && ctx.clearRect(0, 0, ctx.width, ctx.height);
  }, [ctx]);

  return (
    <>
      <ImagesBuffer />
      {Object.keys(imageBuffer.state).length ===
        Object.keys(MAP_TILE_IMAGES).length && (
        <>
          <Grid width={width} height={height}>
            <Map />
          </Grid>
        </>
      )}
      {/* {gameStatus.mapLoaded && <Character />} */}
    </>
  );
};

export default TileView;
