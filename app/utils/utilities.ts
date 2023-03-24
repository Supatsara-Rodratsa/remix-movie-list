import { ICON } from '~/constants/constants'

export function countingRating(score: number): string[] {
  const starItem = []
  let totalScore = (score * 5) / 10
  let fullScore = 5

  while (fullScore > 0) {
    if (Math.trunc(totalScore) > 0) {
      starItem.push(ICON.FULL_STAR)
    } else if (totalScore >= 0.5) {
      starItem.push(ICON.HALF_STAR)
    } else {
      starItem.push(ICON.EMPTY_STAR)
    }
    totalScore -= 1
    fullScore--
  }
  return starItem
}
