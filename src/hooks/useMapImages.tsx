import React, { useEffect, useState } from "react";

export interface MapImage {
  name: string;
  state: number[];
}

const useCharacter = () => {
  const [imageBuffer, setBufferImage] = useState<MapImage>({
    name: "images",
    state: [],
  });

  const bufferImage = (path: number) => {
    if (path) {
      const newState = imageBuffer.state.splice(path, 0, 1);
      setBufferImage({
        ...imageBuffer,
        state: [...newState],
      });
    }
  };

  return {
    bufferImage,
    imageBuffer,
  };
};
export default useCharacter;
