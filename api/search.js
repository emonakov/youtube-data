const axios = require('axios')
const cache = require('axios-cache-plugin')

let http = cache.default(axios)

const { getEndpointUrl } = require('./helpers/buildUrl')
http.__addFilter(/v3\/search/)

const {
  YOUTUBE_API_KEY,
  YOUTUBE_SEARCH_API_URL,
  YOUTUBE_SEARCH_MAX_RESULTS,
} = process.env

module.exports = async (req, res) => {
  const { pageToken, q } = req.query
  const endpointUrl = getEndpointUrl(YOUTUBE_SEARCH_API_URL, YOUTUBE_API_KEY, {
    q,
    maxResults: YOUTUBE_SEARCH_MAX_RESULTS,
    ...(pageToken && { pageToken }),
  })
  try {
    const response = await http.get(endpointUrl)

    res.status(response.status)
    res.header(response.header)
    res.json(response.data)
  } catch (e) {
    res.status(500)
    res.json(e)
  }
}
