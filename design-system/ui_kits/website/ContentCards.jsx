/* ContentCards.jsx — Activity / Story / Toy cards (same shell, swappable accent) */

const D20ContentCard = ({ color='coral', tagLabel, title, meta, duration, age, image, onClick }) => (
  <article onClick={onClick} style={{
    cursor: onClick? 'pointer':'default',
    background:'#fff', border:'1px solid var(--d20-grey-15)',
    borderInlineStart:`5px solid var(--d20-${color})`,
    borderRadius:18, overflow:'hidden',
    boxShadow:'var(--d20-shadow-md)', transition:'transform .2s, box-shadow .2s',
    display:'flex',flexDirection:'column',
  }} onMouseEnter={(e)=>{if(onClick){e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='var(--d20-shadow-lg)';}}}
     onMouseLeave={(e)=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='var(--d20-shadow-md)';}}>
    {image && (
      <div style={{
        height:120, background:`var(--d20-${color}-light) url(${image}) center/cover no-repeat`,
      }}/>
    )}
    <div style={{padding:'14px 16px 16px'}}>
      {tagLabel && <D20Tag color={color}>{tagLabel}</D20Tag>}
      <h4 style={{margin:'8px 0 4px',fontSize:15,fontWeight:900,color:'var(--d20-grey-90)',lineHeight:1.3}}>{title}</h4>
      {meta && <p style={{margin:0,fontSize:12,color:'var(--d20-grey-70)',lineHeight:1.55}}>{meta}</p>}
      {(duration || age) && (
        <div style={{marginTop:10,display:'flex',gap:6,flexWrap:'wrap'}}>
          {duration && <D20Tag color={color}>{duration}</D20Tag>}
          {age && <D20Tag color={color}>{age}</D20Tag>}
        </div>
      )}
    </div>
  </article>
);

const D20ContentGrid = ({ cards, onPick }) => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',gap:14}}>
    {cards.map(c=>(
      <D20ContentCard key={c.id} {...c} onClick={onPick?()=>onPick(c):undefined}/>
    ))}
  </div>
);

Object.assign(window, { D20ContentCard, D20ContentGrid });
