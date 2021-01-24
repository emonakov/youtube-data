const axios = require('axios')
const cache = require('axios-cache-plugin')

let http = cache.default(axios)

const { getEndpointUrl } = require('../helpers/buildUrl')
http.__addFilter(/v3\/videos/)

const {
  YOUTUBE_API_KEY,
  YOUTUBE_VIDEO_API_URL,
  YOUTUBE_SEARCH_MAX_RESULTS,
} = process.env

module.exports = async (req, res) => {
  const { pageToken } = req.query
  const endpointUrl = getEndpointUrl(YOUTUBE_VIDEO_API_URL, YOUTUBE_API_KEY, {
    chart: 'mostPopular',
    maxResults: YOUTUBE_SEARCH_MAX_RESULTS,
    ...(pageToken && { pageToken }),
  })

  try {
    const response = await http.get(endpointUrl)

    res.status(response.status)
    res.json(response.data)
  } catch (e) {
    console.error(e.response.data)
    res.status(e.response.status)
    res.json(e.response.data)
  }
}
