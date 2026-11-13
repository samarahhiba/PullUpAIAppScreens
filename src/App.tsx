import { type CSSProperties, type ReactNode, useEffect, useState } from 'react'

const pullupPhoto =
  'https://images.unsplash.com/photo-1790697497235-81d0f47574a7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=900'

type MainTab = 'home' | 'history' | 'profile'
type AppScreen = MainTab | 'details' | 'recording' | 'analysis'

type Session = {
  id: number
  date: string
  time: string
  totalReps: number
  cleanReps: number
  formScore: number
}

type IconName =
  | 'camera'
  | 'home'
  | 'history'
  | 'profile'
  | 'arrow'
  | 'check'
  | 'clock'
  | 'flash'
  | 'chevron'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    camera: (
      <>
        <path d="M8.5 6.5 10 4h4l1.5 2.5H19a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2h3.5Z" />
        <circle cx="12" cy="12.5" r="3.5" />
      </>
    ),
    home: (
      <>
        <path d="m3.5 10.5 8.5-7 8.5 7" />
        <path d="M5.5 9v11h13V9M9.5 20v-6h5v6" />
      </>
    ),
    history: (
      <>
        <path d="M4.5 7.5V3m0 4.5H9" />
        <path d="M5 7a8 8 0 1 1-1 8" />
        <path d="M12 8v4.5l3 2" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21c.7-4 3.2-6 7.5-6s6.8 2 7.5 6" />
      </>
    ),
    arrow: <path d="m14.5 5-7 7 7 7" />,
    check: <path d="m5 12.5 4.2 4L19 7" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
    flash: <path d="m13.5 2-7 11h5L10.5 22l7-12h-5l1-8Z" />,
    chevron: <path d="m9 6 6 6-6 6" />,
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons">
        <span className="signal" />
        <span className="wifi">⌁</span>
        <span className="battery"><i /></span>
      </div>
    </div>
  )
}

function Phone({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className="phone-wrap">
      <div className={`phone ${className}`}>
        <StatusBar />
        {children}
        <div className="home-indicator" />
      </div>
    </section>
  )
}

function Logo() {
  return (
    <div className="brand">
      <div className="logo-mark">
        <span />
        <i />
        <b />
      </div>
      <strong>PullUp <em>AI</em></strong>
    </div>
  )
}

