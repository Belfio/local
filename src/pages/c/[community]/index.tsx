import ChatComponent from "@/src/components/Chat/ChatComponent";
import CommunityNav from "@/src/components/CommunityNav/CommunityNav";
import CreateCommunity from "@/src/components/Modal/Auth/CreateCommunity";
import { Flex } from "@chakra-ui/react";
import React from "react";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  return (
    <Flex h="100vh">
      <CreateCommunity />

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
export default index;
