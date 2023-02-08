import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

export interface CommunityState {
  type: "public" | "restricted" | "paid";
  creatorId: string;
  id: string;
  createdAt: Timestamp;
  imageUrl?: string;
}

interface CommunityListState {
  communities: CommunityState[];
}

const defaultCommunityListState: CommunityListState = {
  communities: [],
};

export const communityListState = atom<CommunityListState>({
  key: "communityListState",
  default: defaultCommunityListState,
});

export const myCommunityListState = atom<CommunityListState>({
  key: "myCommunityListState",
  default: defaultCommunityListState,
});
