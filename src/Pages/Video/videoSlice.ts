import axios from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk, RootState } from './videoStore'
import { API } from '../../config/api'
import { buildEndpointUrl } from '../../helpers/buildUrl'
import { reportError } from '../../helpers/error'
import { VideoStateInterface } from '../../interfaces/VideoStateInterface'
import { ItemInterface } from '../../interfaces/ItemInterface'

import {
  addToFavoritesStore,
  removeFromFavoritesStore,
  getAllFavoritesStore,
} from '../../helpers/favStore'

const initialState: VideoStateInterface = {}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    loadData: (
      state: VideoStateInterface,
      action: PayloadAction<ItemInterface>,
    ) => {
      state.error = undefined
      state.item = action.payload
    },
    loadError: (
      state: VideoStateInterface,
      action: PayloadAction<Partial<VideoStateInterface>>,
    ) => {
      state.error = action.payload.error
    },
    setIsLoading: (
      state: VideoStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.loading = action.payload
    },
    cleanData: (state: VideoStateInterface) => {
      state.item = undefined
    },
    initFavorites: (state: VideoStateInterface) => {
      state.favorites = getAllFavoritesStore()
    },
    addToFavorites: (
      state: VideoStateInterface,
      action: PayloadAction<string>,
    ) => {
      state.favorites?.push(action.payload)
      addToFavoritesStore(action.payload)
    },
    removeFromFavorites: (
      state: VideoStateInterface,
      action: PayloadAction<string>,
    ) => {
      state.favorites = state.favorites?.filter((fav) => fav !== action.payload)
      removeFromFavoritesStore(action.payload)
    },
  },
})

export const {
  loadData,
  loadError,
  setIsLoading,
  cleanData,
  initFavorites,
  addToFavorites,
  removeFromFavorites,
} = videoSlice.actions

export const getVideo = (videoId: string): AppThunk => async (dispatch) => {
  const endpoint = buildEndpointUrl(API.getVideo, { v: videoId })

  dispatch(setIsLoading(true))

  try {
    const {
      data: { items },
    } = await axios.get(endpoint)
    const [item] = items
    dispatch(loadData(item))
  } catch (e) {
    reportError(e, () => dispatch(loadError(e.response.data)))
  }

  dispatch(setIsLoading(false))
}

export const selectItem = (state: RootState) => state.video?.item
export const selectLoading = (state: RootState) => state.video?.loading
export const isFavSelector = (state: RootState, videoId: string) =>
  state.video.favorites?.includes(videoId)
export const selectError = (state: RootState) => state.video?.error

export default videoSlice.reducer
