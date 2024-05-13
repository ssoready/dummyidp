const jose = require("node-jose");
const fs = require("fs");

// Function to convert RSA private key to JWK
async function convertToJWK() {
  // Read the PEM formatted private key
  const keyPEM = fs.readFileSync("dummyidp.key");

  // Create a keystore
  const keystore = jose.JWK.createKeyStore();

  // Add the RSA private key to the keystore
  const jwk = await keystore.add(keyPEM, "pem");

  // Output the JWK
  console.log(JSON.stringify(jwk.toJSON(true), null, 4));
}

convertToJWK().catch(console.error);
