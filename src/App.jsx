import { useState, useEffect, useMemo } from 'react'

// ============================================================
// DATOS DEL ÁLBUM
// ============================================================

const TEAMS = [
  // CONMEBOL
  { code: 'ARG', name: 'Argentina', confed: 'CONMEBOL', flag: '🇦🇷' },
  { code: 'BRA', name: 'Brasil', confed: 'CONMEBOL', flag: '🇧🇷' },
  { code: 'URU', name: 'Uruguay', confed: 'CONMEBOL', flag: '🇺🇾' },
  { code: 'COL', name: 'Colombia', confed: 'CONMEBOL', flag: '🇨🇴' },
  { code: 'ECU', name: 'Ecuador', confed: 'CONMEBOL', flag: '🇪🇨' },
  { code: 'PAR', name: 'Paraguay', confed: 'CONMEBOL', flag: '🇵🇾' },
  // CONCACAF
  { code: 'MEX', name: 'México', confed: 'CONCACAF', flag: '🇲🇽' },
  { code: 'USA', name: 'Estados Unidos', confed: 'CONCACAF', flag: '🇺🇸' },
  { code: 'CAN', name: 'Canadá', confed: 'CONCACAF', flag: '🇨🇦' },
  { code: 'PAN', name: 'Panamá', confed: 'CONCACAF', flag: '🇵🇦' },
  { code: 'HAI', name: 'Haití', confed: 'CONCACAF', flag: '🇭🇹' },
  { code: 'CUW', name: 'Curazao', confed: 'CONCACAF', flag: '🇨🇼' },
  // UEFA
  { code: 'FRA', name: 'Francia', confed: 'UEFA', flag: '🇫🇷' },
  { code: 'ESP', name: 'España', confed: 'UEFA', flag: '🇪🇸' },
  { code: 'ENG', name: 'Inglaterra', confed: 'UEFA', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'POR', name: 'Portugal', confed: 'UEFA', flag: '🇵🇹' },
  { code: 'GER', name: 'Alemania', confed: 'UEFA', flag: '🇩🇪' },
  { code: 'NED', name: 'Países Bajos', confed: 'UEFA', flag: '🇳🇱' },
  { code: 'BEL', name: 'Bélgica', confed: 'UEFA', flag: '🇧🇪' },
  { code: 'CRO', name: 'Croacia', confed: 'UEFA', flag: '🇭🇷' },
  { code: 'SUI', name: 'Suiza', confed: 'UEFA', flag: '🇨🇭' },
  { code: 'AUT', name: 'Austria', confed: 'UEFA', flag: '🇦🇹' },
  { code: 'NOR', name: 'Noruega', confed: 'UEFA', flag: '🇳🇴' },
  { code: 'SCO', name: 'Escocia', confed: 'UEFA', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { code: 'SWE', name: 'Suecia', confed: 'UEFA', flag: '🇸🇪' },
  { code: 'TUR', name: 'Turquía', confed: 'UEFA', flag: '🇹🇷' },
  { code: 'CZE', name: 'República Checa', confed: 'UEFA', flag: '🇨🇿' },
  { code: 'BIH', name: 'Bosnia y Herz.', confed: 'UEFA', flag: '🇧🇦' },
  // CAF
  { code: 'MAR', name: 'Marruecos', confed: 'CAF', flag: '🇲🇦' },
  { code: 'EGY', name: 'Egipto', confed: 'CAF', flag: '🇪🇬' },
  { code: 'SEN', name: 'Senegal', confed: 'CAF', flag: '🇸🇳' },
  { code: 'TUN', name: 'Túnez', confed: 'CAF', flag: '🇹🇳' },
  { code: 'ALG', name: 'Argelia', confed: 'CAF', flag: '🇩🇿' },
  { code: 'GHA', name: 'Ghana', confed: 'CAF', flag: '🇬🇭' },
  { code: 'CIV', name: 'Costa de Marfil', confed: 'CAF', flag: '🇨🇮' },
  { code: 'RSA', name: 'Sudáfrica', confed: 'CAF', flag: '🇿🇦' },
  { code: 'CPV', name: 'Cabo Verde', confed: 'CAF', flag: '🇨🇻' },
  { code: 'COD', name: 'RD Congo', confed: 'CAF', flag: '🇨🇩' },
  // AFC
  { code: 'JPN', name: 'Japón', confed: 'AFC', flag: '🇯🇵' },
  { code: 'KOR', name: 'Corea del Sur', confed: 'AFC', flag: '🇰🇷' },
  { code: 'AUS', name: 'Australia', confed: 'AFC', flag: '🇦🇺' },
  { code: 'IRN', name: 'Irán', confed: 'AFC', flag: '🇮🇷' },
  { code: 'KSA', name: 'Arabia Saudita', confed: 'AFC', flag: '🇸🇦' },
  { code: 'QAT', name: 'Catar', confed: 'AFC', flag: '🇶🇦' },
  { code: 'UZB', name: 'Uzbekistán', confed: 'AFC', flag: '🇺🇿' },
  { code: 'JOR', name: 'Jordania', confed: 'AFC', flag: '🇯🇴' },
  { code: 'IRQ', name: 'Irak', confed: 'AFC', flag: '🇮🇶' },
  // OFC
  { code: 'NZL', name: 'Nueva Zelanda', confed: 'OFC', flag: '🇳🇿' },
]

const CONFED_ORDER = ['CONMEBOL', 'CONCACAF', 'UEFA', 'CAF', 'AFC', 'OFC']

const CONFED_META = {
  CONMEBOL: { label: 'Sudamérica', color: '#0ea5e9' },
  CONCACAF: { label: 'Norte/Centro', color: '#10b981' },
  UEFA: { label: 'Europa', color: '#6366f1' },
  CAF: { label: 'África', color: '#f59e0b' },
  AFC: { label: 'Asia', color: '#ef4444' },
  OFC: { label: 'Oceanía', color: '#8b5cf6' },
}

const INTRO_STICKERS = [
  { id: 'S00', number: '00', label: 'Panini' },
  { id: 'S01', number: '01', label: 'Trofeo (arriba)' },
  { id: 'S02', number: '02', label: 'Trofeo (abajo)' },
  { id: 'S03', number: '03', label: 'Mascota' },
  { id: 'S04', number: '04', label: 'Logo Mundial' },
  { id: 'S05', number: '05', label: 'Balón oficial' },
  { id: 'S06', number: '06', label: '🇨🇦 Canadá' },
  { id: 'S07', number: '07', label: '🇲🇽 México' },
  { id: 'S08', number: '08', label: '🇺🇸 USA' },
]

const CHAMPIONS_STICKERS = Array.from({ length: 11 }, (_, i) => ({
  id: `C${i + 9}`,
  number: String(i + 9),
}))

const TOTAL_FIGURITAS = 980
const STORAGE_KEY = 'panini-mundial-2026'
const PIN_KEY = 'panini-mundial-2026-pin'
const SESSION_KEY = 'panini-mundial-2026-session'

const slotType = (n) => (n === 1 ? 'shield' : n === 13 ? 'squad' : 'player')

// ============================================================
// APP ROOT (gestiona login)
// ============================================================

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY)
    if (session === 'ok') setAuthed(true)
    setLoading(false)
  }, [])

  if (loading) return null

  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />

  return <Tracker onLogout={() => {
    localStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }} />
}

