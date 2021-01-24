import axios from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk, RootState } from './homeStore'
import { API } from '../../config/api'
import { buildEndpointUrl } from '../../helpers/buildUrl'
import { HomeStateInterface } from '../../interfaces/HomeStateInterface'

const initialState: HomeStateInterface = {}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    loadData: (state, action: PayloadAction<HomeStateInterface>) => {
      state.items = action.payload.items
      state.nextPageToken = action.payload.nextPageToken
      state.prevPageToken = action.payload.prevPageToken
    },
    loadError: (state, action: PayloadAction<Partial<HomeStateInterface>>) => {
      state.error = action.payload.error
    },
  },
})

export const { loadData, loadError } = homeSlice.actions

export const getMostPopular = (pageToken?: string): AppThunk => async (
  dispatch,
) => {
  let endpoint = buildEndpointUrl(API.mostPopularEndpoint)
  if (pageToken) {
    endpoint = buildEndpointUrl(API.mostPopularEndpoint, { pageToken })
  }

  try {
    const response = await axios.get(endpoint)
    dispatch(loadData(response.data))
  } catch (e) {
    console.error(e)
    dispatch(loadError(e.response.data))
  }
}

export const selectItems = (state: RootState) => state.home?.items
export const selectPageTokens = (state: RootState) => [
  state.home.prevPageToken,
  state.home.nextPageToken,
]

export default homeSlice.reducer
