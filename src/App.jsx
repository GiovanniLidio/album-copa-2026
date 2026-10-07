import { useState, useEffect, useCallback, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const GROUPS_DATA = [
  {
    letter: 'A', countries: [
      { name: 'México', code: 'MEX', total: 20, defaultHas: [1, 7, 9, 11, 13, 15, 18, 19] },
      { name: 'África do Sul', code: 'RSA', total: 20, defaultHas: [1, 13, 20] },
      { name: 'Coréia do Sul', code: 'KOR', total: 20, defaultHas: [1, 2, 3, 6, 8, 9, 13, 16] },
      { name: 'Rep. Tcheca', code: 'CZE', total: 20, defaultHas: [1, 6, 10, 11, 13, 14, 19] },
    ]
  },
  {
    letter: 'B', countries: [
      { name: 'Canadá', code: 'CAN', total: 20, defaultHas: [1, 3, 10, 12, 13, 15, 20] },
      { name: 'Bósnia', code: 'BIH', total: 20, defaultHas: [2, 8, 12, 13, 15] },
      { name: 'Catar', code: 'QAT', total: 20, defaultHas: [1, 2, 4, 9, 13, 14, 15, 16, 18] },
      { name: 'Suíça', code: 'SUI', total: 20, defaultHas: [5, 13] },
    ]
  },
  {
    letter: 'C', countries: [
      { name: 'Brasil', code: 'BRA', total: 20, defaultHas: [6, 9, 12, 13, 14, 17, 18, 20] },
      { name: 'Marrocos', code: 'MAR', total: 20, defaultHas: [1, 10, 13, 14, 17, 18] },
      { name: 'Haiti', code: 'HAI', total: 20, defaultHas: [1, 2, 3, 4, 6, 7, 10, 12, 13, 19] },
      { name: 'Escócia', code: 'SCO', total: 20, defaultHas: [1, 13, 14, 18, 19] },
    ]
  },
  {
    letter: 'D', countries: [
      { name: 'Estados Unidos', code: 'USA', total: 20, defaultHas: [1, 3, 4, 7, 8, 10, 11, 12, 13] },
      { name: 'Paraguai', code: 'PAR', total: 20, defaultHas: [1, 3, 5, 7, 9, 10, 11, 13, 14, 15, 18] },
      { name: 'Austrália', code: 'AUS', total: 20, defaultHas: [1, 9, 12, 13, 14, 15, 18] },
      { name: 'Turquia', code: 'TUR', total: 20, defaultHas: [1, 2, 11, 12, 13, 14, 17] },
    ]
  },
  {
    letter: 'E', countries: [
      { name: 'Alemanha', code: 'GER', total: 20, defaultHas: [1, 2, 3, 4, 6, 10, 11, 12, 13, 17, 18] },
      { name: 'Curaçao', code: 'CUW', total: 20, defaultHas: [1, 3, 8, 11, 12, 13, 15, 17, 18] },
      { name: 'Costa do Marfim', code: 'CIV', total: 20, defaultHas: [1, 13, 20] },
      { name: 'Equador', code: 'ECU', total: 20, defaultHas: [1, 7, 8, 10, 13, 15, 19] },
    ]
  },
  {
    letter: 'F', countries: [
      { name: 'Holanda', code: 'NED', total: 20, defaultHas: [1, 5, 19] },
      { name: 'Japão', code: 'JPN', total: 20, defaultHas: [1, 4, 5, 9, 13, 16, 17] },
      { name: 'Suécia', code: 'SWE', total: 20, defaultHas: [3, 13, 16, 17] },
      { name: 'Tunísia', code: 'TUN', total: 20, defaultHas: [1, 3, 4, 5, 8, 11, 13, 16, 20] },
    ]
  },
  {
    letter: 'G', countries: [
      { name: 'Bélgica', code: 'BEL', total: 20, defaultHas: [1, 2, 8, 11, 15, 16, 17, 18, 19] },
      { name: 'Egito', code: 'EGY', total: 20, defaultHas: [1, 3, 4, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 19] },
      { name: 'Irã', code: 'IRN', total: 20, defaultHas: [1, 2, 5, 6, 10, 13, 14, 15, 16, 17, 18] },
      { name: 'Nova Zelândia', code: 'NZL', total: 20, defaultHas: [1, 3, 13, 16, 17, 18] },
    ]
  },
  {
    letter: 'H', countries: [
      { name: 'Espanha', code: 'ESP', total: 20, defaultHas: [1, 3, 4, 8, 11, 15, 16, 17, 18, 19] },
      { name: 'Cabo Verde', code: 'CPV', total: 20, defaultHas: [1, 2, 6, 10, 13, 15, 18] },
      { name: 'Arábia Saudita', code: 'KSA', total: 20, defaultHas: [1, 9, 13, 18, 19] },
      { name: 'Uruguai', code: 'URU', total: 20, defaultHas: [1, 3, 5, 12, 13, 16, 20] },
    ]
  },
  {
    letter: 'I', countries: [
      { name: 'França', code: 'FRA', total: 20, defaultHas: [2, 4, 6, 10, 13, 17, 19] },
      { name: 'Senegal', code: 'SEN', total: 20, defaultHas: [1, 4, 5, 11, 12, 13, 14, 18] },
      { name: 'Iraque', code: 'IRQ', total: 20, defaultHas: [1, 4, 5, 6, 9, 12, 15, 17, 18] },
      { name: 'Noruega', code: 'NOR', total: 20, defaultHas: [1, 3, 4, 5, 7, 8, 9, 11, 13, 14, 17, 18, 19, 20] },
    ]
  },
  {
    letter: 'J', countries: [
      { name: 'Argentina', code: 'ARG', total: 20, defaultHas: [1, 8, 9, 10, 13, 16, 17, 18, 19] },
      { name: 'Argélia', code: 'ALG', total: 20, defaultHas: [1, 6, 7, 8, 9, 13, 16, 17, 18, 19] },
      { name: 'Áustria', code: 'AUT', total: 20, defaultHas: [1, 2, 12, 13, 14, 15, 16, 20] },
      { name: 'Jordânia', code: 'JOR', total: 20, defaultHas: [1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 17] },
    ]
  },
  {
    letter: 'K', countries: [
      { name: 'Portugal', code: 'POR', total: 20, defaultHas: [1, 5, 6, 9, 13, 14, 18] },
      { name: 'Congo', code: 'COD', total: 20, defaultHas: [1, 3, 4, 7, 10, 11, 13, 18, 20] },
      { name: 'Uzbequistão', code: 'UZB', total: 20, defaultHas: [1, 5, 6, 9, 10, 13, 14, 15, 16, 18, 20] },
      { name: 'Colômbia', code: 'COL', total: 20, defaultHas: [1, 5, 13] },
    ]
  },
  {
    letter: 'L', countries: [
      { name: 'Inglaterra', code: 'ENG', total: 20, defaultHas: [1, 2, 6, 9, 10, 13, 18, 19] },
      { name: 'Croácia', code: 'CRO', total: 20, defaultHas: [1, 3, 5, 7, 11, 12, 13, 14, 16, 18] },
      { name: 'Gana', code: 'GHA', total: 20, defaultHas: [1, 2, 3, 6, 9, 13, 14, 16, 19] },
      { name: 'Panamá', code: 'PAN', total: 20, defaultHas: [1, 4, 5, 11, 12, 13] },
    ]
  },
];

const SPECIAL_DATA = [
  { title: 'FIFA World Cup History', code: 'FWC', stickers: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], defaultHas: [13, 14, 15, 17] },
  { title: 'Coca-Cola', code: 'CC', stickers: ['CC1', 'CC2', 'CC3', 'CC4', 'CC5', 'CC6', 'CC7', 'CC8', 'CC9', 'CC10', 'CC11', 'CC12', 'CC13', 'CC14'], defaultHas: ['CC8', 'CC9'] },
];

