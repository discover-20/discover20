/* CategoryGrid.jsx — Toys / Stories / Activities */

const D20_CATEGORIES = [
  {
    id:'toys', label:'Toys',
    color:'green', desc:'Developmental toys curated to your child\'s exact stage.',
    headerImg:'../../assets/header-toys.jpg',
    iconHTML: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="24" width="14" height="14" rx="3"/><rect x="26" y="24" width="14" height="14" rx="3"/><rect x="44" y="24" width="14" height="14" rx="3"/><circle cx="15" cy="46" r="6"/><circle cx="49" cy="46" r="6"/><path d="M21 46h22"/></svg>`,
  },
  {
    id:'stories', label:'Stories',
    color:'purple', desc:'Moral stories that build identity and values.',
    headerImg:'../../assets/header-stories.jpg',
    iconHTML: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 16h22a6 6 0 016 6v28a4 4 0 01-4 4H8z"/><path d="M56 16H34a6 6 0 00-6 6v28a4 4 0 004 4h24z"/></svg>`,
  },
  {
    id:'activities', label:'Activities',
    color:'coral', desc:'20-minute play sessions you can actually fit in.',
    headerImg:'../../assets/header-activities.jpg',
    iconHTML: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="22"/><path d="M32 16v16l11 6"/></svg>`,
  },
];

const D20CategoryGrid = ({ onPick }) => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:16}}>
    {D20_CATEGORIES.map(cat=>(
      <button key={cat.id} onClick={()=>onPick(cat.id)} style={{
        textAlign:'left', cursor:'pointer', border:'1px solid var(--d20-grey-15)',
        borderRadius:24, padding:22, background:'#fff',
        boxShadow:'var(--d20-shadow-md)',
        transition:'transform .2s var(--d20-ease-bounce), box-shadow .2s',
        fontFamily:'inherit',
      }} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='var(--d20-shadow-lg)';}}
         onMouseLeave={(e)=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='var(--d20-shadow-md)';}}>
        <div style={{
          width:64, height:64, borderRadius:18, marginBottom:16,
          background:`var(--d20-${cat.color}-light)`,
          color:`var(--d20-${cat.color}-dark)`,
          display:'flex',alignItems:'center',justifyContent:'center',
        }} dangerouslySetInnerHTML={{__html: cat.iconHTML}}/>
        <h3 style={{margin:'0 0 6px',fontWeight:900,fontSize:22,color:'var(--d20-grey-90)'}}>{cat.label}</h3>
        <p style={{margin:0,color:'var(--d20-grey-70)',fontSize:14,lineHeight:1.6}}>{cat.desc}</p>
        <div style={{
          marginTop:16, fontSize:13, fontWeight:800,
          color:`var(--d20-${cat.color}-dark)`,
          display:'inline-flex',alignItems:'center',gap:6,
        }}>Explore {cat.label.toLowerCase()} <span>→</span></div>
      </button>
    ))}
  </div>
);

Object.assign(window, { D20CategoryGrid, D20_CATEGORIES });
