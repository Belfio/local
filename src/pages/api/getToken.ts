// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CommunityState } from "@/src/atoms/communityState";
import { getFunctions, httpsCallable } from "firebase/functions";
import { StreamChat } from "stream-chat";

type Data = {
  token: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const StreamChat = require("stream-chat").StreamChat;
  const serverClient = StreamChat.getInstance(
    "73jffwkgbu7v",
    "qxrsu994r9dwx5jykvn42h466z92gccnzm2becptxtx8k73c99cdax75zemqhsw4"
  );
  console.log("Fammi vedere", req, res);
  // generate a token for the user with id 'john'
  const token = serverClient.createToken("john");
  res.status(200).json({ token: token });
}