// ============================================================
// LOGIN POR PIN
// ============================================================

function LoginScreen({ onSuccess }) {
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState('')
  const storedPin = localStorage.getItem(PIN_KEY)
  const isFirstTime = !storedPin

  const submit = () => {
    setError('')
    if (isFirstTime) {
      if (pin.length < 4) return setError('El PIN debe tener al menos 4 dígitos')
      if (pin !== confirmPin) return setError('Los PIN no coinciden')
      localStorage.setItem(PIN_KEY, pin)
      localStorage.setItem(SESSION_KEY, 'ok')
      onSuccess()
    } else {
      if (pin === storedPin) {
        localStorage.setItem(SESSION_KEY, 'ok')
        onSuccess()
      } else {
        setError('PIN incorrecto')
        setPin('')
      }
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #047857 0%, #0d9488 100%)',
      padding: 20,
    }}>
      <div style={{
        background: 'white',
        borderRadius: 20,
        padding: 32,
        maxWidth: 380,
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚽</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 4, color: '#0f172a' }}>
            Mi Álbum Panini
          </h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>Mundial 2026 · USA · México · Canadá</p>
        </div>

        {isFirstTime && (
          <div style={{
            background: '#fefce8',
            border: '1px solid #fde68a',
            borderRadius: 10,
            padding: 12,
            fontSize: 12,
            color: '#78350f',
            marginBottom: 16,
            lineHeight: 1.5,
          }}>
            Primera vez: creá un PIN para proteger tu álbum. Lo vas a usar para entrar desde otros dispositivos.
          </div>
        )}

        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
          {isFirstTime ? 'Crear PIN' : 'PIN'}
        </label>
        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => e.key === 'Enter' && !isFirstTime && submit()}
          placeholder="••••"
          autoFocus
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: 18,
            border: '2px solid #e2e8f0',
            borderRadius: 10,
            outline: 'none',
            marginBottom: 12,
            fontFamily: 'monospace',
            letterSpacing: '0.3em',
            textAlign: 'center',
          }}
        />

        {isFirstTime && (
          <>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
              Confirmar PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: 18,
                border: '2px solid #e2e8f0',
                borderRadius: 10,
                outline: 'none',
                marginBottom: 12,
                fontFamily: 'monospace',
                letterSpacing: '0.3em',
                textAlign: 'center',
              }}
            />
          </>
        )}

        {error && (
          <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>
            {error}
          </div>
        )}

        <button
          onClick={submit}
          style={{
            width: '100%',
            padding: 14,
            background: '#047857',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isFirstTime ? 'Crear y entrar' : 'Entrar'}
        </button>

        {!isFirstTime && (
          <button
            onClick={() => {
              if (confirm('Olvidaste el PIN? Esto BORRA todo tu progreso. ¿Seguro?')) {
                localStorage.removeItem(PIN_KEY)
                localStorage.removeItem(STORAGE_KEY)
                localStorage.removeItem(SESSION_KEY)
                window.location.reload()
              }
            }}
            style={{
              width: '100%',
              marginTop: 8,
              padding: 8,
              background: 'transparent',
              color: '#94a3b8',
              border: 'none',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            Olvidé mi PIN (borra todo)
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================================
// TRACKER PRINCIPAL
// ============================================================

function Tracker({ onLogout }) {
  const [owned, setOwned] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [search, setSearch] = useState('')
  const [confedFilter, setConfedFilter] = useState('ALL')
  const [showOnlyMissing, setShowOnlyMissing] = useState(false)
  const [expandedTeams, setExpandedTeams] = useState({})
  const [showMenu, setShowMenu] = useState(false)

  // Cargar de localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setOwned(JSON.parse(raw))
    } catch (e) {
      console.error(e)
    }
    setLoaded(true)
  }, [])

  // Guardar
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(owned))
    } catch (e) {
      console.error(e)
    }
  }, [owned, loaded])

  const toggle = (key) => {
    setOwned((prev) => {
      const next = { ...prev }
      if (next[key]) delete next[key]
      else next[key] = true
      return next
    })
  }

  const toggleTeam = (code) => {
    setExpandedTeams((p) => ({ ...p, [code]: !p[code] }))
  }

  const teamProgress = (code) => {
    let count = 0
    for (let n = 1; n <= 20; n++) if (owned[`${code}-${n}`]) count++
    return count
  }

  const introProgress = useMemo(
    () => INTRO_STICKERS.filter((s) => owned[s.id]).length,
    [owned]
  )
  const championsProgress = useMemo(
    () => CHAMPIONS_STICKERS.filter((s) => owned[s.id]).length,
    [owned]
  )

  const totalOwned = useMemo(() => {
    let count = introProgress + championsProgress
    for (const t of TEAMS) count += teamProgress(t.code)
    return count
  }, [owned, introProgress, championsProgress])

  const totalMissing = TOTAL_FIGURITAS - totalOwned
  const pct = ((totalOwned / TOTAL_FIGURITAS) * 100).toFixed(1)

  const filteredTeams = useMemo(() => {
    return TEAMS.filter((t) => {
      if (confedFilter !== 'ALL' && t.confed !== confedFilter) return false
      if (
        search &&
        !t.name.toLowerCase().includes(search.toLowerCase()) &&
        !t.code.toLowerCase().includes(search.toLowerCase())
      )
        return false
      if (showOnlyMissing && teamProgress(t.code) === 20) return false
      return true
    })
  }, [confedFilter, search, showOnlyMissing, owned])

  const resetAll = () => {
    if (confirm('¿Borrar TODAS las figuritas marcadas? No se puede deshacer.')) {
      setOwned({})
    }
  }

  const exportData = () => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      total: totalOwned,
      owned,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `panini-mundial-2026-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result)
          if (!data.owned) throw new Error('Formato inválido')
          if (confirm(`Importar ${Object.keys(data.owned).length} figuritas? Reemplaza tu progreso actual.`)) {
            setOwned(data.owned)
          }
        } catch (err) {
          alert('Archivo inválido: ' + err.message)
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  // Imprimir: en vez de window.open() usamos iframe (no se bloquea)
  const handlePrint = (mode) => {
    const html = buildPrintHTML(owned, mode)
    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.right = '0'
    iframe.style.bottom = '0'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = '0'
    document.body.appendChild(iframe)
    iframe.contentDocument.open()
    iframe.contentDocument.write(html)
    iframe.contentDocument.close()
    iframe.onload = () => {
      try {
        iframe.contentWindow.focus()
        iframe.contentWindow.print()
      } catch (e) {
        console.error(e)
      }
      // Limpieza después de un rato
      setTimeout(() => document.body.removeChild(iframe), 60000)
    }
  }

  if (!loaded) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc' }}>
        <p style={{ color: '#64748b', fontFamily: 'monospace' }}>Cargando...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* HEADER */}
      <header style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '4px solid #0f172a',
        background: 'linear-gradient(135deg, #047857, #0d9488 50%, #14b8a6)',
        color: 'white',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 20px, rgba(255,255,255,0.15) 20px 22px)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', fontWeight: 800, opacity: 0.9 }}>
              FIFA WORLD CUP 2026
            </span>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ⋯ Menú
            </button>
          </div>

          <h1 style={{
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: 4,
            lineHeight: 1.1,
          }}>
            MI ÁLBUM PANINI
          </h1>
          <p style={{ fontSize: 13, color: '#a7f3d0', marginBottom: 20 }}>
            USA · México · Canadá — 980 figuritas
          </p>

          {/* Progress card */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: 14,
            padding: 16,
            border: '1px solid rgba(255,255,255,0.25)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 32, fontWeight: 900 }}>{totalOwned}</span>
                <span style={{ fontSize: 18, opacity: 0.75 }}> / 980</span>
              </div>
              <span style={{ fontSize: 24, fontWeight: 800 }}>{pct}%</span>
            </div>
            <div style={{
              height: 12,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 999,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${pct}%`,
                background: 'linear-gradient(90deg, #fde047, #f59e0b)',
                transition: 'width 0.4s',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 6, opacity: 0.9 }}>
              <span>{totalOwned} pegadas</span>
              <span style={{ fontWeight: 700 }}>Faltan {totalMissing}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
            <PrimaryBtn onClick={() => handlePrint('missing')}>
              🖨 Imprimir FALTANTES
            </PrimaryBtn>
            <DarkBtn onClick={() => handlePrint('full')}>
              🖨 Imprimir TODO
            </DarkBtn>
          </div>

          {/* Menu dropdown */}
          {showMenu && (
            <div style={{
              position: 'absolute',
              right: 20,
              top: 60,
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              padding: 8,
              zIndex: 50,
              minWidth: 200,
            }}>
              <MenuItem onClick={() => { exportData(); setShowMenu(false) }}>
                💾 Exportar backup
              </MenuItem>
              <MenuItem onClick={() => { importData(); setShowMenu(false) }}>
                📂 Importar backup
              </MenuItem>
              <MenuItem onClick={() => { resetAll(); setShowMenu(false) }} danger>
                🗑 Borrar todo
              </MenuItem>
              <div style={{ height: 1, background: '#e2e8f0', margin: '4px 0' }} />
              <MenuItem onClick={() => { onLogout(); setShowMenu(false) }}>
                🔒 Cerrar sesión
              </MenuItem>
            </div>
          )}
        </div>
      </header>

      {/* FILTROS sticky */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 20px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <span style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 14,
                opacity: 0.5,
              }}>🔍</span>
              <input
                type="text"
                placeholder="Buscar selección..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>
            <button
              onClick={() => setShowOnlyMissing(!showOnlyMissing)}
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                border: showOnlyMissing ? '1px solid #fde68a' : '1px solid #e2e8f0',
                background: showOnlyMissing ? '#fef3c7' : '#f1f5f9',
                color: showOnlyMissing ? '#78350f' : '#475569',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {showOnlyMissing ? '✓ Solo incompletas' : 'Filtrar incompletas'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto', paddingBottom: 4 }}>
            <ConfedPill active={confedFilter === 'ALL'} onClick={() => setConfedFilter('ALL')} label="Todas" />
            {CONFED_ORDER.map((c) => (
              <ConfedPill
                key={c}
                active={confedFilter === c}
                onClick={() => setConfedFilter(c)}
                label={c}
                color={CONFED_META[c].color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px 100px' }}>
        {/* INICIO 00-08 */}
        {confedFilter === 'ALL' && (!showOnlyMissing || introProgress < INTRO_STICKERS.length) && (
          <Section title="INICIO DEL ÁLBUM" subtitle={`${introProgress}/${INTRO_STICKERS.length} · figuritas 00-08`} accent="#f59e0b">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
              {INTRO_STICKERS.map((s) => {
                if (showOnlyMissing && owned[s.id]) return null
                return (
                  <SpecialBtn
                    key={s.id}
                    number={s.number}
                    label={s.label}
                    checked={!!owned[s.id]}
                    onClick={() => toggle(s.id)}
                  />
                )
              })}
            </div>
          </Section>
        )}

        {/* SELECCIONES */}
        {CONFED_ORDER.filter((c) => confedFilter === 'ALL' || confedFilter === c).map((confed) => {
          const teamsInConfed = filteredTeams.filter((t) => t.confed === confed)
          if (teamsInConfed.length === 0) return null

          return (
            <Section
              key={confed}
              title={confed}
              subtitle={CONFED_META[confed].label}
              accent={CONFED_META[confed].color}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                {teamsInConfed.map((team) => (
                  <TeamCard
                    key={team.code}
                    team={team}
                    progress={teamProgress(team.code)}
                    expanded={!!expandedTeams[team.code]}
                    onToggleExpand={() => toggleTeam(team.code)}
                    owned={owned}
                    onToggle={toggle}
                  />
                ))}
              </div>
            </Section>
          )
        })}

        {/* CAMPEONES */}
        {confedFilter === 'ALL' && (!showOnlyMissing || championsProgress < CHAMPIONS_STICKERS.length) && (
          <Section
            title="CAMPEONES DEL MUNDO"
            subtitle={`${championsProgress}/${CHAMPIONS_STICKERS.length} · figuritas 9-19`}
            accent="#f59e0b"
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8 }}>
              {CHAMPIONS_STICKERS.map((s) => {
                if (showOnlyMissing && owned[s.id]) return null
                const checked = !!owned[s.id]
                return (
                  <button
                    key={s.id}
                    onClick={() => toggle(s.id)}
                    style={{
                      padding: '14px 8px',
                      borderRadius: 10,
                      border: checked ? '2px solid #047857' : '2px solid #fde68a',
                      background: checked ? '#047857' : '#fefce8',
                      color: checked ? 'white' : '#78350f',
                      fontSize: 16,
                      fontWeight: 800,
                      fontFamily: 'monospace',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                    }}
                  >
                    🏆 {s.number}
                  </button>
                )
              })}
            </div>
          </Section>
        )}
      </main>

      <footer style={{
        borderTop: '1px solid #e2e8f0',
        background: 'white',
        padding: '20px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 11, color: '#94a3b8' }}>
          Tu progreso se guarda automáticamente · Acordate de exportar backup de vez en cuando
        </p>
      </footer>
    </div>
  )
}

// ============================================================
// COMPONENTES UI
// ============================================================

function PrimaryBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '10px 16px',
        background: 'white',
        color: '#047857',
        border: 'none',
        borderRadius: 10,
        fontWeight: 800,
        fontSize: 13,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      {children}
    </button>
  )
}

function DarkBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '10px 16px',
        background: '#0f172a',
        color: 'white',
        border: 'none',
        borderRadius: 10,
        fontWeight: 800,
        fontSize: 13,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      {children}
    </button>
  )
}

