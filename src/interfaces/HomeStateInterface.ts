import { ItemInterface } from './ItemInterface'
import { ErrorInterface } from './ErrorInterface'

export interface HomeStateInterface {
  q?: string,
  items?: Array<ItemInterface>
  nextPageToken?: string
  prevPageToken?: string
  error?: ErrorInterface
  loading?: boolean
}
