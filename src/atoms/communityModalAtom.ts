import { atom } from "recoil";

export interface CommunityModalState {
  open: boolean;
  // view: "login" | "signup" | "resetPassword";
}

const defaultModalState: CommunityModalState = {
  open: false,
  // view: "login",
};

export const communityModalState = atom<CommunityModalState>({
  key: "communityModalState",
  default: defaultModalState,
});
