import { getReversibilityAdvice } from '../utils/reversibility'

function ReversibilityNote({ level }) {
  const advice = getReversibilityAdvice(level)

  if (!advice) {
    return null
  }

  return (
    <p className={`advice advice-${advice.key}`}>
      <strong>{advice.label}.</strong> {advice.message}
    </p>
  )
}

export default ReversibilityNote