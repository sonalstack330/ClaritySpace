import { useState } from 'react'
import { calculateScores } from '../utils/scoring'

const initialOptions = [
  { id: 'java', name: 'Learn Java and Spring Boot' },
  { id: 'frontend', name: 'Learn frontend development' },
  { id: 'aptitude', name: 'Prepare for aptitude and interviews' },
]

const initialCriteria = [
  { id: 'career', name: 'Career relevance', weight: 5 },
  { id: 'interest', name: 'Personal interest', weight: 4 },
  { id: 'timefit', name: 'Time fit', weight: 3 },
]

const initialRatings = {
  java: { career: 5, interest: 4, timefit: 3 },
  frontend: { career: 4, interest: 5, timefit: 4 },
  aptitude: { career: 4, interest: 3, timefit: 4 },
}

function CompareOptions() {
  const [options] = useState(initialOptions)
  const [criteria, setCriteria] = useState(initialCriteria)
  const [ratings, setRatings] = useState(initialRatings)

  function handleWeightChange(criterionId, value) {
    setCriteria(
      criteria.map((criterion) =>
        criterion.id === criterionId
          ? { ...criterion, weight: Number(value) }
          : criterion
      )
    )
  }

  function handleRatingChange(optionId, criterionId, value) {
    setRatings({
      ...ratings,
      [optionId]: {
        ...ratings[optionId],
        [criterionId]: Number(value),
      },
    })
  }

  const results = calculateScores(options, criteria, ratings)
  const bestPercent = Math.max(...results.map((result) => result.percent))

  return (
    <>
      <header className="page-header">
        <h2>Compare Options</h2>
        <p>Rate your options against what matters to you.</p>
      </header>

      <section className="card">
        <div className="matrix-wrapper">
          <table className="matrix">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Importance</th>
                {options.map((option) => (
                  <th key={option.id}>{option.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion) => (
                <tr key={criterion.id}>
                  <td>{criterion.name}</td>
                  <td>
                    <div className="weight-control">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={criterion.weight}
                        onChange={(event) =>
                          handleWeightChange(criterion.id, event.target.value)
                        }
                      />
                      <span className="weight-value">{criterion.weight}</span>
                    </div>
                  </td>
                  {options.map((option) => (
                    <td key={option.id}>
                      <select
                        value={ratings[option.id]?.[criterion.id] ?? 0}
                        onChange={(event) =>
                          handleRatingChange(option.id, criterion.id, event.target.value)
                        }
                      >
                        <option value="0">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="results">
        {results.map((result) => (
          <div
            key={result.id}
            className={`card score-card ${
              result.percent === bestPercent && bestPercent > 0 ? 'best' : ''
            }`}
          >
            <h3>{result.name}</h3>
            <p className="score-percent">{result.percent}%</p>
            <div className="score-bar">
              <div
                className="score-bar-fill"
                style={{ width: `${result.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default CompareOptions

