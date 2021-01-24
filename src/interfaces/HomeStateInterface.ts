import { ItemInterface } from './ItemInterface'

export interface HomeStateInterface {
  items?: Array<ItemInterface>
  nextPageToken?: string
  prevPageToken?: string
  error?: string
}
