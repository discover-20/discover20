/* Primitives.jsx — Discover20 atoms */

const D20Button = ({ variant = 'primary', size = 'md', icon, children, onClick, style }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    fontWeight: 800, transition: 'opacity .2s, transform .12s',
    borderRadius: 14, whiteSpace: 'nowrap', lineHeight: 1.2,
  };
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 12, borderRadius: 10 },
    md: { padding: '12px 22px', fontSize: 14 },
    lg: { padding: '14px 28px', fontSize: 15 },
  };
  const variants = {
    primary: { background: 'var(--d20-teal)', color: '#fff', boxShadow: 'var(--d20-shadow-brand)' },
    coral:   { background: 'var(--d20-coral)', color: '#fff' },
    purple:  { background: 'var(--d20-purple)', color: '#fff' },
    green:   { background: 'var(--d20-green)', color: '#fff' },
    ghost:   { background: 'transparent', color: 'var(--d20-teal-dark)', boxShadow: 'inset 0 0 0 2px var(--d20-teal)' },
    subtle:  { background: 'var(--d20-teal-light)', color: 'var(--d20-teal-dark)' },
    white:   { background: '#fff', color: 'var(--d20-teal-dark)' },
  };
  return (
    <button
      onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={(e)=>{ e.currentTarget.style.transform='scale(.98)'; }}
      onMouseUp={(e)=>{ e.currentTarget.style.transform=''; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.transform=''; }}
    >
      {children}{icon && <span>{icon}</span>}
    </button>
  );
};

const D20Pill = ({ color = 'teal', active, children, onClick }) => {
  const c = `var(--d20-${color})`;
  const bg = active ? c : `var(--d20-${color}-light)`;
  const fg = active ? '#fff' : `var(--d20-${color}-dark)`;
  return (
    <button onClick={onClick} style={{
      display:'inline-flex', alignItems:'center', gap:6,
      borderRadius:999, padding:'7px 16px',
      fontSize:13, fontWeight:700, fontFamily:'inherit',
      background:bg, color:fg, border:'none', cursor:'pointer',
      transition:'background .15s, color .15s', whiteSpace:'nowrap',
    }}>
      <span style={{width:7,height:7,borderRadius:'50%',background:active?'#fff':c}}/>
      {children}
    </button>
  );
};

const D20Eyebrow = ({ color = 'teal', children }) => (
  <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:18}}>
    <span style={{width:10,height:10,borderRadius:'50%',background:`var(--d20-${color})`,flex:'none'}}/>
    <span style={{
      fontSize:11, fontWeight:800, letterSpacing:'.14em',
      textTransform:'uppercase', color:'var(--d20-grey-70)'
    }}>{children}</span>
  </div>
);

const D20Badge = ({ color = 'teal', children }) => (
  <span style={{
    display:'inline-flex', alignItems:'center', gap:6,
    background:`rgba(255,255,255,0.18)`, color:'#fff',
    borderRadius:14, padding:'5px 14px',
    fontSize:12, fontWeight:700, whiteSpace:'nowrap', lineHeight:1.2,
  }}>{children}</span>
);

const D20Tag = ({ color='teal', children }) => (
  <span style={{
    display:'inline-block', fontSize:10, fontWeight:800,
    letterSpacing:'.08em', textTransform:'uppercase',
    padding:'4px 10px', borderRadius:8,
    background:`var(--d20-${color}-light)`,
    color:`var(--d20-${color}-dark)`,
  }}>{children}</span>
);

const D20Logo = ({ height = 36, white }) => (
  <img src={white ? '../../assets/logo-white.svg' : '../../assets/logo-teal.svg'}
       alt="Discover20" style={{ height, display:'block' }}
       onError={(e)=>{e.target.src='../../assets/logo-teal.png';}} />
);

Object.assign(window, { D20Button, D20Pill, D20Eyebrow, D20Badge, D20Tag, D20Logo });
