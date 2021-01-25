interface VideoId {
  videoId: string
}

export interface ItemInterface {
  id: string | VideoId
  etag: string
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
  player: {
    embedHtml: string
  }
  statistics: {
    commentCount: number
    dislikeCount: number
    favoriteCount: number
    likeCount: number
    viewCount: number
  }
  contentDetails: {
    duration: string
  }
}