function MenuItem({ children, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '10px 12px',
        background: 'transparent',
        border: 'none',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        color: danger ? '#dc2626' : '#0f172a',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {children}
    </button>
  )
}

function ConfedPill({ active, onClick, label, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        background: active ? (color || '#0f172a') : 'white',
        color: active ? 'white' : '#475569',
        border: active ? `1px solid ${color || '#0f172a'}` : '1px solid #e2e8f0',
      }}
    >
      {label}
    </button>
  )
}

function Section({ title, subtitle, accent, children }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ width: 4, height: 28, borderRadius: 2, background: accent }} />
        <h2 style={{
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: '0.05em',
        }}>
          {title}
        </h2>
        {subtitle && (
          <span style={{ fontSize: 11, color: '#64748b' }}>{subtitle}</span>
        )}
      </div>
      {children}
    </section>
  )
}

function SpecialBtn({ number, label, checked, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 12px',
        borderRadius: 10,
        textAlign: 'left',
        cursor: 'pointer',
        background: checked ? '#047857' : 'white',
        color: checked ? 'white' : '#0f172a',
        border: checked ? '2px solid #047857' : '2px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div style={{
        width: 18,
        height: 18,
        flexShrink: 0,
        borderRadius: 4,
        background: checked ? 'white' : 'transparent',
        border: checked ? '2px solid white' : '2px solid #cbd5e1',
        display: 'grid',
        placeItems: 'center',
        fontSize: 12,
        color: '#047857',
        fontWeight: 900,
      }}>
        {checked ? '✓' : ''}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontSize: 10,
          fontFamily: 'monospace',
          fontWeight: 800,
          color: checked ? '#a7f3d0' : '#94a3b8',
        }}>
          {number}
        </div>
        <div style={{
          fontSize: 12,
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {label}
        </div>
      </div>
    </button>
  )
}

