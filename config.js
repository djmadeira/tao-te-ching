// @ts-check

const config = {
    endpoint: "https://tao-te-ching.documents.azure.com:443/",
    key: "cGr7n4A7AqTt3CYemxXt6KqlWzdxA5cPShNYkLlHdq2tm7Y0zvv4rfVPrtBqHqPBVBDLpi8WgMJHtfkoQCcvpw==",
    databaseId: "TaoTeChing",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/index"] }
  };

  module.exports = config;
