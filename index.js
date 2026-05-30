const functions = require("firebase-functions");
const server = require("./firebase-server.js").default;

exports.api = functions.https.onRequest(server);
