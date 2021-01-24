module.exports = {
  getEndpointUrl(endpoint, key, params = null) {
    let endpointUrl = endpoint.replace(':apiKey:', key)
    if (params) {
      const queryString = Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&')

      endpointUrl += `&${queryString}`
    }

    return endpointUrl
  },
}