// 20 players × 4 categories = 80 legendary stickers
// Categories: roxa (regular), bronze, prata, ouro
// defaultHas from user photo (X = has)
const LEGENDARY_PLAYERS = [
  { name: 'Hakimi', roxa: false, bronze: false, prata: false, ouro: false },
  { name: 'Alphonso Davies', roxa: true, bronze: false, prata: true, ouro: false },
  { name: 'Pulisic', roxa: true, bronze: false, prata: false, ouro: false },
  { name: 'Gakpo', roxa: false, bronze: false, prata: false, ouro: false },
  { name: 'Cristian Ronaldo', roxa: true, bronze: true, prata: false, ouro: true },
  { name: 'Erling Haaland', roxa: true, bronze: true, prata: false, ouro: false },
  { name: 'Valverde', roxa: true, bronze: false, prata: true, ouro: false },
  { name: 'Florian Wirtz', roxa: true, bronze: false, prata: false, ouro: false },
  { name: 'Son', roxa: true, bronze: true, prata: false, ouro: false },
  { name: 'Doku', roxa: true, bronze: false, prata: false, ouro: false },
  { name: 'Bellingham', roxa: true, bronze: true, prata: false, ouro: false },
  { name: 'Mbappé', roxa: true, bronze: false, prata: false, ouro: false },
  { name: 'Yamal', roxa: true, bronze: false, prata: false, ouro: false },
  { name: 'Lionel Messi', roxa: true, bronze: true, prata: false, ouro: true },
  { name: 'Luis Diaz', roxa: false, bronze: true, prata: true, ouro: false },
  { name: 'Modric', roxa: false, bronze: false, prata: false, ouro: false },
  { name: 'Salah', roxa: true, bronze: true, prata: true, ouro: false },
  { name: 'Caicedo', roxa: true, bronze: true, prata: true, ouro: false },
  { name: 'Raul Jimenez', roxa: true, bronze: false, prata: false, ouro: true },
  { name: 'Vinicius Junior', roxa: true, bronze: true, prata: false, ouro: false },
];

