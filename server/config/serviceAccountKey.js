const dotenv = require("dotenv");
dotenv.config();

const service_account = {
  type: "service_account",
  project_id: "swapshop-395810",
  private_key_id: "43cfac6ed3ef4c10f60457f8f2c23e95b0e38ae1",
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: "firebase-adminsdk-uf0n5@swapshop-395810.iam.gserviceaccount.com",
  client_id: "101005880513781092260",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uf0n5%40swapshop-395810.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

module.exports = service_account;
