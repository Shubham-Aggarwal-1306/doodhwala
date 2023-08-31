const service_account = require("./serviceAccountKey");

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(service_account),
});

module.exports = admin;