function BottomNav({
  active,
  onNavigate,
}: {
  active: MainTab
  onNavigate: (tab: MainTab) => void
}) {
  const tabs: { id: MainTab; label: string; icon: IconName }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'profile', label: 'Profile', icon: 'profile' },
  ]

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {tabs.map((tab) => (
        <button
          className={active === tab.id ? 'nav-active' : ''}
          type="button"
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          aria-current={active === tab.id ? 'page' : undefined}
        >
          <Icon name={tab.icon} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

function ProgressChart({ sessions }: { sessions: Session[] }) {
  const scores = [68, 73, 71, 78, 80, sessions[0]?.formScore ?? 82]
  const days = ['M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="progress-card">
      <div className="progress-copy">
        <div><h2>Your Progress</h2><span>Weekly form score</span></div>
        <strong>+8% <small>this week</small></strong>
      </div>
      <div className="progress-chart" aria-label="Weekly form score chart">
        {scores.map((score, index) => (
          <div className="chart-column" key={`${days[index]}-${index}`}>
            <span className="chart-value">{score}</span>
            <div className="chart-track"><i style={{ height: `${Math.max(24, score - 42)}%` }} /></div>
            <small>{days[index]}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

function HomeScreen({
  onRecord,
  sessions,
  onNavigate,
}: {
  onRecord: () => void
  sessions: Session[]
  onNavigate: (tab: MainTab) => void
}) {
  const latest = sessions[0] ?? { date: 'Today', time: '8:24 AM', totalReps: 10, cleanReps: 8, formScore: 82 }

  return (
    <Phone>
      <div className="home-content">
        <Logo />
        <div className="hero-copy">
          <div className="eyebrow"><span /> AI FORM COACH</div>
          <h1>Every Rep. Better.</h1>
          <p>Your personal AI pull-up coach.</p>
        </div>
        <div className="home-hero">
          <img src={pullupPhoto} alt="Athlete performing a strict pull-up in a dark gym" />
          <div className="home-hero-shade" />
          <svg className="hero-pose" viewBox="0 0 340 170" preserveAspectRatio="none" aria-hidden="true">
            <g fill="none" stroke="#38D9FF" strokeWidth="1.4" strokeLinecap="round" opacity=".82">
              <path d="M132 47 166 58 202 47M132 47 110 14M202 47l25-34M166 58l2 55-31 42M168 113l34 42M145 92l23 21 25-21" />
            </g>
            <g fill="#38D9FF" stroke="#07101D" strokeWidth="1.3">
              {[[110,14],[227,13],[132,47],[202,47],[166,58],[145,92],[193,92],[168,113],[137,155],[202,155]].map(([x,y], i) => (
                <circle cx={x} cy={y} r={i < 2 ? 3 : 3.5} key={i} />
              ))}
            </g>
          </svg>
          <span className="hero-status"><i /> FORM TRACKING READY</span>
          <span className="hero-angle">SIDE VIEW · 90°</span>
        </div>
        <button className="primary record-button" type="button" onClick={onRecord}>
          <span className="button-icon"><Icon name="camera" size={24} /></span>
          <span><b>Record New Set</b><small>Start instant form analysis</small></span>
          <Icon name="chevron" size={20} />
        </button>
        <div className="section-row">
          <h2>Last session</h2>
          <span>{latest.date}, {latest.time}</span>
        </div>
        <div className="session-card">
          <div className="score-ring" style={{ '--score': `${latest.formScore}%` } as CSSProperties}><strong>{latest.formScore}</strong><small>FORM</small></div>
          <div className="session-stats">
            <div><b>{latest.totalReps}</b><span>Total reps</span></div>
            <div><b className="green">{latest.cleanReps}</b><span>Clean reps</span></div>
          </div>
        </div>
        <div className="tip">
          <span className="tip-icon"><Icon name="flash" size={18} /></span>
          <p><small>NEXT FOCUS</small><b>Reach full extension at the bottom.</b></p>
          <Icon name="chevron" size={17} />
        </div>
        <ProgressChart sessions={sessions} />
      </div>
      <BottomNav active="home" onNavigate={onNavigate} />
    </Phone>
  )
}

function EmptyHistory({ onRecord }: { onRecord: () => void }) {
  return (
    <div className="empty-history">
      <div className="empty-illustration">
        <svg viewBox="0 0 180 120" aria-hidden="true">
          <path d="M33 28h114M43 29v64M137 29v64" />
          <path d="M67 38c3 17 12 26 23 26s20-9 23-26" className="accent-line" />
          <circle cx="90" cy="72" r="12" />
          <path d="M90 84v17M76 111l14-10 14 10" />
          <path d="m64 91 12-11 10 7 18-20 13 9" className="chart-line" />
        </svg>
      </div>
      <h2>No sessions yet</h2>
      <p>Your pull-up sessions will appear here after your first recording.</p>
      <button className="primary" type="button" onClick={onRecord}><Icon name="camera" /> Record Your First Set</button>
    </div>
  )
}

function HistoryScreen({
  sessions,
  onNavigate,
  onRecord,
  onOpenSession,
}: {
  sessions: Session[]
  onNavigate: (tab: MainTab) => void
  onRecord: () => void
  onOpenSession: (session: Session) => void
}) {
  return (
    <Phone>
      <div className="main-screen-content">
        <div className="page-header">
          <div><span>PERFORMANCE LOG</span><h1>History</h1></div>
          <Logo />
        </div>
        {sessions.length === 0 ? (
          <EmptyHistory onRecord={onRecord} />
        ) : (
          <>
            <div className="history-overview">
              <div><span>THIS MONTH</span><strong>{sessions.length}</strong><small>sessions</small></div>
              <div><span>TOTAL REPS</span><strong>{sessions.reduce((sum, item) => sum + item.totalReps, 0)}</strong><small>completed</small></div>
              <div><span>AVG. FORM</span><strong>{Math.round(sessions.reduce((sum, item) => sum + item.formScore, 0) / sessions.length)}%</strong><small>score</small></div>
            </div>
            <div className="history-heading">
              <h2>Recent sessions</h2>
              <span>{sessions.length} total</span>
            </div>
            <div className="history-list">
              {sessions.map((session) => (
                <button className="history-card" type="button" key={session.id} onClick={() => onOpenSession(session)}>
                  <div className="history-date"><strong>{session.date}</strong><span>{session.time}</span></div>
                  <div className="history-metrics">
                    <div><b>{session.totalReps}</b><span>reps</span></div>
                    <div><b className="green">{session.cleanReps}</b><span>clean</span></div>
                  </div>
                  <div className="history-score"><strong>{session.formScore}%</strong><span>FORM</span></div>
                  <Icon name="chevron" size={18} />
                </button>
              ))}
            </div>
            <button className="secondary-action" type="button" onClick={onRecord}><Icon name="camera" /> Record New Set</button>
          </>
        )}
      </div>
      <BottomNav active="history" onNavigate={onNavigate} />
    </Phone>
  )
}

function ProfileScreen({
  sessions,
  onNavigate,
}: {
  sessions: Session[]
  onNavigate: (tab: MainTab) => void
}) {
  const totalReps = sessions.reduce((sum, session) => sum + session.totalReps, 0)
  const average = sessions.length
    ? `${Math.round(sessions.reduce((sum, session) => sum + session.formScore, 0) / sessions.length)}%`
    : '—'

  return (
    <Phone>
      <div className="main-screen-content profile-content">
        <div className="page-header">
          <div><span>ATHLETE PROFILE</span><h1>Profile</h1></div>
          <Logo />
        </div>
        <div className="profile-identity">
          <div className="avatar"><span>GM</span><i /></div>
          <div><h2>Gym Member</h2><p>PullUp AI Athlete</p></div>
        </div>
        <div className="profile-stats">
          <div><strong>{sessions.length}</strong><span>Total sessions</span></div>
          <div><strong>{totalReps}</strong><span>Total reps</span></div>
          <div><strong>{average}</strong><span>Avg. form</span></div>
        </div>
        <section className="goal-card">
          <div className="goal-icon"><Icon name="flash" /></div>
          <div><span>PERSONAL FITNESS GOAL</span><h2>Complete 12 strict pull-ups</h2><p>Build consistent form through the full range of motion.</p></div>
          <div className="goal-progress"><i /></div>
          <small>8 of 12 clean reps</small>
        </section>
        <div className="settings-section">
          <h2>Settings</h2>
          {[
            ['Training preferences', 'Form cues and goals'],
            ['Notifications', 'Session reminders'],
            ['Privacy & data', 'Manage your activity'],
          ].map(([title, detail]) => (
            <button type="button" className="setting-row" key={title}>
              <span className="setting-dot" />
              <span><b>{title}</b><small>{detail}</small></span>
              <Icon name="chevron" size={18} />
            </button>
          ))}
        </div>
        <button className="secondary-action profile-home" type="button" onClick={() => onNavigate('home')}>
          Back to Home
        </button>
      </div>
      <BottomNav active="profile" onNavigate={onNavigate} />
    </Phone>
  )
}

function SetupIllustration() {
  return (
    <div className="setup-illustration" aria-label="Side view illustration of pull-up camera setup">
      <svg viewBox="0 0 330 224" role="img">
        <defs>
          <linearGradient id="setupGlow" x1="0" x2="1">
            <stop stopColor="#3578ff" stopOpacity=".25" />
            <stop offset="1" stopColor="#38d9ff" stopOpacity=".04" />
          </linearGradient>
        </defs>
        <path d="M15 195h300" stroke="#253249" strokeWidth="2" />
        <rect x="74" y="24" width="184" height="8" rx="4" fill="#8190a7" />
        <path d="M85 28v38M248 28v38" stroke="#4c5d77" strokeWidth="4" />
        <ellipse cx="173" cy="117" rx="89" ry="85" fill="url(#setupGlow)" />
        <circle cx="168" cy="65" r="14" fill="#d7e0ee" />
        <path d="M160 78c-6 25-1 57 9 73l16-3c7-31 7-54-4-70" fill="#3578ff" />
        <path d="m161 85-29-31-12-23M181 84l25-32 10-22" stroke="#d7e0ee" strokeWidth="9" strokeLinecap="round" />
        <circle cx="120" cy="30" r="5" fill="#30d98a" />
        <circle cx="216" cy="30" r="5" fill="#30d98a" />
        <path d="m169 148-21 45M180 147l22 46" stroke="#d7e0ee" strokeWidth="10" strokeLinecap="round" />
        <rect x="281" y="113" width="24" height="43" rx="5" fill="#17243a" stroke="#38d9ff" strokeWidth="2" />
        <circle cx="293" cy="119" r="2" fill="#30d98a" />
        <path d="M281 134 225 94M281 142l-55 37" stroke="#38d9ff" strokeWidth="1.5" strokeDasharray="4 5" opacity=".8" />
        <path d="M293 156v33m-12 4 12-4 12 4" stroke="#6c7b92" strokeWidth="3" strokeLinecap="round" />
        <rect x="24" y="166" width="82" height="25" rx="12.5" fill="#101d32" stroke="#263650" />
        <circle cx="39" cy="178.5" r="4" fill="#30d98a" />
        <text x="50" y="182" fill="#cbd5e1" fontSize="12" fontFamily="Inter, sans-serif">FULL BODY</text>
      </svg>
    </div>
  )
}

function SetDetailsScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const steps = [
    ['01', 'Position at a side angle', 'Set your phone 2–3 metres away.'],
    ['02', 'Keep your body visible', 'Fit head, hands and feet in frame.'],
    ['03', 'Show the pull-up bar', 'Make sure both grips are visible.'],
  ]
  return (
    <Phone>
      <div className="screen-content details-content">
        <button type="button" onClick={onBack} className="back-button" aria-label="Back to home"><Icon name="arrow" /></button>
        <div className="title-block">
          <span>SETUP GUIDE</span>
          <h1>Get Ready<br />to Record</h1>
        </div>
        <SetupIllustration />
        <div className="steps">
          {steps.map(([number, title, text]) => (
            <div className="step" key={number}>
              <b>{number}</b>
              <p><strong>{title}</strong><span>{text}</span></p>
              <span className="step-check"><Icon name="check" size={14} /></span>
            </div>
          ))}
        </div>
        <div className="ready-indicator">
          <span className="ready-dot"><i /></span>
          <p><b>Camera ready</b><small>Good lighting detected</small></p>
          <Icon name="check" size={18} />
        </div>
        <button className="primary bottom-action" type="button" onClick={onContinue}>Continue to Camera <Icon name="chevron" /></button>
      </div>
    </Phone>
  )
}

function PoseOverlay({ analysis = false }: { analysis?: boolean }) {
  return (
    <svg className={`pose-overlay ${analysis ? 'analysis-pose' : ''}`} viewBox="0 0 330 430" preserveAspectRatio="none">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g stroke={analysis ? '#30d98a' : '#38d9ff'} strokeWidth="3">
          <path d="M122 89 163 103 198 91" />
          <path d="m122 89-29-54M198 91l31-57" />
          <path d="m163 103 3 104-39 91M166 207l37 91" />
          <path d="m138 173 28 34 31-34" />
        </g>
        <g fill={analysis ? '#30d98a' : '#dffaff'} stroke="#07111f" strokeWidth="2">
          {[[93,35],[229,34],[122,89],[198,91],[163,103],[138,173],[197,173],[166,207],[127,298],[203,298]].map(([x,y], i) => (
            <circle cx={x} cy={y} r={i < 2 ? 5 : 6} key={i} />
          ))}
        </g>
        {analysis && (
          <>
            <path d="M113 84a26 26 0 0 1 17-17" stroke="#30d98a" strokeWidth="2" />
            <path d="M207 86a25 25 0 0 0-17-18" stroke="#30d98a" strokeWidth="2" />
            <path d="M124 297h-24" stroke="#f59e0b" strokeWidth="3" />
            <circle cx="95" cy="297" r="5" fill="#f59e0b" />
          </>
        )}
      </g>
    </svg>
  )
}

function RecordScreen({ onBack, onFinish }: { onBack: () => void; onFinish: () => void }) {
  const [seconds, setSeconds] = useState(38)
  const [reps, setReps] = useState(6)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        const next = value + 1
        if (next % 4 === 0) {
          setReps((rep) => Math.min(rep + 1, 10))
        }
        return next
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const time = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`

  return (
    <Phone className="camera-screen">
      <div className="camera-header">
        <button type="button" onClick={onBack} className="back-button glass" aria-label="Back to set details"><Icon name="arrow" /></button>
        <div><span>LIVE ANALYSIS</span><h1>Record Your Set</h1></div>
        <button className="flash-button" type="button"><Icon name="flash" /></button>
      </div>
      <div className="camera-view">
        <img src={pullupPhoto} alt="Athlete performing a pull-up in a gym" />
        <div className="camera-shade" />
        <div className="tracking-label"><i /> BODY TRACKED</div>
        <div className="frame-corners" />
        <PoseOverlay />
        <div className="alignment-line"><span>BAR LINE</span></div>
        <div className="rep-counter"><small>CURRENT</small><strong>Rep {reps}</strong><span>GOOD FORM</span></div>
        <div className="live-tip"><span><Icon name="check" size={16} /></span><p><b>Strong rep</b><small>Keep your core engaged</small></p></div>
      </div>
      <div className="record-controls">
        <div className="timer"><i /><span>{time}</span><small>RECORDING</small></div>
        <button className="finish-button" type="button" onClick={onFinish}><span className="stop-icon" /> Finish Set</button>
      </div>
    </Phone>
  )
}

function AnalysisScreen({
  onBack,
  onRestart,
  session,
}: {
  onBack: () => void
  onRestart: () => void
  session: Session
}) {
  const feedback = [
    ['good', 'Controlled lowering', 'Steady 2.1 sec descent'],
    ['good', 'Stable body position', 'Minimal forward swing'],
    ['improve', 'Extend arms fully', 'At the bottom of each rep'],
  ]
  return (
    <Phone>
      <div className="screen-content analysis-content">
        <div className="analysis-header">
          <button type="button" onClick={onBack} className="back-button" aria-label="Back to recording"><Icon name="arrow" /></button>
          <div><span>SET COMPLETE</span><h1>Your Form Analysis</h1></div>
        </div>
        <div className="success-banner">
          <span><Icon name="check" size={19} /></span>
          <p><b>Set Analyzed!</b><small>Great work — {session.cleanReps} of {session.totalReps} reps were clean.</small></p>
        </div>
        <div className="summary-grid">
          <div><small>TOTAL REPS</small><strong>{session.totalReps}</strong><span>Set complete</span></div>
          <div><small>CLEAN REPS</small><strong className="green">{session.cleanReps}</strong><span>{Math.round(session.cleanReps / session.totalReps * 100)}% accuracy</span></div>
          <div className="form-score"><small>FORM SCORE</small><strong>{session.formScore}<sup>%</sup></strong><span className="score-bar"><i style={{ width: `${session.formScore}%` }} /></span></div>
        </div>
        <div className="analysis-video">
          <img src={pullupPhoto} alt="Analyzed pull-up frame showing pose tracking" />
          <div className="camera-shade" />
          <PoseOverlay analysis />
          <span className="frame-time">REP 8 · 00:31</span>
          <span className="good-label"><i /> Stable</span>
          <span className="improve-label"><i /> Extend</span>
          <button type="button" className="play-button" aria-label="Play analyzed set"><span /></button>
        </div>
        <div className="feedback-heading"><h2>Coach feedback</h2><span>3 insights</span></div>
        <div className="feedback-list">
          {feedback.map(([type, title, detail]) => (
            <div className={type} key={title}>
              <span className="feedback-icon"><Icon name={type === 'good' ? 'check' : 'arrow'} size={15} /></span>
              <p><b>{title}</b><small>{detail}</small></p>
              <span className="feedback-tag">{type === 'good' ? 'GOOD' : 'IMPROVE'}</span>
            </div>
          ))}
        </div>
        <button className="primary analysis-action" type="button" onClick={onRestart}><Icon name="camera" size={20} /> Record Another Set</button>
      </div>
    </Phone>
  )
}

export default function App() {
  const starterSessions: Session[] = [
    { id: 1, date: 'Today', time: '8:24 AM', totalReps: 10, cleanReps: 8, formScore: 82 },
    { id: 2, date: 'May 18', time: '6:42 PM', totalReps: 9, cleanReps: 7, formScore: 79 },
    { id: 3, date: 'May 15', time: '7:10 AM', totalReps: 8, cleanReps: 6, formScore: 76 },
  ]
  const [screen, setScreen] = useState<AppScreen>('home')
  const [sessions, setSessions] = useState<Session[]>(starterSessions)
  const [selectedSession, setSelectedSession] = useState<Session>(starterSessions[0])
  const [analysisOrigin, setAnalysisOrigin] = useState<'recording' | 'history'>('recording')

  const navigateTab = (tab: MainTab) => setScreen(tab)
  const startRecording = () => setScreen('details')
  const finishRecording = () => {
    const now = new Date()
    const newSession: Session = {
      id: Date.now(),
      date: 'Today',
      time: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      totalReps: 10,
      cleanReps: 8,
      formScore: 82,
    }
    setSessions((current) => [newSession, ...current])
    setSelectedSession(newSession)
    setAnalysisOrigin('recording')
    setScreen('analysis')
  }
  const openSession = (session: Session) => {
    setSelectedSession(session)
    setAnalysisOrigin('history')
    setScreen('analysis')
  }

  const screens: Record<AppScreen, ReactNode> = {
    home: <HomeScreen onRecord={startRecording} sessions={sessions} onNavigate={navigateTab} />,
    history: <HistoryScreen sessions={sessions} onNavigate={navigateTab} onRecord={startRecording} onOpenSession={openSession} />,
    profile: <ProfileScreen sessions={sessions} onNavigate={navigateTab} />,
    details: <SetDetailsScreen onBack={() => setScreen('home')} onContinue={() => setScreen('recording')} />,
    recording: <RecordScreen onBack={() => setScreen('details')} onFinish={finishRecording} />,
    analysis: (
      <AnalysisScreen
        session={selectedSession}
        onBack={() => setScreen(analysisOrigin === 'history' ? 'history' : 'recording')}
        onRestart={() => setScreen('home')}
      />
    ),
  }

  return (
    <main className="prototype single-stage">
      <div className="screen-transition" key={screen}>
        {screens[screen]}
      </div>
    </main>
  )
}
