import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import videoReducer from './videoSlice'

export const store = configureStore({
  reducer: {
    video: videoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
