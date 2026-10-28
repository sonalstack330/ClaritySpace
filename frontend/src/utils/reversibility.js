export function getReversibilityAdvice(level) {
  if (level === undefined || level === null) {
    return null
  }

  if (level <= 2) {
    return {
      key: 'easy',
      label: 'Easy to reverse',
      message:
        'You can change this later without much cost. Avoid spending too long optimising it, make a good-enough choice and adjust if needed.',
    }
  }

  if (level === 3) {
    return {
      key: 'moderate',
      label: 'Some cost to changing course',
      message:
        'Reversing this would take some effort. Spend a moderate amount of time on it and check your main assumptions.',
    }
  }

  return {
    key: 'hard',
    label: 'Hard to reverse',
    message:
      'This has long-term consequences. Take your time, gather more information and check your high-risk assumptions before committing.',
  }
}