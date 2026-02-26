import { useState, useEffect, useCallback, useMemo } from 'react'
import data from './data'

const soilsData = data.soilTypes
const quizQuestions = data.quizQuestions

// ─── Spaced Repetition (SM-2 inspired) ───
const SR_KEY = 'soils_sr_data'
const QUIZ_HISTORY_KEY = 'soils_quiz_history'
const QUIZ_STATE_KEY = 'soils_quiz_state'

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000)
}

function initSRCard(id) {
  return { id, ease: 2.5, interval: 0, repetitions: 0, nextReview: getToday(), status: 'new' }
}

function rateSRCard(card, quality) {
  // quality: 0-2 = fail, 3 = hard, 4 = good, 5 = easy
  const c = { ...card }
  if (quality >= 3) {
    if (c.repetitions === 0) c.interval = 1
    else if (c.repetitions === 1) c.interval = 3
    else c.interval = Math.round(c.interval * c.ease)
    c.repetitions++
    c.ease = Math.max(1.3, c.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
  } else {
    c.repetitions = 0
    c.interval = 0
    c.ease = Math.max(1.3, c.ease - 0.2)
  }
  const d = new Date()
  d.setDate(d.getDate() + c.interval)
  c.nextReview = d.toISOString().slice(0, 10)
  // status
  if (c.repetitions === 0) c.status = 'learning'
  else if (c.interval >= 21) c.status = 'mastered'
  else c.status = 'review'
  return c
}

function loadSR() {
  try { return JSON.parse(localStorage.getItem(SR_KEY)) || {} } catch { return {} }
}
function saveSR(data) { localStorage.setItem(SR_KEY, JSON.stringify(data)) }

function loadQuizHistory() {
  try { return JSON.parse(localStorage.getItem(QUIZ_HISTORY_KEY)) || [] } catch { return [] }
}
function saveQuizHistory(h) { localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(h)) }

function loadQuizState() {
  try { return JSON.parse(localStorage.getItem(QUIZ_STATE_KEY)) } catch { return null }
}
function saveQuizState(s) { localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(s)) }

// ─── App ───
function App() {
  const [mode, setMode] = useState(null)
  const [srData, setSrData] = useState({})
  const [quizHistory, setQuizHistory] = useState([])

  useEffect(() => {
    setSrData(loadSR())
    setQuizHistory(loadQuizHistory())
  }, [])

  const resetMode = () => setMode(null)

  const getSRCard = useCallback((id) => {
    return srData[id] || initSRCard(id)
  }, [srData])

  const updateSRCard = useCallback((id, quality) => {
    const card = getSRCard(id)
    const updated = rateSRCard(card, quality)
    const next = { ...srData, [id]: updated }
    setSrData(next)
    saveSR(next)
    return updated
  }, [srData, getSRCard])

  const resetFlashcardProgress = () => {
    if (!confirm('Reset all flashcard & spaced repetition progress?')) return
    setSrData({})
    localStorage.removeItem(SR_KEY)
  }

  const resetQuizProgress = () => {
    if (!confirm('Reset all quiz history and current quiz?')) return
    setQuizHistory([])
    localStorage.removeItem(QUIZ_HISTORY_KEY)
    localStorage.removeItem(QUIZ_STATE_KEY)
  }

  // SR stats
  const srStats = useMemo(() => {
    const today = getToday()
    let newCount = 0, learning = 0, review = 0, mastered = 0, dueCount = 0
    soilsData.forEach(s => {
      const c = srData[s.id]
      if (!c) { newCount++; dueCount++; return }
      if (c.status === 'mastered') mastered++
      else if (c.status === 'learning') learning++
      else review++
      if (c.nextReview <= today) dueCount++
    })
    return { new: newCount, learning, review, mastered, due: dueCount }
  }, [srData])

  return (
    <div>
      <div className="header">
        <h1>🌍 Soils of India — UPSC Prep</h1>
        <p>Master soil types for Prelims with spaced repetition & quizzes</p>
      </div>

      {!mode && (
        <>
          <div className="mode-selector">
            <div className="mode-card" onClick={() => setMode('flashcards')}>
              <div className="mode-icon">🧠</div>
              <h3>Spaced Review</h3>
              <p>{srStats.due} cards due today</p>
            </div>
            <div className="mode-card" onClick={() => setMode('browse')}>
              <div className="mode-icon">📚</div>
              <h3>Browse All</h3>
              <p>Explore {soilsData.length} soil types</p>
            </div>
            <div className="mode-card" onClick={() => setMode('quiz')}>
              <div className="mode-icon">❓</div>
              <h3>Quiz</h3>
              <p>{quizQuestions.length} UPSC-style MCQs</p>
            </div>
            <div className="mode-card" onClick={() => setMode('progress')}>
              <div className="mode-icon">📊</div>
              <h3>Progress</h3>
              <p>Track your learning</p>
            </div>
          </div>
        </>
      )}

      {mode && (
        <div className="content-area">
          <button className="btn btn-secondary" onClick={resetMode} style={{ marginBottom: 18 }}>
            ← Back
          </button>

          {mode === 'flashcards' && (
            <FlashcardMode srData={srData} getSRCard={getSRCard} updateSRCard={updateSRCard} />
          )}
          {mode === 'browse' && <BrowseMode />}
          {mode === 'quiz' && (
            <QuizMode quizHistory={quizHistory} setQuizHistory={setQuizHistory} />
          )}
          {mode === 'progress' && (
            <ProgressMode
              srStats={srStats}
              srData={srData}
              quizHistory={quizHistory}
              resetFlashcards={resetFlashcardProgress}
              resetQuiz={resetQuizProgress}
            />
          )}
        </div>
      )}
    </div>
  )
}

