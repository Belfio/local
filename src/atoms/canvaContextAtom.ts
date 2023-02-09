import { atom } from "recoil";

export interface ContextState {
  ctx?: CanvasRenderingContext2D;
  size: {
    width: number;
    height: number;
  };
}

const defailtModalState: ContextState = {
  ctx: undefined,
  size: {
    width: 1280,
    height: 640,
  },
};

export const canvaContextState = atom<ContextState>({
  key: "canvaContextState",
  default: defailtModalState,
});
