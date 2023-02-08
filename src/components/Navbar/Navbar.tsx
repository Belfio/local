import { auth } from "@/src/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthModal from "../Modal/Auth/AuthModal";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import useCommunityData from "@/src/hooks/useCommunityData";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { communityListValue } = useCommunityData();
  return (
    <Flex bg="white" height="48px" padding="6px 20px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="logo" height="32px" pr={4} />
      </Flex>
      <SearchInput />
      <AuthModal />
      <RightContent user={user} />
      {/* <Directory />
       */}
    </Flex>
  );
};

export default Navbar;
