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
    setSearchToken: (
      state: HomeStateInterface,
      action: PayloadAction<string>,
    ) => {
      state.q = action.payload
    },
    loadData: (
      state: HomeStateInterface,
      action: PayloadAction<HomeStateInterface>,
    ) => {
      state.items = action.payload.items
      state.nextPageToken = action.payload.nextPageToken
      state.prevPageToken = action.payload.prevPageToken
    },
    loadError: (
      state: HomeStateInterface,
      action: PayloadAction<Partial<HomeStateInterface>>,
    ) => {
      state.error = action.payload.error
    },
  },
})

export const { loadData, loadError, setSearchToken } = homeSlice.actions

const getVideos = async ({
  apiUrl,
  pageToken,
  params,
  successCallback,
  errorCallback,
}: {
  apiUrl: string
  pageToken?: string
  params?: Record<string, any>
  successCallback: <T>(data: T) => void
  errorCallback: <T>(data: T) => void
}) => {
  let endpoint = buildEndpointUrl(apiUrl, params)
  if (pageToken) {
    endpoint = buildEndpointUrl(apiUrl, { ...params, pageToken })
  }

  try {
    const response = await axios.get(endpoint)
    successCallback(response.data)
  } catch (e) {
    console.error(e)
    errorCallback(e.response.data)
  }
}

export const getMostPopular = (pageToken?: string): AppThunk => async (
  dispatch,
) =>
  getVideos({
    apiUrl: API.mostPopularEndpoint,
    pageToken,
    successCallback: (data: HomeStateInterface) => dispatch(loadData(data)),
    errorCallback: (data: HomeStateInterface) => dispatch(loadError(data)),
  })

export const searchVideos = (
  searchToken?: string,
  pageToken?: string,
): AppThunk => async (dispatch) => {
  getVideos({
    apiUrl: API.searchVideos,
    pageToken,
    params: { q: searchToken },
    successCallback: (data: HomeStateInterface) => dispatch(loadData(data)),
    errorCallback: (data: HomeStateInterface) => dispatch(loadError(data)),
  })
}

export const selectItems = (state: RootState) => state.home?.items
export const selectPageTokens = (state: RootState) => [
  state.home.prevPageToken,
  state.home.nextPageToken,
]
export const selectSearchToken = (state: RootState) => state.home?.q

export default homeSlice.reducer
