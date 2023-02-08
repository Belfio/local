import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { StreamChat } from "stream-chat";
import { auth } from "../firebase/clientApp";

const GET_TOKEN_URL =
  process.env.NEXT_PUBLIC_API_URL_GET_TOKEN2 + "/api/getToken";
const STREAM_SECRET = process.env.NEXT_PUBLIC_STREAM_SECRET as string;

const useChat = () => {
  const [user] = useAuthState(auth);
  const [token, setToken] = useState();
  const [channel, setChannel] = useState();
  const [channelList, setChannelList] = useState([]);
  const [chatClient, setChatClient] = useState<any>();

  useEffect(() => {
    console.log("useEffect no trigger");
    if (!user) return;
    if (!token) getToken();
  }, []);

  useEffect(() => {
    console.log("useEffect token get app client", token);
    if (!token) return;
    const client = StreamChat.getInstance(STREAM_SECRET);
    setChatClient(client);
  }, [token]);

  useEffect(() => {
    console.log("useEffect chatClient connect user", chatClient);
    if (!chatClient) return;
    if (!token) return;
    const connectToApi = async () => {
      const set = await chatClient.connectUser({ id: "john" }, token);
    };
    connectToApi();
    // const handleConnectionChange = ({ online = false }) => {
    //   if (!online) return console.log("connection lost");
    // };

    // chatClient.on("connection.changed", handleConnectionChange);
    // chatClient.connectUser(
    //   {
    //     id: "john",
    //     name: "Dave Matthews",
    //   },
    //   token
    // );

    // return () => {
    //   chatClient.off("connection.changed", handleConnectionChange);
    //   chatClient.disconnectUser().then(() => console.log("connection closed"));
    // };
  }, [chatClient]);

  // Get Channels
  useEffect(() => {
    console.log("useEffect chatClient get channels", chatClient);
    if (!chatClient) return;

    const filter = { members: { $in: ["john"] } };
    const sort = [{ last_message_at: -1 }];

    const queryChannels = async () => {
      try {
        console.log("querying?");
        const channelsList = await chatClient.queryChannels(filter, sort, {
          watch: true, // this is the default
          state: true,
        });
        console.log("queried?", channelsList);

        setChannelList(channelsList);
      } catch (error) {
        console.log("errore richiedendo i canali", error);
      }
    };

    queryChannels();
    if (channelList) setChannel(channelList[0]);
  }, [chatClient]);

  const getToken = async () => {
    console.log("pattern", GET_TOKEN_URL);
    const tokenData = await fetch(GET_TOKEN_URL as string).then((res) =>
      res.json()
    );
    if (!tokenData) return;
    setToken(tokenData?.token);
    return tokenData?.token;
  };

  const createChannel = async (name: string, description: string) => {
    if (!chatClient) throw "No chatClient";
    const newChannel = chatClient.channel("messaging", name, {
      members: ["john"],
    });
    await newChannel.create();
    setChannel(newChannel);
  };

  return {
    createChannel,
    getToken,
    token,
    channel,
    chatClient,
    channelList,
  };
};
export default useChat;
