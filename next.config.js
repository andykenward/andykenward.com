require("dotenv").config()
const fetch = require("isomorphic-unfetch") // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function() {
    return {
      "/": { page: "/" },
    }
  },
  env: {
    ENDPOINT: process.env.ENDPOINT,
    SSR: process.env.SSR | 1,
  },
}
