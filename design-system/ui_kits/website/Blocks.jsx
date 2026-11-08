/* ExpertCard.jsx + ValuesGrid.jsx + TrustedHero.jsx + CTAStrip.jsx + Footer.jsx
   Bundled together so index.html only loads a small number of script tags. */

/* --- ExpertCard --- */
const D20ExpertRow = () => (
  <div style={{
    background:'#fff', border:'1px solid var(--d20-grey-15)',
    borderRadius:20, padding:24,
  }}>
    <div style={{
      fontSize:12, fontWeight:800, letterSpacing:'.12em',
      textTransform:'uppercase', color:'var(--d20-grey-70)', marginBottom:14,
    }}>Connect with trusted professionals</div>
    <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
      {[
        {c:'purple', n:'+10', l:'Psychological Experts'},
        {c:'teal',   n:'+5',  l:'Parenting Coaches'},
        {c:'coral',  n:'+2',  l:'Development Experts'},
      ].map(e=>(
        <div key={e.l} style={{
          display:'flex', alignItems:'center', gap:10,
          background:`var(--d20-${e.c}-light)`, color:`var(--d20-${e.c}-dark)`,
          borderRadius:14, padding:'12px 18px',
          fontSize:14, fontWeight:700,
        }}>
          <span style={{fontSize:22,fontWeight:900,lineHeight:1}}>{e.n}</span>
          <span>{e.l}</span>
        </div>
      ))}
    </div>
  </div>
);

/* --- ValuesGrid --- */
const D20_VALUES = [
  {n:'01', t:'Integrity',      d:'Honesty, transparency, responsibility in everything we do.', c:'teal'},
  {n:'02', t:'Empathy',        d:'We design with care for the real challenges moms face.',     c:'coral'},
  {n:'03', t:'Responsibility', d:'Experiences that truly benefit a child\'s development.',     c:'purple'},
  {n:'04', t:'Companionship',  d:'Walking alongside every mother — never alone.',              c:'yellow'},
];

const D20ValuesGrid = () => (
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
    {D20_VALUES.map(v=>(
      <div key={v.n} style={{
        background:'#fff', border:'1px solid var(--d20-grey-15)',
        borderRadius:18, padding:20,
        display:'flex', gap:14, alignItems:'flex-start',
        transition:'transform .2s, box-shadow .2s',
      }} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='var(--d20-shadow-md)';}}
         onMouseLeave={(e)=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='';}}>
        <div style={{
          width:38, height:38, borderRadius:11,
          background:`var(--d20-${v.c})`, color: v.c==='yellow'? 'var(--d20-black)' : '#fff',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontWeight:900, fontSize:13, flex:'none',
        }}>{v.n}</div>
        <div>
          <h4 style={{margin:'0 0 4px',fontWeight:900,fontSize:15,color:'var(--d20-grey-90)'}}>{v.t}</h4>
          <p style={{margin:0,fontSize:13,color:'var(--d20-grey-70)',lineHeight:1.65}}>{v.d}</p>
        </div>
      </div>
    ))}
  </div>
);

/* --- TrustedHero --- */
const D20TrustedHero = () => (
  <div style={{
    background:'var(--d20-teal)', borderRadius:24, padding:32,
    color:'#fff', position:'relative', overflow:'hidden',
  }}>
    <div style={{position:'absolute',top:-30,right:-30,width:140,height:140,borderRadius:'50%',background:'rgba(255,255,255,.08)'}}/>
    <D20Badge>Free Trial</D20Badge>
    <h2 style={{margin:'14px 0 10px',fontFamily:'var(--d20-font-display)',fontSize:'1.6rem',fontWeight:900,lineHeight:1.25}}>
      Resources you can actually trust
    </h2>
    <p style={{margin:0,fontSize:14,opacity:.9,lineHeight:1.75,maxWidth:520,position:'relative'}}>
      Every resource on Discover20 follows <b>CDC &amp; AAP</b> milestones, is reviewed by <b>Pediatric Consultants</b>, and is timed to your baby's <b>neuroplasticity window</b>.
    </p>
  </div>
);

/* --- CTAStrip --- */
const D20CTAStrip = ({ onCTA }) => (
  <div style={{
    background:'var(--d20-teal)', borderRadius:24, padding:'36px 32px',
    textAlign:'center', color:'#fff', position:'relative', overflow:'hidden',
  }}>
    <div style={{position:'absolute',top:-40,right:-30,width:160,height:160,borderRadius:'50%',background:'rgba(255,255,255,.08)'}}/>
    <div style={{position:'absolute',bottom:-30,left:'20%',width:110,height:110,borderRadius:'50%',background:'rgba(255,255,255,.06)'}}/>
    <h3 style={{margin:'0 0 6px',fontFamily:'var(--d20-font-display)',fontSize:'1.45rem',fontWeight:900,position:'relative'}}>
      Join thousands of mothers already using Discover20
    </h3>
    <p style={{margin:'0 auto 22px',fontSize:14,opacity:.9,maxWidth:520,position:'relative'}}>
      Personalised activities, stories and expert support — matched to your child's age, starting today.
    </p>
    <D20Button variant="white" onClick={onCTA} icon="→">Start for free</D20Button>
  </div>
);

/* --- Footer --- */
const D20Footer = () => (
  <footer style={{
    background:'#fff', borderTop:'1px solid var(--d20-grey-15)', marginTop:60,
  }}>
    <div style={{
      maxWidth:1100, margin:'0 auto', padding:'40px 28px 28px',
      display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:32,
    }}>
      <div>
        <D20Logo height={44}/>
        <p style={{marginTop:14,fontSize:13,color:'var(--d20-grey-70)',lineHeight:1.7,maxWidth:300}}>
          Young Secrets… Great Solutions. Built for moms in the first 6 years of a child's life.
        </p>
        <div style={{marginTop:14,fontSize:13,color:'var(--d20-grey-70)'}}>
          <div><b style={{color:'var(--d20-teal-dark)'}}>discover20.com</b></div>
          <div>Walaa.nasr@discover20.com</div>
        </div>
      </div>
      {[
        {h:'Explore', l:['Toys','Stories','Activities','Assessment Tests']},
        {h:'Company', l:['About','Our Values','Experts','Careers']},
        {h:'Support', l:['Contact','Privacy','Terms','FAQ']},
      ].map(col=>(
        <div key={col.h}>
          <div style={{fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',fontWeight:800,color:'var(--d20-grey-50)',marginBottom:14}}>{col.h}</div>
          <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:8}}>
            {col.l.map(i=>(
              <li key={i}><a style={{fontSize:14,color:'var(--d20-grey-90)',textDecoration:'none',fontWeight:600}}>{i}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div style={{
      borderTop:'1px solid var(--d20-grey-15)',
      padding:'14px 28px', textAlign:'center',
      fontSize:12, color:'var(--d20-grey-50)',
    }}>© 2025 Discover20. All rights reserved.</div>
  </footer>
);

Object.assign(window, { D20ExpertRow, D20ValuesGrid, D20TrustedHero, D20CTAStrip, D20Footer });
