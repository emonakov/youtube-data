export interface ItemInterface {
  id: string
  snippet: {
    description: string
    title: string
    thumbnails: {
      medium: {
        height: number
        url: string
        width: number
      }
      high: {
        height: number
        url: string
        width: number
      }
    }
  }
}
