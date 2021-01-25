import store from 'store2'

export const isFavorite = (videoId: string): boolean => {
  const favs = store.get('favorites')
  const exists = favs?.includes(videoId)

  return !!exists
}

export const addToFavorites = (videoId: string): void => {
  if (!isFavorite(videoId)) {
    store.add('favorites', [videoId])
  }
}

export const removeFromFavorites = (videoId: string): void => {
  if (isFavorite(videoId)) {
    const favorites = store
      .get('favorites')
      .filter((fav: string) => fav !== videoId)
    store.set('favorites', favorites)
  }
}
