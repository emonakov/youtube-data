import { ItemInterface } from './ItemInterface'

export interface HomeStateInterface {
  q?: string,
  items?: Array<ItemInterface>
  nextPageToken?: string
  prevPageToken?: string
  error?: string
}
