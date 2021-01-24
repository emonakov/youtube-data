export const buildEndpointUrl = (
  endpoint: string,
  params?: Record<string, any>,
): string => {
  let endpointUrl = endpoint
  if (params) {
    const queryString = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')

    endpointUrl += `?${queryString}`
  }

  return endpointUrl
}
