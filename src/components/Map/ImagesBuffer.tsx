import useMapImages from "@/src/hooks/useMapImages";
import Image from "next/image";
import React from "react";
import { MAP_TILE_IMAGES } from "./constants";

const ImagesBuffer = () => {
  const { bufferImage } = useMapImages();
  return (
    <div className="images-buffer">
      {Object.keys(MAP_TILE_IMAGES).map((key) => {
        return (
          <Image
            key={`map-tile-img-${key}`}
            id={`map-tile-img-${key}`}
            src={`/${MAP_TILE_IMAGES[key]}`}
            alt={`map-tile-${key}`}
            onLoad={() => {
              bufferImage(MAP_TILE_IMAGES[key]);
            }}
            width={32}
            height={32}
          />
        );
      })}
    </div>
  );
};
export default ImagesBuffer;
