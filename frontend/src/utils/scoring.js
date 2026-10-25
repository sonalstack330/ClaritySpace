const MAX_RATING = 5

export function calculateScores(options, criteria, ratings) {
  const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0)
  const maxPossible = MAX_RATING * totalWeight

  return options.map((option) => {
    const total = criteria.reduce((sum, criterion) => {
      const rating = ratings[option.id]?.[criterion.id] ?? 0
      return sum + rating * criterion.weight
    }, 0)

    const percent = maxPossible === 0 ? 0 : Math.round((total / maxPossible) * 100)

    return { id: option.id, name: option.name, total, percent }
  })
}