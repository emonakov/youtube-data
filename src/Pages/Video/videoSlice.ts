import axios from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk, RootState } from './videoStore'
import { API } from '../../config/api'
import { buildEndpointUrl } from '../../helpers/buildUrl'
import { VideoStateInterface } from '../../interfaces/VideoStateInterface'
import { ItemInterface } from '../../interfaces/ItemInterface'

const initialState: VideoStateInterface = {}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    loadData: (
      state: VideoStateInterface,
      action: PayloadAction<ItemInterface>,
    ) => {
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
    }
  },
})

export const { loadData, loadError, setIsLoading, cleanData } = videoSlice.actions

export const getVideo = (videoId: string): AppThunk => async (dispatch) => {
  const endpoint = buildEndpointUrl(API.getVideo, { v: videoId })

  dispatch(setIsLoading(true))

  try {
    const { data: { items } } = await axios.get(endpoint)
    const [item] = items
    dispatch(loadData(item))
  } catch (e) {
    console.error(e)
    dispatch(loadError(e.response.data))
  }

  dispatch(setIsLoading(false))
}

export const selectItem = (state: RootState) => state.video?.item
export const selectLoading = (state: RootState) => state.video?.loading

export default videoSlice.reducer
