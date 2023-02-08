import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import {
  communityListState,
  CommunityState,
  myCommunityListState,
} from "../atoms/communityState";
import { auth, firestore } from "../firebase/clientApp";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityListValue, setCommunityListValue] =
    useRecoilState(communityListState);
  const [myCommunities, setMyCommunities] =
    useRecoilState(myCommunityListState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: CommunityState,
    isJoined: boolean
  ) => {
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      console.log("Snippet?", snippets);
    } catch (error) {
      console.log("getMySnippers error", error);
    }
  };

  const getCommunityList = async () => {
    try {
      const snippetDocs = await getDocs(collection(firestore, `communities`));
      const snippets = snippetDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Communities", snippets);
      setCommunityListValue({ communities: snippets });
    } catch (error) {
      console.log("getCommunityList error", error);
    }
  };

  const joinCommunity = (communityData: CommunityState) => {};
  const leaveCommunity = (communityId: string) => {};

  useEffect(() => {
    getMySnippets();
    getCommunityList();
  }, [user]);

  return {
    myCommunities,
    communityListValue,
    onJoinOrLeaveCommunity,
  };
};
export default useCommunityData;
