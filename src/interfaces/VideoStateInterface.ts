import { ItemInterface } from './ItemInterface'

export interface VideoStateInterface {
  loading?: boolean
  error?: string
  item?: ItemInterface
}
