const durationToSeconds = (duration: string): number => {
  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  if (match) {
    match = match.slice(1).map((x) => {
      if (x != null) {
        return x.replace(/\D/, '')
      }

      return ''
    })

    var hours = parseInt(match[0]) || 0
    var minutes = parseInt(match[1]) || 0
    var seconds = parseInt(match[2]) || 0

    return hours * 3600 + minutes * 60 + seconds
  }

  return 0
}

const secondsToHms = (seconds: number): string => {
  const days = Math.floor(seconds / 86400)
  const remainderSeconds = seconds % 86400
  const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19)
  return hms.replace(/^(\d+)/, (h) =>
    `${Number(h) + days * 24}`.padStart(2, '0'),
  )
}

export const formatDurationToTime = (duration: string) =>
  secondsToHms(durationToSeconds(duration))
