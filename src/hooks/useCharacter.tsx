import React, { useEffect, useState } from "react";

export interface Character {
  name: string;
  state: {
    x: number;
    y: number;
    heroClass: string;
    heroImg: string | null;
  };
}

const useCharacter = () => {
  const [character, setCharacter] = useState<Character>({
    name: "character",
    state: {
      x: 6,
      y: 6,
      heroClass: "FLAME_SWORDSMAN",
      heroImg: null,
    },
  });

  const move = (x: number, y: number) => {
    setCharacter({
      ...character,
      state: {
        ...character.state,
        x: character.state.x + x,
        y: character.state.y + y,
      },
    });
  };

  const bufferImage = (heroImg: string) => {
    setCharacter({
      ...character,
      state: {
        ...character.state,
        heroImg: heroImg,
      },
    });
  };

  return {
    move,
    bufferImage,
    character,
  };
};
export default useCharacter;
