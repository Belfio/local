import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const getToken = require("./getToken");

const express = require("express");

admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    db.collection("users")
      .doc(user.uid)
      .set(JSON.parse(JSON.stringify(user)));
  });

// Using Express
// const app = express();

// app.get("/chatToken", async (req: any, res: any) => {
//   const token = getToken();

//   res.status(200).send(token);
// });

// exports.user = functions.https.onRequest(app);

// // export const addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   console.log("REQ", req);
//   console.log("RES", res);
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   // const writeResult = await admin
//   //   .firestore()
//   //   .collection("messages")
//   //   .add({ original: original });
//   // Send back a message that we've successfully written the message
//   const token = getToken();
//   res.json({ token });
// });

// export const getChatToken = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   console.log("REQ", req);
//   console.log("RES", res);
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   // const writeResult = await admin
//   //   .firestore()
//   //   .collection("messages")
//   //   .add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `addMessage call working` });
// });
