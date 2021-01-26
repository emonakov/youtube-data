import store from 'store2'
import {
  addToFavoritesStore,
  removeFromFavoritesStore,
  getAllFavoritesStore,
} from '../../helpers/favStore'

jest.mock('store2')
const mockStore = store as jest.Mocked<typeof store>

describe('addToFavoritesStore', () => {
  it('adds to store', () => {
    addToFavoritesStore('videoId')
    expect(mockStore.add).toHaveBeenCalledWith('favorites', ['videoId'])
  })
})

describe('removeFromFavoritesStore', () => {
  it('removes from favorites', () => {
    mockStore.get.mockImplementation(() => ['storedVideoId', 'videoId'])
    removeFromFavoritesStore('videoId')
    expect(mockStore.set).toHaveBeenCalledWith('favorites', ['storedVideoId'])
  })
})

describe('getAllFavoritesStore', () => {
  it('gets all favorites', () => {
    mockStore.get.mockImplementation(() => ['storedVideoId', 'videoId'])
    const favorites = getAllFavoritesStore()
    expect(favorites).toEqual(['storedVideoId', 'videoId'])
  })
})
