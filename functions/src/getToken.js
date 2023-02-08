import { StreamChat } from "stream-chat";

// type Data = {
//   token: string;
// };

export default function getToken() {
  //   const StreamChat = require("stream-chat").StreamChat;
  const serverClient = StreamChat.getInstance(
    "73jffwkgbu7v",
    "qxrsu994r9dwx5jykvn42h466z92gccnzm2becptxtx8k73c99cdax75zemqhsw4"
  );
  console.log("Richiedo il token");
  // generate a token for the user with id 'john'
  const token = serverClient.createToken("john");
  return token;
}