function TeamCard({ team, progress, expanded, onToggleExpand, owned, onToggle }) {
  const complete = progress === 20
  const pct = (progress / 20) * 100

  return (
    <div style={{
      background: complete ? '#ecfdf5' : 'white',
      border: complete ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <button
        onClick={onToggleExpand}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 24, flexShrink: 0 }}>{team.flag}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontWeight: 800, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {team.name}
            </span>
            <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', flexShrink: 0 }}>
              {team.code}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${pct}%`,
                background: complete ? '#10b981' : '#0f172a',
                transition: 'width 0.3s',
              }} />
            </div>
            <span style={{
              fontSize: 11,
              fontFamily: 'monospace',
              fontWeight: 800,
              color: complete ? '#059669' : '#64748b',
              flexShrink: 0,
            }}>
              {progress}/20
            </span>
          </div>
        </div>
        <span style={{ color: complete ? '#10b981' : '#cbd5e1', fontSize: 18 }}>
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {expanded && (
        <div style={{ padding: '8px 14px 14px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 6,
          }}>
            {Array.from({ length: 20 }, (_, i) => {
              const n = i + 1
              const key = `${team.code}-${n}`
              const checked = !!owned[key]
              const type = slotType(n)

              let bg, border, color
              if (checked) {
                bg = '#10b981'
                border = '#059669'
                color = 'white'
              } else if (type === 'shield') {
                bg = '#fef3c7'
                border = '#fcd34d'
                color = '#78350f'
              } else if (type === 'squad') {
                bg = '#dbeafe'
                border = '#93c5fd'
                color = '#1e40af'
              } else {
                bg = 'white'
                border = '#e2e8f0'
                color = '#475569'
              }

              return (
                <button
                  key={key}
                  onClick={() => onToggle(key)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 6,
                    border: `2px solid ${border}`,
                    background: bg,
                    color,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: 2,
                  }}
                  title={
                    type === 'shield' ? 'Escudo (1)' :
                    type === 'squad' ? 'Plantel (13)' :
                    `Figurita ${n}`
                  }
                >
                  {type === 'shield' ? (
                    <>
                      <span style={{ fontSize: 14, lineHeight: 1 }}>⚜</span>
                      <span style={{ fontSize: 8, fontFamily: 'monospace', marginTop: 1 }}>1</span>
                    </>
                  ) : type === 'squad' ? (
                    <>
                      <span style={{ fontSize: 14, lineHeight: 1 }}>👥</span>
                      <span style={{ fontSize: 8, fontFamily: 'monospace', marginTop: 1 }}>13</span>
                    </>
                  ) : (
                    n
                  )}
                  {checked && (
                    <span style={{
                      position: 'absolute',
                      bottom: 1,
                      right: 2,
                      fontSize: 9,
                      fontWeight: 900,
                    }}>
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          <p style={{ fontSize: 10, color: '#94a3b8', marginTop: 8, textAlign: 'center' }}>
            ⚜ escudo (1) · 👥 plantel (13) · números = jugadores
          </p>
        </div>
      )}
    </div>
  )
}

// ============================================================
// IMPRIMIR (HTML para A4)
// ============================================================

function buildPrintHTML(owned, mode) {
  const showAll = mode === 'full'

  let totalOwned = 0
  for (const s of INTRO_STICKERS) if (owned[s.id]) totalOwned++
  for (const t of TEAMS) {
    for (let n = 1; n <= 20; n++) if (owned[`${t.code}-${n}`]) totalOwned++
  }
  for (const c of CHAMPIONS_STICKERS) if (owned[c.id]) totalOwned++
  const missing = TOTAL_FIGURITAS - totalOwned

  let body = ''

  const introToShow = INTRO_STICKERS.filter((s) => showAll || !owned[s.id])
  if (introToShow.length > 0) {
    const html = introToShow
      .map((s) => {
        const cls = showAll && owned[s.id] ? 'intro done' : 'intro'
        return `<span class="${cls}">${s.number} ${s.label}</span>`
      })
      .join('')
    body += `
      <section class="confed">
        <h2>INICIO DEL ÁLBUM <span class="confed-label">figuritas 00-08</span></h2>
        <div class="team"><div class="slots">${html}</div></div>
      </section>
    `
  }

  for (const confed of CONFED_ORDER) {
    const teams = TEAMS.filter((t) => t.confed === confed)
    let confedHTML = ''

    for (const team of teams) {
      const slots = []
      for (let n = 1; n <= 20; n++) {
        const has = !!owned[`${team.code}-${n}`]
        if (showAll || !has) slots.push({ n, has })
      }
      if (slots.length === 0) continue

      const teamSlots = slots
        .map((s) => {
          const extra = s.n === 1 ? ' shield' : s.n === 13 ? ' squad' : ''
          const cls = showAll && s.has ? `slot${extra} done` : `slot${extra}`
          return `<span class="${cls}">${s.n}</span>`
        })
        .join('')

      confedHTML += `
        <div class="team">
          <div class="team-name">${team.flag} <strong>${team.name}</strong> <span class="code">${team.code}</span></div>
          <div class="slots">${teamSlots}</div>
        </div>
      `
    }

    if (confedHTML) {
      body += `
        <section class="confed">
          <h2>${confed} <span class="confed-label">${CONFED_META[confed].label}</span></h2>
          ${confedHTML}
        </section>
      `
    }
  }

  const champsToShow = CHAMPIONS_STICKERS.filter((c) => showAll || !owned[c.id])
  if (champsToShow.length > 0) {
    const html = champsToShow
      .map((c) => {
        const cls = showAll && owned[c.id] ? 'champ done' : 'champ'
        return `<span class="${cls}">${c.number}</span>`
      })
      .join('')
    body += `
      <section class="confed">
        <h2>CAMPEONES DEL MUNDO <span class="confed-label">figuritas 9-19</span></h2>
        <div class="team"><div class="slots">${html}</div></div>
      </section>
    `
  }

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>${showAll ? 'Mi álbum Panini' : 'Figuritas que me FALTAN'}</title>
<style>
  @page { size: A4; margin: 12mm; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #1c1917; margin: 0; font-size: 10pt; line-height: 1.3;
  }
  header {
    border-bottom: 3px solid #0f172a;
    padding-bottom: 8px; margin-bottom: 12px;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  h1 { font-size: 18pt; margin: 0; }
  .meta { font-size: 9pt; color: #57534e; text-align: right; }
  .meta strong { color: #047857; font-size: 11pt; }
  .confed { margin-bottom: 10px; break-inside: avoid; }
  .confed h2 {
    font-size: 11pt; margin: 8px 0 4px; padding: 3px 6px;
    background: #f5f5f4; border-left: 4px solid #047857;
  }
  .confed-label { font-weight: 400; font-size: 8pt; color: #78716c; margin-left: 6px; }
  .team {
    display: flex; align-items: center; gap: 8px; padding: 3px 0;
    border-bottom: 1px dotted #d6d3d1; break-inside: avoid;
  }
  .team-name { flex: 0 0 130px; font-size: 9pt; }
  .team-name .code { color: #a8a29e; font-size: 7.5pt; font-family: monospace; }
  .slots { display: flex; flex-wrap: wrap; gap: 3px; flex: 1; }
  .slot {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 20px; height: 18px; padding: 0 4px;
    border: 1px solid #57534e; border-radius: 3px;
    font-size: 8.5pt; font-weight: 600; background: white;
  }
  .slot.shield { background: #fef3c7; border-color: #d97706; }
  .slot.squad { background: #dbeafe; border-color: #2563eb; }
  .slot.done {
    background: #047857 !important; color: white; border-color: #047857 !important;
    text-decoration: line-through;
  }
  .intro {
    display: inline-flex; align-items: center; padding: 2px 6px;
    border: 1px solid #ca8a04; border-radius: 3px; font-size: 8.5pt;
    font-weight: 600; background: #fefce8;
  }
  .intro.done {
    background: #047857; color: white; border-color: #047857; text-decoration: line-through;
  }
  .champ {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 24px; padding: 2px 6px; border: 1px solid #ca8a04;
    border-radius: 3px; font-size: 9pt; font-weight: 700;
    background: #fef3c7; font-family: monospace;
  }
  .champ.done {
    background: #047857; color: white; border-color: #047857; text-decoration: line-through;
  }
  footer {
    margin-top: 12px; padding-top: 8px; border-top: 1px solid #e7e5e4;
    font-size: 8pt; color: #78716c; text-align: center;
  }
</style>
</head>
<body>
  <header>
    <div>
      <h1>${showAll ? 'Mi álbum Panini' : 'Me faltan estas figuritas'}</h1>
      <div style="font-size: 8pt; color: #78716c;">FIFA World Cup 2026 · USA · México · Canadá</div>
    </div>
    <div class="meta">
      <div>${totalOwned} / 980 pegadas</div>
      <strong>${missing} faltantes</strong>
    </div>
  </header>
  ${body}
  <footer>
    1 = escudo (amarillo) · 13 = plantel (azul) · resto jugadores · 00-08 = inicio · 9-19 = campeones
  </footer>
</body>
</html>`
}