// ─── Flashcard Mode with Spaced Repetition ───
function FlashcardMode({ srData, getSRCard, updateSRCard }) {
  const [flipped, setFlipped] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [rated, setRated] = useState(false)

  const today = getToday()

  // Order: due cards first (sorted by nextReview asc), then new, then future
  const sortedCards = useMemo(() => {
    const cards = soilsData.map(s => {
      const sr = srData[s.id] || initSRCard(s.id)
      return { ...s, sr }
    })
    cards.sort((a, b) => {
      const aDue = a.sr.nextReview <= today
      const bDue = b.sr.nextReview <= today
      if (aDue && !bDue) return -1
      if (!aDue && bDue) return 1
      if (a.sr.status === 'new' && b.sr.status !== 'new') return -1
      if (b.sr.status === 'new' && a.sr.status !== 'new') return 1
      return a.sr.nextReview.localeCompare(b.sr.nextReview)
    })
    return cards
  }, [srData, today])

  const soil = sortedCards[cardIndex]
  if (!soil) return <p style={{ color: 'var(--text-secondary)' }}>No cards available.</p>

  const isDue = soil.sr.nextReview <= today
  const statusLabel = soil.sr.status === 'new' ? 'New' : soil.sr.status === 'learning' ? 'Learning' : soil.sr.status === 'mastered' ? 'Mastered' : 'Review'
  const statusClass = soil.sr.status || 'new'

  const dueCount = sortedCards.filter(c => (c.sr.nextReview <= today) || c.sr.status === 'new').length

  const handleRate = (quality) => {
    updateSRCard(soil.id, quality)
    setRated(true)
  }

  const next = () => {
    setFlipped(false)
    setRated(false)
    setCardIndex(i => Math.min(i + 1, sortedCards.length - 1))
  }

  const prev = () => {
    setFlipped(false)
    setRated(false)
    setCardIndex(i => Math.max(i - 1, 0))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <span className={`sr-badge ${statusClass}`}>{statusLabel}</span>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {isDue || soil.sr.status === 'new' ? '⚡ Due now' : `📅 Next: ${soil.sr.nextReview}`}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {dueCount} due · Card {cardIndex + 1}/{sortedCards.length}
        </span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((cardIndex + 1) / sortedCards.length) * 100}%` }} />
      </div>

      <div className="flashcard">
        <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
          <div className="flashcard-front">
            <h2 style={{ fontSize: '2.2rem', marginBottom: 14, color: 'var(--accent)' }}>{soil.name}</h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: 10 }}>{soil.category || ''}</div>
            {soil.coverage && <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{soil.coverage}</div>}
            <p className="flashcard-hint">tap to flip</p>
          </div>
          <div className="flashcard-back">
            <div style={{ width: '100%' }}>
              {soil.coverage && <div className="soil-info"><strong>Coverage:</strong> {soil.coverage}</div>}
              {soil.distribution && (
                <div className="soil-info"><strong>Found in:</strong> {soil.distribution.join(', ')}</div>
              )}
              {soil.richIn && <div className="soil-info"><strong>Rich in:</strong> {soil.richIn.join(', ')}</div>}
              {soil.poorIn && <div className="soil-info"><strong>Poor in:</strong> {soil.poorIn.join(', ')}</div>}
              {soil.suitableCrops && <div className="soil-info"><strong>Crops:</strong> {soil.suitableCrops.join(', ')}</div>}
              {soil.characteristics && (
                <ul style={{ margin: '10px 0', paddingLeft: 20 }}>
                  {soil.characteristics.map((c, i) => (
                    <li key={i} style={{ color: 'var(--text-secondary)', marginBottom: 4, fontSize: '0.95rem' }}>{c}</li>
                  ))}
                </ul>
              )}
              {soil.nickname && <div className="soil-info" style={{ marginTop: 8 }}><strong>Also known as:</strong> {soil.nickname}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Rating buttons */}
      {flipped && !rated && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 12, fontSize: '0.95rem' }}>How well did you know this?</p>
          <div className="controls" style={{ marginTop: 0 }}>
            <button className="btn btn-danger" onClick={() => handleRate(1)} style={{ fontSize: '0.9rem', padding: '10px 18px' }}>
              😵 Forgot
            </button>
            <button className="btn btn-secondary" onClick={() => handleRate(3)} style={{ fontSize: '0.9rem', padding: '10px 18px', borderColor: 'var(--warning)', color: 'var(--warning)' }}>
              🤔 Hard
            </button>
            <button className="btn btn-secondary" onClick={() => handleRate(4)} style={{ fontSize: '0.9rem', padding: '10px 18px', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              👍 Good
            </button>
            <button className="btn btn-primary" onClick={() => handleRate(5)} style={{ fontSize: '0.9rem', padding: '10px 18px' }}>
              🔥 Easy
            </button>
          </div>
        </div>
      )}

      {rated && (
        <p style={{ textAlign: 'center', color: 'var(--success)', marginTop: 16 }}>✓ Rated! Move to next card.</p>
      )}

      <div className="controls" style={{ marginTop: 18 }}>
        <button className="btn btn-secondary" onClick={prev} disabled={cardIndex === 0}>⬅ Prev</button>
        <button className="btn btn-primary" onClick={next} disabled={cardIndex === sortedCards.length - 1}>Next ➡</button>
      </div>
    </div>
  )
}

// ─── Browse Mode ───
function BrowseMode() {
  const [filter, setFilter] = useState('all')

  const getFiltered = () => {
    if (filter === 'all') return soilsData
    if (filter === 'high') return soilsData.filter(s => s.importance === 'HIGH')
    if (filter === 'medium') return soilsData.filter(s => s.importance === 'MEDIUM')
    if (filter === 'low') return soilsData.filter(s => s.importance === 'LOW')
    return soilsData
  }

  const soils = getFiltered()

  return (
    <div>
      <div className="filter-section">
        <h3>Filter by Importance</h3>
        <div className="filter-buttons">
          {[['all', `All (${soilsData.length})`], ['high', 'High'], ['medium', 'Medium'], ['low', 'Low']].map(([key, label]) => (
            <button key={key} className={`filter-btn ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <h2 style={{ marginBottom: 16, color: 'var(--text-primary)', fontSize: '1.2rem' }}>
        {soils.length} soil type{soils.length !== 1 ? 's' : ''}
      </h2>

      <div className="soils-grid">
        {soils.map(soil => (
          <div key={soil.id} className="soil-card">
            <h3>{soil.name}</h3>
            <div className="tags">
              {soil.importance && <span className={`tag ${soil.importance === 'HIGH' ? 'high' : ''}`}>{soil.importance}</span>}
              {soil.coverage && <span className="tag">{soil.coverage}</span>}
            </div>
            {soil.distribution && <div className="soil-info"><strong>Distribution:</strong> {soil.distribution.join(', ')}</div>}
            {soil.richIn && <div className="soil-info"><strong>Rich in:</strong> {soil.richIn.join(', ')}</div>}
            {soil.poorIn && <div className="soil-info"><strong>Poor in:</strong> {soil.poorIn.join(', ')}</div>}
            {soil.suitableCrops && <div className="soil-info"><strong>Crops:</strong> {soil.suitableCrops.join(', ')}</div>}
            {soil.characteristics && (
              <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
                {soil.characteristics.map((c, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 3 }}>{c}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Quiz Mode ───
function QuizMode({ quizHistory, setQuizHistory }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [showNav, setShowNav] = useState(false)

  // Restore in-progress quiz
  useEffect(() => {
    const saved = loadQuizState()
    if (saved) {
      setCurrentIndex(saved.currentIndex || 0)
      setScore(saved.score || 0)
      setAnswers(saved.answers || [])
      if (saved.answers?.[saved.currentIndex]) {
        setSelected(saved.answers[saved.currentIndex].selected)
      }
    }
  }, [])

  const persist = (idx, s, a) => saveQuizState({ currentIndex: idx, score: s, answers: a })

  const handleAnswer = (ansIdx) => {
    const correct = quizQuestions[currentIndex].correct === ansIdx
    const newAnswers = [...answers]

    if (newAnswers[currentIndex] !== undefined) {
      // Re-answering
      const oldCorrect = newAnswers[currentIndex].correct
      let newScore = score
      if (oldCorrect && !correct) newScore--
      if (!oldCorrect && correct) newScore++
      newAnswers[currentIndex] = { selected: ansIdx, correct }
      setScore(newScore)
      setAnswers(newAnswers)
      setSelected(ansIdx)
      persist(currentIndex, newScore, newAnswers)
    } else {
      const newScore = correct ? score + 1 : score
      newAnswers[currentIndex] = { selected: ansIdx, correct }
      setScore(newScore)
      setAnswers(newAnswers)
      setSelected(ansIdx)
      persist(currentIndex, newScore, newAnswers)
    }
  }

  const goTo = (idx) => {
    setCurrentIndex(idx)
    setSelected(answers[idx]?.selected ?? null)
    setShowNav(false)
    persist(idx, score, answers)
  }

  const next = () => {
    if (currentIndex < quizQuestions.length - 1) goTo(currentIndex + 1)
    else if (answers.length === quizQuestions.length) finish()
  }

  const prev = () => { if (currentIndex > 0) goTo(currentIndex - 1) }

  const finish = () => {
    setShowResult(true)
    localStorage.removeItem(QUIZ_STATE_KEY)
    const entry = { date: new Date().toISOString(), score, total: quizQuestions.length }
    const updated = [...quizHistory, entry]
    setQuizHistory(updated)
    saveQuizHistory(updated)
  }

  const restart = () => {
    setCurrentIndex(0)
    setScore(0)
    setAnswers([])
    setSelected(null)
    setShowResult(false)
    localStorage.removeItem(QUIZ_STATE_KEY)
  }

  if (showResult) {
    const pct = ((score / quizQuestions.length) * 100).toFixed(0)
    const emoji = pct >= 90 ? '🏆' : pct >= 75 ? '🌟' : pct >= 60 ? '👍' : pct >= 50 ? '😊' : '📚'

    return (
      <div className="result-screen">
        <div className="result-emoji">{emoji}</div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Quiz Complete!</h2>
        <div className="result-score">{score}/{quizQuestions.length}</div>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: 28 }}>{pct}%</p>

        <div style={{ textAlign: 'left', marginBottom: 28 }}>
          <h3 style={{ marginBottom: 14, color: 'var(--text-primary)' }}>Review</h3>
          {answers.map((a, idx) => (
            <div key={idx} className={`explanation-box ${a.correct ? 'correct-explain' : 'incorrect-explain'}`} style={{ marginBottom: 10 }}>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>Q{idx + 1}: {quizQuestions[idx].question}</p>
              <p style={{ fontSize: '0.95rem' }}>
                {a.correct ? '✓ Correct' : `✗ Your answer: ${quizQuestions[idx].options[a.selected]}`}
                {!a.correct && <><br />{quizQuestions[idx].explanation}</>}
              </p>
            </div>
          ))}
        </div>

        <div className="controls">
          <button className="btn btn-primary" onClick={restart}>🔄 Retry</button>
        </div>
      </div>
    )
  }

  const q = quizQuestions[currentIndex]

  return (
    <div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(answers.length / quizQuestions.length) * 100}%` }} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <button className="btn btn-secondary" onClick={() => setShowNav(true)} style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
          📋 Navigator ({answers.length}/{quizQuestions.length})
        </button>
      </div>

      {showNav && (
        <div className="modal-overlay" onClick={() => setShowNav(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ color: 'var(--text-primary)' }}>Question Navigator</h3>
              <button className="btn btn-secondary" onClick={() => setShowNav(false)} style={{ padding: '6px 14px' }}>✕</button>
            </div>
            <div className="nav-grid">
              {quizQuestions.map((_, idx) => {
                const a = answers[idx]
                let cls = 'nav-btn'
                if (idx === currentIndex) cls += ' current'
                if (a) cls += a.correct ? ' correct-nav' : ' incorrect-nav'
                return <button key={idx} className={cls} onClick={() => goTo(idx)}>{idx + 1}</button>
              })}
            </div>
          </div>
        </div>
      )}

      <div className="quiz-question">
        <h3>Question {currentIndex + 1} of {quizQuestions.length}</h3>
        <p style={{ fontSize: '1.15rem', marginBottom: 20, color: 'var(--text-primary)', lineHeight: 1.6 }}>{q.question}</p>

        <div className="quiz-options">
          {q.options.map((opt, idx) => {
            let cls = 'quiz-option'
            if (selected !== null) {
              if (idx === q.correct) cls += ' correct'
              else if (idx === selected) cls += ' incorrect'
            }
            return (
              <div key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
              </div>
            )
          })}
        </div>

        {selected !== null && (
          <div className={`explanation-box ${selected === q.correct ? 'correct-explain' : 'incorrect-explain'}`}>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>{selected === q.correct ? '✓ Correct!' : '✗ Incorrect'}</p>
            <p style={{ fontSize: '0.95rem' }}>{q.explanation}</p>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: 14, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        Score: {score}/{answers.length}
      </div>

      <div className="controls" style={{ marginTop: 14 }}>
        <button className="btn btn-secondary" onClick={prev} disabled={currentIndex === 0}>⬅ Prev</button>
        <button className="btn btn-primary" onClick={next}
          disabled={currentIndex === quizQuestions.length - 1 && answers.length < quizQuestions.length}>
          {currentIndex === quizQuestions.length - 1 && answers.length === quizQuestions.length ? '✓ Finish' : 'Next ➡'}
        </button>
      </div>

      <div className="controls" style={{ marginTop: 8 }}>
        <button className="btn btn-secondary" onClick={restart} style={{ fontSize: '0.9rem' }}>🔄 Reset Quiz</button>
      </div>
    </div>
  )
}

// ─── Progress Mode ───
function ProgressMode({ srStats, srData, quizHistory, resetFlashcards, resetQuiz }) {
  const total = soilsData.length
  const reviewed = total - srStats.new
  const pct = total ? ((srStats.mastered / total) * 100).toFixed(0) : 0

  const bestQuiz = quizHistory.length > 0
    ? Math.max(...quizHistory.map(h => Math.round((h.score / h.total) * 100)))
    : null

  return (
    <div>
      <h2 style={{ marginBottom: 20, color: 'var(--text-primary)', fontSize: '1.3rem' }}>📊 Your Progress</h2>

      {/* Flashcard Stats */}
      <h3 style={{ color: 'var(--text-secondary)', marginBottom: 12, fontSize: '1rem' }}>Spaced Repetition</h3>
      <div className="stats">
        <div className="stat-card">
          <h4>New</h4>
          <div className="value" style={{ color: '#818cf8' }}>{srStats.new}</div>
        </div>
        <div className="stat-card">
          <h4>Learning</h4>
          <div className="value" style={{ color: 'var(--warning)' }}>{srStats.learning}</div>
        </div>
        <div className="stat-card">
          <h4>Review</h4>
          <div className="value" style={{ color: 'var(--accent)' }}>{srStats.review}</div>
        </div>
        <div className="stat-card">
          <h4>Mastered</h4>
          <div className="value" style={{ color: 'var(--success)' }}>{srStats.mastered}</div>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mastery Progress</span>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{pct}%</span>
        </div>
        <div className="progress-bar" style={{ height: 14 }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
          {srStats.due} card{srStats.due !== 1 ? 's' : ''} due for review today
        </p>
      </div>

      {/* Per-soil breakdown */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: 12, fontSize: '1rem' }}>Card Status</h3>
        {soilsData.map(s => {
          const c = srData[s.id]
          const status = c ? c.status : 'new'
          return (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{s.name}</span>
              <span className={`sr-badge ${status}`}>{status}</span>
            </div>
          )
        })}
      </div>

      {/* Quiz History */}
      <h3 style={{ color: 'var(--text-secondary)', marginBottom: 12, fontSize: '1rem' }}>Quiz History</h3>
      {quizHistory.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>No quizzes taken yet.</p>
      ) : (
        <>
          {bestQuiz !== null && (
            <p style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>🏆 Best: {bestQuiz}%</p>
          )}
          {[...quizHistory].reverse().slice(0, 10).map((h, i) => (
            <div key={i} className="quiz-history-item">
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {new Date(h.date).toLocaleDateString()}
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {h.score}/{h.total} ({Math.round((h.score / h.total) * 100)}%)
              </span>
            </div>
          ))}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 8 }}>
            {quizHistory.length} attempt{quizHistory.length !== 1 ? 's' : ''} total
          </p>
        </>
      )}

      {/* Reset Buttons */}
      <div className="controls" style={{ marginTop: 32 }}>
        <button className="btn btn-danger" onClick={resetFlashcards}>🔄 Reset Flashcards</button>
        <button className="btn btn-danger" onClick={resetQuiz}>🔄 Reset Quiz History</button>
      </div>
    </div>
  )
}

export default App
