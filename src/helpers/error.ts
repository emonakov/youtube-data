export const reportError = (e: any, callback: (data: any) => void): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(e)
  }
  if (e.response) {
    callback(e.response.data)
  }
}
