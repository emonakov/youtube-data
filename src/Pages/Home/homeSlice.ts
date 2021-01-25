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
    cleanSearchToken: (state: HomeStateInterface) => {
      state.q = undefined
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
    setIsLoading: (
      state: HomeStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.loading = action.payload
    },
  },
})

export const {
  loadData,
  loadError,
  setSearchToken,
  setIsLoading,
  cleanSearchToken,
} = homeSlice.actions

const getVideos = async ({
  apiUrl,
  pageToken,
  params,
  successCallback,
  errorCallback,
  setLoading,
}: {
  apiUrl: string
  pageToken?: string
  params?: Record<string, any>
  successCallback: <T>(data: T) => void
  errorCallback: <T>(data: T) => void
  setLoading: (isLoading: boolean) => void
}) => {
  let endpoint = buildEndpointUrl(apiUrl, params)
  if (pageToken) {
    endpoint = buildEndpointUrl(apiUrl, { ...params, pageToken })
  }
  setLoading(true)

  try {
    const response = await axios.get(endpoint)
    successCallback(response.data)
  } catch (e) {
    console.error(e)
    errorCallback(e.response.data)
  }

  setLoading(false)
}

export const getMostPopular = (pageToken?: string): AppThunk => async (
  dispatch,
) =>
  getVideos({
    apiUrl: API.mostPopularEndpoint,
    pageToken,
    successCallback: (data: HomeStateInterface) => dispatch(loadData(data)),
    errorCallback: (data: HomeStateInterface) => dispatch(loadError(data)),
    setLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
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
    setLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  })
}

export const selectItems = (state: RootState) => state.home?.items
export const selectPageTokens = (state: RootState) => [
  state.home.prevPageToken,
  state.home.nextPageToken,
]
export const selectSearchToken = (state: RootState) => state.home?.q
export const selectLoading = (state: RootState) => state.home?.loading

export default homeSlice.reducer
