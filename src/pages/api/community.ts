// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CommunityState } from "@/src/atoms/communityState";
import { getFunctions, httpsCallable } from "firebase/functions";
import { StreamChat } from "stream-chat";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

const functions = getFunctions();
const createCommunityCall = httpsCallable(functions, "createCommunity");

export const createCommunity = async (community: CommunityState) => {
  createCommunityCall(community)
    .then((result) => {
      // Read result of the Cloud Function.
      /** @type {any} */
      const data = result.data;
      const sanitizedMessage = data.text;
    })
    .catch((error) => {
      // Getting the Error details.
      const code = error.code;
      const message = error.message;
      const details = error.details;
    });
};
