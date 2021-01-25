export interface ErrorInterface {
  code: number
  message: string
  errors: Array<{
    message: string
    domain: string
    reason: string
    location: string
    locationType: string
  }>
}
