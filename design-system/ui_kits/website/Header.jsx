/* Header.jsx */
const D20Header = ({ lang, setLang, onNav, onCTA, current }) => {
  const items = [
    { id:'home', label:'Home' },
    { id:'about', label:'About' },
    { id:'toys', label:'Toys' },
    { id:'stories', label:'Stories' },
    { id:'activities', label:'Activities' },
    { id:'contact', label:'Contact' },
  ];
  return (
    <header style={{
      position:'sticky', top:0, zIndex:50,
      background:'rgba(255,255,255,.92)',
      backdropFilter:'saturate(180%) blur(10px)',
      borderBottom:'1px solid var(--d20-grey-15)',
    }}>
      <div style={{
        maxWidth:1100, margin:'0 auto', padding:'14px 28px',
        display:'flex', alignItems:'center', gap:24,
      }}>
        <a onClick={()=>onNav('home')} style={{cursor:'pointer',display:'flex'}}><D20Logo height={38}/></a>
        <nav style={{display:'flex',gap:6,flex:1,marginInlineStart:18}}>
          {items.map(it=>(
            <button key={it.id} onClick={()=>onNav(it.id)} style={{
              border:'none', background:current===it.id?'var(--d20-teal-light)':'transparent',
              color:current===it.id?'var(--d20-teal-dark)':'var(--d20-grey-90)',
              fontFamily:'inherit', fontWeight:700, fontSize:14,
              padding:'8px 14px', borderRadius:10, cursor:'pointer',
              transition:'background .15s, color .15s',
            }}>{it.label}</button>
          ))}
        </nav>
        <div style={{display:'flex',gap:6,alignItems:'center',background:'var(--d20-grey-08)',padding:3,borderRadius:999}}>
          {['EN','عر'].map((l,i)=>{
            const code = i===0?'en':'ar';
            const on = lang===code;
            return (
              <button key={code} onClick={()=>setLang(code)} style={{
                border:'none', background:on?'#fff':'transparent', color:on?'var(--d20-teal-dark)':'var(--d20-grey-70)',
                fontFamily: code==='ar' ? 'var(--d20-font-arabic)' : 'inherit',
                fontWeight:800, fontSize:12, padding:'6px 12px', borderRadius:999,
                cursor:'pointer', boxShadow:on?'var(--d20-shadow-sm)':'none',
              }}>{l}</button>
            );
          })}
        </div>
        <D20Button onClick={onCTA} size="sm" icon="→">Start for free</D20Button>
      </div>
    </header>
  );
};
Object.assign(window, { D20Header });
