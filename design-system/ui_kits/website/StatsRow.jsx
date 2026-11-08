/* StatsRow.jsx */
const D20_STATS = [
  { color:'teal',   num:'+500', label:'Activities' },
  { color:'coral',  num:'+200', label:'Developmental Toys' },
  { color:'purple', num:'+300', label:'Moral Stories' },
  { color:'yellow', num:'+5',   label:'Assessment Tests' },
];

const D20StatsRow = () => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:14}}>
    {D20_STATS.map(s=>{
      const numColor = s.color==='yellow' ? '#92700A' : `var(--d20-${s.color})`;
      return (
        <div key={s.label} style={{
          background:'#fff', border:'1px solid var(--d20-grey-15)',
          borderTop:`3px solid var(--d20-${s.color})`,
          borderRadius:18, padding:'22px 16px',
          textAlign:'center', transition:'transform .2s',
        }} onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-3px)'}
           onMouseLeave={(e)=>e.currentTarget.style.transform=''}>
          <div style={{fontSize:'2.2rem',fontWeight:900,lineHeight:1,color:numColor,letterSpacing:'-.02em'}}>{s.num}</div>
          <div style={{fontSize:13,fontWeight:800,marginTop:6,color:'var(--d20-grey-90)'}}>{s.label}</div>
        </div>
      );
    })}
  </div>
);

Object.assign(window, { D20StatsRow });