const CATEGORIES = [
  { key: 'roxa', label: 'Roxa', color: '#7c3aed', light: '#ede9fe', border: '#7c3aed' },
  { key: 'bronze', label: 'Bronze', color: '#92400e', light: '#fef3c7', border: '#d97706' },
  { key: 'prata', label: 'Prata', color: '#475569', light: '#f1f5f9', border: '#94a3b8' },
  { key: 'ouro', label: 'Ouro', color: '#92400e', light: '#fefce8', border: '#eab308' },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

function buildDefault() {
  const state = { album: {}, legendary: {}, trades: {} };
  GROUPS_DATA.forEach(g => g.countries.forEach(c => {
    state.album[c.code] = {};
    state.trades[c.code] = {};
    for (let i = 1; i <= c.total; i++) {
      state.album[c.code][i] = false;
      state.trades[c.code][i] = 0;
    }
  }));
  SPECIAL_DATA.forEach(sp => {
    state.album[sp.code] = {};
    state.trades[sp.code] = {};
    sp.stickers.forEach(s => {
      state.album[sp.code][s] = false;
      state.trades[sp.code][s] = 0;
    });
  });
  LEGENDARY_PLAYERS.forEach(p => {
    state.legendary[p.name] = { roxa: false, bronze: false, prata: false, ouro: false };
  });
  return state;
}

function encodeState(s) {
  const parts = [];
  GROUPS_DATA.forEach(g => g.countries.forEach(c => {
    let mask = 0;
    for (let i = 1; i <= c.total; i++) if (s.album[c.code]?.[i]) mask |= (1 << (i - 1));
    parts.push(mask.toString(36));
  }));
  SPECIAL_DATA.forEach(sp => {
    const bits = sp.stickers.map(st => s.album[sp.code]?.[st] ? '1' : '0').join('');
    parts.push(parseInt(bits, 2).toString(36));
  });
  // legendary: 20 players × 4 cats = 80 bits
  let legBits = '';
  LEGENDARY_PLAYERS.forEach(p => {
    CATEGORIES.forEach(c => { legBits += s.legendary[p.name]?.[c.key] ? '1' : '0'; });
  });
  parts.push(parseInt(legBits, 2).toString(36));
  // trades: for each sticker, store count 0-9
  const tradeParts = [];
  GROUPS_DATA.forEach(g => g.countries.forEach(c => {
    let t = '';
    for (let i = 1; i <= c.total; i++) t += (s.trades[c.code]?.[i] || 0);
    tradeParts.push(parseInt(t, 3).toString(36));
  }));
  parts.push(tradeParts.join(','));
  return parts.join('.');
}

function decodeState(code) {
  try {
    const parts = code.split('.');
    const state = { album: {}, legendary: {}, trades: {} };
    let idx = 0;
    GROUPS_DATA.forEach(g => g.countries.forEach(c => {
      const mask = parseInt(parts[idx++], 36);
      state.album[c.code] = {};
      state.trades[c.code] = {};
      for (let i = 1; i <= c.total; i++) {
        state.album[c.code][i] = !!(mask & (1 << (i - 1)));
        state.trades[c.code][i] = 0;
      }
    }));
    SPECIAL_DATA.forEach(sp => {
      const mask = parseInt(parts[idx++], 36);
      const bits = mask.toString(2).padStart(sp.stickers.length, '0');
      state.album[sp.code] = {};
      state.trades[sp.code] = {};
      sp.stickers.forEach((s, i) => {
        state.album[sp.code][s] = bits[i] === '1';
        state.trades[sp.code][s] = 0;
      });
    });
    // legendary
    const legMask = parseInt(parts[idx++], 36);
    const legBits = legMask.toString(2).padStart(80, '0');
    let bi = 0;
    LEGENDARY_PLAYERS.forEach(p => {
      state.legendary[p.name] = {};
      CATEGORIES.forEach(c => { state.legendary[p.name][c.key] = legBits[bi++] === '1'; });
    });
    // trades (best-effort)
    try {
      const tradeParts = parts[idx].split(',');
      let ti = 0;
      GROUPS_DATA.forEach(g => g.countries.forEach(c => {
        const n = parseInt(tradeParts[ti++], 36);
        const s = n.toString(3).padStart(c.total, '0');
        for (let i = 1; i <= c.total; i++) state.trades[c.code][i] = parseInt(s[i - 1]) || 0;
      }));
    } catch { }
    return state;
  } catch { return null; }
}

function btnStyle(bg, color, border) {
  return { border: border ? `1px solid ${border}` : 'none', borderRadius: 8, padding: '7px 13px', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: bg, color, fontFamily: 'inherit' };
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'album-copa-2026';

export default function App() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : buildDefault();
    } catch {
      return buildDefault();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // se o navegador bloquear o armazenamento, o app segue funcionando
    }
  }, [state]);

  const [tab, setTab] = useState('album'); // 'album' | 'legendary' | 'trades'
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState(null);
  const [toast, setToast] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [loadInput, setLoadInput] = useState('');
  const [loadError, setLoadError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef({});

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const toggleAlbum = useCallback((code, num) => {
    setState(prev => ({ ...prev, album: { ...prev.album, [code]: { ...prev.album[code], [num]: !prev.album[code][num] } } }));
  }, []);

  const toggleLegendary = useCallback((playerName, catKey) => {
    setState(prev => ({ ...prev, legendary: { ...prev.legendary, [playerName]: { ...prev.legendary[playerName], [catKey]: !prev.legendary[playerName][catKey] } } }));
  }, []);

  const setTrade = useCallback((code, num, val) => {
    setState(prev => ({ ...prev, trades: { ...prev.trades, [code]: { ...prev.trades[code], [num]: val } } }));
  }, []);

  const markAll = (val) => {
    const next = { ...state };
    GROUPS_DATA.forEach(g => g.countries.forEach(c => {
      next.album[c.code] = {};
      for (let i = 1; i <= c.total; i++) next.album[c.code][i] = val;
    }));
    SPECIAL_DATA.forEach(sp => {
      next.album[sp.code] = {};
      sp.stickers.forEach(s => { next.album[sp.code][s] = val; });
    });
    setState({ ...next });
    showToast(val ? '✅ Todos marcados!' : '🗑️ Desmarcados!');
  };

  const scrollTo = (key) => {
    const el = sectionRefs.current[key];
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveSection(key); }
  };

  useEffect(() => {
    const observers = [];
    Object.entries(sectionRefs.current).forEach(([key, el]) => {
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(key); }, { threshold: 0.2, rootMargin: '-60px 0px -60% 0px' });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [tab]);

  const saveCode = encodeState(state);
  const handleLoad = () => {
    const decoded = decodeState(loadInput.trim());
    if (!decoded) { setLoadError('Código inválido.'); return; }
    setState(decoded);
    setShowLoadModal(false); setLoadInput(''); setLoadError('');
    showToast('✅ Progresso carregado!');
  };

  // Stats
  let totalHas = 0, totalAll = 0;
  GROUPS_DATA.forEach(g => g.countries.forEach(c => {
    for (let i = 1; i <= c.total; i++) { totalAll++; if (state.album[c.code]?.[i]) totalHas++; }
  }));
  SPECIAL_DATA.forEach(sp => { sp.stickers.forEach(s => { totalAll++; if (state.album[sp.code]?.[s]) totalHas++; }); });
  const pct = Math.round(totalHas / totalAll * 100);

  // Legendary stats
  let legHas = 0;
  LEGENDARY_PLAYERS.forEach(p => CATEGORIES.forEach(c => { if (state.legendary[p.name]?.[c.key]) legHas++; }));

  // Trades list
  const tradesList = [];
  GROUPS_DATA.forEach(g => g.countries.forEach(c => {
    for (let i = 1; i <= c.total; i++) {
      const qty = state.trades[c.code]?.[i] || 0;
      if (qty > 0) tradesList.push({ label: `${c.name} #${i}`, code: c.code, num: i, qty });
    }
  }));
  SPECIAL_DATA.forEach(sp => {
    sp.stickers.forEach(s => {
      const qty = state.trades[sp.code]?.[s] || 0;
      if (qty > 0) tradesList.push({ label: `${sp.title} ${s}`, code: sp.code, num: s, qty });
    });
  });

  const q = search.toLowerCase();
  const SIDEBAR_W = sidebarOpen ? 200 : 44;
  const modalBg = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const modalBox = { background: '#fff', borderRadius: 16, padding: 28, width: 380, maxWidth: '90vw', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' };

  const TAB_STYLES = (active) => ({
    padding: '8px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
    borderBottom: active ? '3px solid #f0a500' : '3px solid transparent',
    color: active ? '#f0a500' : '#888', background: 'none', border: 'none',
    borderBottom: active ? '3px solid #f0a500' : '3px solid transparent',
    fontFamily: 'inherit', transition: 'all 0.15s',
  });

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#eef3ef', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── HEADER ── */}
      <div style={{ background: '#0d1f12', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 14, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
        <button onClick={() => setSidebarOpen(o => !o)}
          style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, width: 34, height: 34, cursor: 'pointer', color: '#f0a500', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {sidebarOpen ? '◀' : '▶'}
        </button>
        <div>
          <div style={{ fontSize: 10, color: '#666', letterSpacing: 1 }}>TRACKER</div>
          <div style={{ fontWeight: 900, fontSize: 18, color: '#f0a500', letterSpacing: 2 }}>
            FIGURINHAS <span style={{ color: '#fff' }}>COPA 2026</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 18 }}>
          {[['✅', totalHas, '#f0a500', 'Álbum'], ['⭐', legHas, '#eab308', 'Lendárias'], ['🔄', tradesList.length, '#60a5fa', 'Trocas']].map(([icon, num, color, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: 20, color, lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
          <button onClick={() => setShowLoadModal(true)} style={btnStyle('#1a2e60', '#fff')}>📥</button>
          <button onClick={() => setShowSaveModal(true)} style={btnStyle('#1a7a3c', '#fff')}>💾</button>
        </div>
      </div>

      {/* ── PROGRESS ── */}
      <div style={{ height: 4, background: '#1e3a24' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#25a352,#f0a500)', transition: 'width 0.4s' }} />
      </div>

      {/* ── TABS ── */}
      <div style={{ background: '#0d1f12', display: 'flex', borderBottom: '1px solid #1e3a24', paddingLeft: 16 }}>
        {[['album', '📋 Meu Álbum'], ['legendary', '⭐ Lendárias'], ['trades', '🔄 Trocas']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={TAB_STYLES(tab === key)}>{label}</button>
        ))}
      </div>

      {/* ── CONTROLS (album only) ── */}
      {tab === 'album' && (
        <div style={{ padding: '10px 16px', background: '#fff', borderBottom: '1px solid #dde8de', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar país..."
            style={{ border: '1px solid #c5d8c8', borderRadius: 8, padding: '6px 11px', fontSize: 13, width: 155, outline: 'none', fontFamily: 'inherit' }} />
          {[['needs', 'Faltantes'], ['has', 'Que tenho']].map(([mode, label]) => (
            <button key={mode} onClick={() => setFilterMode(filterMode === mode ? null : mode)}
              style={{ border: filterMode === mode ? '1.5px solid #1a7a3c' : '1px solid #c5d8c8', borderRadius: 8, padding: '6px 11px', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filterMode === mode ? '#e8f5ec' : 'transparent', color: filterMode === mode ? '#1a7a3c' : '#333', fontFamily: 'inherit' }}>
              {label}
            </button>
          ))}
          <button onClick={() => markAll(false)} style={btnStyle('#fff', '#333', '#c5d8c8')}>Limpar</button>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#aaa' }}>{pct}% completo · {totalHas}/{totalAll}</span>
        </div>
      )}

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <div style={{ width: SIDEBAR_W, minWidth: SIDEBAR_W, background: '#0d1f12', overflowY: 'auto', overflowX: 'hidden', transition: 'width 0.22s ease, min-width 0.22s ease', position: 'sticky', top: 0, height: 'calc(100vh - 130px)', flexShrink: 0 }}>
          {sidebarOpen ? (
            <div style={{ padding: '10px 0' }}>
              {/* Album nav */}
              <div style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 1, padding: '4px 14px 6px', fontWeight: 700 }}>Álbum</div>
              {GROUPS_DATA.map(group => {
                let gHas = 0, gTotal = 0;
                group.countries.forEach(c => { gTotal += c.total; for (let i = 1; i <= c.total; i++) if (state.album[c.code]?.[i]) gHas++; });
                const gPct = Math.round(gHas / gTotal * 100);
                const isActive = activeSection === `group-${group.letter}` && tab === 'album';
                return (
                  <div key={group.letter}>
                    <div onClick={() => { setTab('album'); scrollTo(`group-${group.letter}`); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', cursor: 'pointer', background: isActive ? 'rgba(240,165,0,0.12)' : 'transparent', borderLeft: isActive ? '3px solid #f0a500' : '3px solid transparent', transition: 'all 0.15s' }}>
                      <span style={{ fontWeight: 800, fontSize: 12, color: isActive ? '#f0a500' : '#ccc', width: 18 }}>G{group.letter}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                          <div style={{ height: '100%', width: `${gPct}%`, background: gPct === 100 ? '#25a352' : '#f0a500', borderRadius: 2 }} />
                        </div>
                      </div>
                      <span style={{ fontSize: 10, color: '#555', minWidth: 28, textAlign: 'right' }}>{gPct}%</span>
                    </div>
                    {group.countries.map(c => {
                      const cHas = Object.values(state.album[c.code] || {}).filter(Boolean).length;
                      const done = cHas === c.total;
                      const isAct = activeSection === `country-${c.code}` && tab === 'album';
                      return (
                        <div key={c.code} onClick={() => { setTab('album'); scrollTo(`country-${c.code}`); }}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 14px 4px 28px', cursor: 'pointer', background: isAct ? 'rgba(240,165,0,0.08)' : 'transparent', borderLeft: isAct ? '3px solid #f0a500' : '3px solid transparent', transition: 'all 0.15s' }}>
                          <span style={{ fontSize: 11, color: done ? '#25a352' : isAct ? '#f0a500' : '#777', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{done ? '✓ ' : ''}{c.name}</span>
                          <span style={{ fontSize: 10, color: '#555', flexShrink: 0 }}>{cHas}/{c.total}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '6px 14px' }} />
              {SPECIAL_DATA.map(sp => {
                const spHas = Object.values(state.album[sp.code] || {}).filter(Boolean).length;
                const isAct = activeSection === `special-${sp.code}` && tab === 'album';
                return (
                  <div key={sp.code} onClick={() => { setTab('album'); scrollTo(`special-${sp.code}`); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', cursor: 'pointer', background: isAct ? 'rgba(240,165,0,0.12)' : 'transparent', borderLeft: isAct ? '3px solid #f0a500' : '3px solid transparent', transition: 'all 0.15s' }}>
                    <span style={{ fontSize: 11, color: isAct ? '#f0a500' : '#aaa', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sp.title}</span>
                    <span style={{ fontSize: 10, color: '#555' }}>{spHas}/{sp.stickers.length}</span>
                  </div>
                );
              })}

              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '6px 14px' }} />
              <div style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 1, padding: '4px 14px 6px', fontWeight: 700 }}>Extras</div>
              <div onClick={() => setTab('legendary')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', cursor: 'pointer', background: tab === 'legendary' ? 'rgba(234,179,8,0.12)' : 'transparent', borderLeft: tab === 'legendary' ? '3px solid #eab308' : '3px solid transparent', transition: 'all 0.15s' }}>
                <span style={{ fontSize: 11, color: tab === 'legendary' ? '#eab308' : '#aaa', flex: 1 }}>⭐ Lendárias</span>
                <span style={{ fontSize: 10, color: '#555' }}>{legHas}/80</span>
              </div>
              <div onClick={() => setTab('trades')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', cursor: 'pointer', background: tab === 'trades' ? 'rgba(96,165,250,0.12)' : 'transparent', borderLeft: tab === 'trades' ? '3px solid #60a5fa' : '3px solid transparent', transition: 'all 0.15s' }}>
                <span style={{ fontSize: 11, color: tab === 'trades' ? '#60a5fa' : '#aaa', flex: 1 }}>🔄 Trocas</span>
                <span style={{ fontSize: 10, color: '#555' }}>{tradesList.length}</span>
              </div>
            </div>
          ) : (
            <div style={{ padding: '10px 0' }}>
              {GROUPS_DATA.map(group => (
                <div key={group.letter} onClick={() => { setTab('album'); scrollTo(`group-${group.letter}`); }}
                  style={{ width: 44, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: activeSection === `group-${group.letter}` ? '#f0a500' : '#555', fontWeight: 800, fontSize: 12 }}
                  title={`Grupo ${group.letter}`}>{group.letter}</div>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 8px' }} />
              <div onClick={() => setTab('legendary')} style={{ width: 44, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }} title="Lendárias">⭐</div>
              <div onClick={() => setTab('trades')} style={{ width: 44, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }} title="Trocas">🔄</div>
            </div>
          )}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16, height: 'calc(100vh - 130px)' }}>

          {/* ── ALBUM TAB ── */}
          {tab === 'album' && (
            <>
              {GROUPS_DATA.map(group => {
                const countries = group.countries.filter(c => !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
                if (!countries.length) return null;
                let gHas = 0, gTotal = 0;
                group.countries.forEach(c => { gTotal += c.total; for (let i = 1; i <= c.total; i++) if (state.album[c.code]?.[i]) gHas++; });
                return (
                  <div key={group.letter} ref={el => sectionRefs.current[`group-${group.letter}`] = el}
                    style={{ marginBottom: 14, background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', scrollMarginTop: 8 }}>
                    <div style={{ background: '#0d1f12', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ fontWeight: 900, fontSize: 18, color: '#f0a500', background: 'rgba(255,255,255,0.07)', width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{group.letter}</div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5 }}>Grupo {group.letter}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 12, color: '#aaa' }}>{gHas}/{gTotal}</span>
                    </div>
                    {countries.map(country => {
                      const cHas = Object.values(state.album[country.code] || {}).filter(Boolean).length;
                      return (
                        <div key={country.code} ref={el => sectionRefs.current[`country-${country.code}`] = el}
                          style={{ display: 'flex', alignItems: 'center', padding: '7px 14px', borderBottom: '1px solid #eef3ef', gap: 8, scrollMarginTop: 8 }}>
                          <div style={{ fontSize: 11, color: '#6b8f72', width: 32, flexShrink: 0 }}>{country.code}</div>
                          <div style={{ fontSize: 12, fontWeight: 600, width: 118, flexShrink: 0 }}>{country.name}</div>
                          <div style={{ fontSize: 10, color: '#bbb', width: 32, flexShrink: 0 }}>{cHas}/{country.total}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, flex: 1 }}>
                            {Array.from({ length: country.total }, (_, i) => i + 1).map(num => {
                              const has = state.album[country.code]?.[num];
                              if (filterMode === 'has' && !has) return null;
                              if (filterMode === 'needs' && has) return null;
                              return (
                                <div key={num} onClick={() => toggleAlbum(country.code, num)}
                                  style={{ width: 23, height: 23, borderRadius: 4, border: has ? '1.5px solid #1a7a3c' : '1.5px solid #b0ccb8', background: has ? '#1a7a3c' : '#e8f0ea', color: has ? '#fff' : '#999', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', userSelect: 'none', transition: 'all 0.1s' }}
                                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.18)'; }}
                                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                                >{has ? '✓' : num}</div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {SPECIAL_DATA.map(sp => {
                const spHas = Object.values(state.album[sp.code] || {}).filter(Boolean).length;
                return (
                  <div key={sp.code} ref={el => sectionRefs.current[`special-${sp.code}`] = el}
                    style={{ marginBottom: 14, background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', scrollMarginTop: 8 }}>
                    <div style={{ background: '#1a2e60', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>{sp.title}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 12, color: '#aaa' }}>{spHas}/{sp.stickers.length}</span>
                    </div>
                    <div style={{ padding: '10px 14px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {sp.stickers.map(num => {
                        const has = state.album[sp.code]?.[num];
                        const label = typeof num === 'string' ? num.replace('CC', '') : num;
                        return (
                          <div key={num} onClick={() => toggleAlbum(sp.code, num)}
                            style={{ width: 30, height: 30, borderRadius: 5, border: has ? '1.5px solid #1a2e60' : '1.5px solid #b0ccb8', background: has ? '#1a2e60' : '#e8f0ea', color: has ? '#fff' : '#999', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', userSelect: 'none' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                          >{has ? '✓' : label}</div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* ── LEGENDARY TAB ── */}
          {tab === 'legendary' && (
            <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <div style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22 }}>⭐</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#eab308', letterSpacing: 1 }}>FIGURINHAS LENDÁRIAS</div>
                  <div style={{ fontSize: 11, color: '#888' }}>Panini Extra Stickers 2026 · {legHas}/80</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
                  {CATEGORIES.map(cat => {
                    const catHas = LEGENDARY_PLAYERS.filter(p => state.legendary[p.name]?.[cat.key]).length;
                    return (
                      <div key={cat.key} style={{ textAlign: 'center' }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2px', border: `2px solid ${cat.border}` }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>{catHas}</span>
                        </div>
                        <div style={{ fontSize: 9, color: '#666', textTransform: 'uppercase' }}>{cat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category legend */}
              <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ width: 170, flexShrink: 0, padding: '8px 16px', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>Jogador</div>
                {CATEGORIES.map(cat => (
                  <div key={cat.key} style={{ flex: 1, padding: '8px 0', textAlign: 'center', fontSize: 11, fontWeight: 700, color: cat.color, textTransform: 'uppercase', letterSpacing: 0.5, borderLeft: '1px solid #f0f0f0' }}>
                    {cat.label}
                  </div>
                ))}
              </div>

              {LEGENDARY_PLAYERS.map((player, idx) => {
                const totalOwned = CATEGORIES.filter(c => state.legendary[player.name]?.[c.key]).length;
                return (
                  <div key={player.name} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f7f7f7', background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <div style={{ width: 170, flexShrink: 0, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: totalOwned === 4 ? '#25a352' : totalOwned > 0 ? '#f0a500' : '#ddd', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1a2e1e' }}>{player.name}</span>
                    </div>
                    {CATEGORIES.map(cat => {
                      const has = state.legendary[player.name]?.[cat.key];
                      return (
                        <div key={cat.key} onClick={() => toggleLegendary(player.name, cat.key)}
                          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0', borderLeft: '1px solid #f0f0f0', cursor: 'pointer' }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: 8,
                            background: has ? cat.color : cat.light,
                            border: `2px solid ${has ? cat.color : cat.border}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.15s', userSelect: 'none',
                          }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                          >
                            {has
                              ? <span style={{ fontSize: 16 }}>✓</span>
                              : <span style={{ fontSize: 9, color: cat.color, fontWeight: 700, opacity: 0.5 }}>—</span>
                            }
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── TRADES TAB ── */}
          {tab === 'trades' && (
            <div>
              <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', marginBottom: 16 }}>
                <div style={{ background: 'linear-gradient(135deg,#1a2e60,#1e3a8a)', padding: '14px 20px' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#60a5fa', letterSpacing: 1 }}>🔄 FIGURINHAS PARA TROCA</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Marque quantas cópias você tem de cada figurinha para oferecer em trocas</div>
                </div>
                <div style={{ padding: '12px 16px', fontSize: 12, color: '#555', background: '#f8faff', borderBottom: '1px solid #e8edf8' }}>
                  Clique nos <strong>+</strong> e <strong>−</strong> para indicar quantas duplicatas você tem de cada figurinha.
                </div>

                {tradesList.length === 0 ? (
                  <div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Nenhuma figurinha para troca ainda</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>Use os controles abaixo para adicionar suas duplicatas</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ padding: '8px 16px', fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid #f0f0f0' }}>
                      {tradesList.length} figurinha{tradesList.length !== 1 ? 's' : ''} disponível{tradesList.length !== 1 ? 'is' : ''} para troca
                    </div>
                    {tradesList.map(item => (
                      <div key={`${item.code}-${item.num}`} style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #f7f7f7', gap: 12 }}>
                        <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ background: '#60a5fa', color: '#fff', borderRadius: 20, padding: '2px 14px', fontWeight: 800, fontSize: 14 }}>{item.qty}×</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ padding: '12px 16px', background: '#f8faff', borderTop: '1px solid #e8edf8' }}>
                      <button onClick={() => {
                        const lines = ['=== MINHAS FIGURINHAS PARA TROCA - COPA 2026 ===', ''];
                        tradesList.forEach(item => lines.push(`• ${item.label}: ${item.qty} cópia${item.qty > 1 ? 's' : ''}`));
                        lines.push(''); lines.push('Gerado pelo Tracker de Figurinhas Copa 2026');
                        navigator.clipboard.writeText(lines.join('\n')).then(() => showToast('✅ Lista copiada!'));
                      }} style={btnStyle('#1a2e60', '#fff')}>📋 Copiar lista para compartilhar</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Trade input per group */}
              {GROUPS_DATA.map(group => (
                <div key={group.letter} style={{ marginBottom: 14, background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <div style={{ background: '#0d1f12', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontWeight: 900, fontSize: 16, color: '#f0a500', background: 'rgba(255,255,255,0.07)', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{group.letter}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>Grupo {group.letter}</span>
                  </div>
                  {group.countries.map(country => (
                    <div key={country.code} style={{ padding: '8px 14px', borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 6 }}>{country.name} <span style={{ color: '#aaa', fontWeight: 400 }}>({country.code})</span></div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {Array.from({ length: country.total }, (_, i) => i + 1).map(num => {
                          const qty = state.trades[country.code]?.[num] || 0;
                          const hasInAlbum = state.album[country.code]?.[num];
                          return (
                            <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                              <div style={{ fontSize: 9, color: hasInAlbum ? '#1a7a3c' : '#ccc', fontWeight: 700 }}>{num}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <button onClick={() => setTrade(country.code, num, Math.max(0, qty - 1))}
                                  style={{ width: 18, height: 18, borderRadius: 4, border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', lineHeight: 1 }}>−</button>
                                <div style={{ width: 20, height: 18, borderRadius: 4, background: qty > 0 ? '#dbeafe' : '#f5f5f5', border: `1px solid ${qty > 0 ? '#60a5fa' : '#ddd'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: qty > 0 ? '#1d4ed8' : '#ccc' }}>{qty}</div>
                                <button onClick={() => setTrade(country.code, num, Math.min(9, qty + 1))}
                                  style={{ width: 18, height: 18, borderRadius: 4, border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', lineHeight: 1 }}>+</button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── SAVE MODAL ── */}
      {showSaveModal && (
        <div style={modalBg} onClick={() => setShowSaveModal(false)}>
          <div style={modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>💾 Salvar progresso</div>
            <p style={{ fontSize: 13, color: '#555', marginBottom: 16, lineHeight: 1.5 }}>Copie este código e guarde. Cole de volta para continuar de onde parou — inclui álbum, lendárias e trocas.</p>
            <textarea readOnly value={saveCode} style={{ width: '100%', height: 90, borderRadius: 8, border: '1.5px solid #1a7a3c', padding: 10, fontSize: 11, fontFamily: 'monospace', resize: 'none', background: '#f7fdf9' }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={() => { navigator.clipboard.writeText(saveCode).then(() => showToast('✅ Copiado!')); setShowSaveModal(false); }} style={{ ...btnStyle('#1a7a3c', '#fff'), flex: 1, padding: '10px 0', fontSize: 14 }}>📋 Copiar código</button>
              <button onClick={() => setShowSaveModal(false)} style={{ ...btnStyle('#eee', '#333'), padding: '10px 16px' }}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOAD MODAL ── */}
      {showLoadModal && (
        <div style={modalBg} onClick={() => setShowLoadModal(false)}>
          <div style={modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>📥 Carregar progresso</div>
            <p style={{ fontSize: 13, color: '#555', marginBottom: 16, lineHeight: 1.5 }}>Cole o código que você salvou anteriormente:</p>
            <textarea value={loadInput} onChange={e => { setLoadInput(e.target.value); setLoadError(''); }} placeholder="Cole o código aqui..."
              style={{ width: '100%', height: 90, borderRadius: 8, border: `1.5px solid ${loadError ? '#e44' : '#c5d8c8'}`, padding: 10, fontSize: 11, fontFamily: 'monospace', resize: 'none' }} />
            {loadError && <div style={{ color: '#e44', fontSize: 12, marginTop: 4 }}>{loadError}</div>}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={handleLoad} style={{ ...btnStyle('#1a2e60', '#fff'), flex: 1, padding: '10px 0', fontSize: 14 }}>✅ Carregar</button>
              <button onClick={() => { setShowLoadModal(false); setLoadInput(''); setLoadError(''); }} style={{ ...btnStyle('#eee', '#333'), padding: '10px 16px' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0d1f12', color: '#fff', padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, zIndex: 999, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
