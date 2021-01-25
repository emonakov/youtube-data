import { ItemInterface } from './ItemInterface'
import { ErrorInterface } from './ErrorInterface'

export interface VideoStateInterface {
  loading?: boolean
  error?: ErrorInterface
  item?: ItemInterface
  favorites?: string[]
}
