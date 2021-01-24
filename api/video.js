const axios = require('axios')
const cache = require('axios-cache-plugin')

let http = cache.default(axios)

const { getEndpointUrl } = require('../helpers/buildUrl')
http.__addFilter(/v3\/video/)

const { YOUTUBE_API_KEY, YOUTUBE_VIDEO_API_URL } = process.env

module.exports = async (req, res) => {
  const { v } = req.query
  const endpointUrl = getEndpointUrl(YOUTUBE_VIDEO_API_URL, YOUTUBE_API_KEY, {
    id: v,
  })
  try {
    const response = await http.get(endpointUrl)

    res.status(response.status)
    res.json(response.data)
  } catch (e) {
    console.error(e)
    res.status(500)
    res.json(e)
  }
}
