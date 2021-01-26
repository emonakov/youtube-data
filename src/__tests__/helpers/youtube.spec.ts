import { formatDurationToTime } from '../../helpers/youtube'

describe('formatDurationToTime', () => {
  it('formats youtube duration format to readable', () => {
    const duration = 'PT9M41S'
    expect(formatDurationToTime(duration)).toBe('00:09:41')
  });
});
