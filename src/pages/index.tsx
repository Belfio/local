import { Flex } from "@chakra-ui/react";
import React from "react";
import ChatComponent from "../components/Chat/ChatComponent";
import CommunityNav from "../components/CommunityNav/CommunityNav";

type indexProps = {};
const Index: React.FC<indexProps> = () => {
  return (
    <Flex h="100vh">
      <Flex width="300px" h="100%">
        <Flex border="1px solid purple" width="80px" h="100%">
          <CommunityNav />
        </Flex>
        <Flex border="1px solid green" width="220px" height="100%">
          {/* <ChannelNav /> */}Chan
        </Flex>
      </Flex>
      <Flex border="1px solid black" width="100%" height="100%">
        <ChatComponent />
      </Flex>
    </Flex>
  );
};
export default Index;
