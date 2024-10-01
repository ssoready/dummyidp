/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"], // we need to support POSTs from arbitrary SAML SPs
    },
  },
};
