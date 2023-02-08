import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { Button, Flex, Text } from "@chakra-ui/react";
import useChat from "@/src/hooks/useChat";
import { communityModalState } from "@/src/atoms/communityModalAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
type ChatProps = {};

const ChatComponent = () => {
  const { chatClient, channelList } = useChat();
  const [modalState, setOpenModal] = useRecoilState(communityModalState);
  const [channel, setChannel] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { community } = router.query;

  useEffect(() => {
    let newChannel = channelList.find((channel) => channel.id === community);
    if (!newChannel || !chatClient) {
      setError("Error loading the channel");
      setLoading(false);
      return;
    }
    setError("");
    setChannel(newChannel);
    setLoading(false);
  }, [channelList]);

  const handleOpen = () => {
    setOpenModal({
      ...modalState,
      open: true,
    });
  };

  return (
    <Flex>
      <Flex>
        <Text>{community}</Text>
      </Flex>
      <Flex align="center">
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {error && <Text>{error}</Text>}
      </Flex>
      {!error && !loading && (
        <>
          <Chat client={chatClient}>
            <Channel channel={channel}>
              {/* <Window> */}
              <ChannelHeader />
              <MessageList />
              <MessageInput />
              {/* </Window> */}
              <Thread />
            </Channel>
          </Chat>
        </>
      )}
    </Flex>
  );
};
export default ChatComponent;
