import store from 'store2'

if (!store.has('favorites')) {
  store.add('favorites', [])
}

export const addToFavoritesStore = (videoId: string): void => {
  store.add('favorites', [videoId])
}

export const removeFromFavoritesStore = (videoId: string): void => {
  const favorites = store
    .get('favorites')
    .filter((fav: string) => fav !== videoId)
  store.set('favorites', favorites)
}

export const getAllFavoritesStore = () => store.get('favorites')
