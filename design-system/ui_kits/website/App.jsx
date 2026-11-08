/* App.jsx — top-level click-through prototype */

const SAMPLE = {
  toys: [
    { id:'t1', color:'green', tagLabel:'12–18 mo', title:'Wooden stacking rings', meta:'Builds fine motor & cause/effect', age:'12–18 mo', duration:'Open play', image:'../../assets/development-cognitive.jpg'},
    { id:'t2', color:'green', tagLabel:'2–3 yrs', title:'Shape-sorter cube',     meta:'Recognition & problem-solving',   age:'2–3 yrs',   duration:'15 min',  image:'../../assets/development-pediatrician.png'},
    { id:'t3', color:'green', tagLabel:'3–4 yrs', title:'Magnetic tile starter',  meta:'Spatial reasoning & creativity',  age:'3–4 yrs',   duration:'25 min',  image:'../../assets/development-communication.jpg'},
    { id:'t4', color:'green', tagLabel:'4–6 yrs', title:'Cooperative puzzle set', meta:'Patience & teamwork',             age:'4–6 yrs',   duration:'20 min',  image:'../../assets/development-social.webp'},
  ],
  stories: [
    { id:'s1', color:'purple', tagLabel:'Patience', title:'The Patient Date Palm', meta:'A bedtime tale from grandma\'s village', age:'3+', duration:'6 min read', image:'../../assets/development-cognitive.jpg'},
    { id:'s2', color:'purple', tagLabel:'Sharing',  title:'Two Brothers, One Lantern', meta:'A Ramadan story about giving', age:'4+', duration:'8 min read', image:'../../assets/launch-campaign.png'},
    { id:'s3', color:'purple', tagLabel:'Honesty',  title:'The Boy Who Found the Coin', meta:'Doing the right thing when no one\'s watching', age:'5+', duration:'7 min read', image:'../../assets/development-social.webp'},
    { id:'s4', color:'purple', tagLabel:'Courage',  title:'Layla and the Big Dark Room', meta:'Naming fears so they shrink', age:'3+', duration:'5 min read', image:'../../assets/development-pediatrician.png'},
  ],
  activities: [
    { id:'a1', color:'coral', tagLabel:'Sensory', title:'Rice & spoons bin', meta:'Pouring builds wrist control', age:'12–18 mo', duration:'10 min', image:'../../assets/development-communication.jpg'},
    { id:'a2', color:'coral', tagLabel:'Language', title:'Picture-book day', meta:'Naming objects in two languages', age:'2–3 yrs', duration:'15 min', image:'../../assets/development-cognitive.jpg'},
    { id:'a3', color:'coral', tagLabel:'Social',   title:'Family feelings chart', meta:'Naming today\'s feeling together', age:'3–4 yrs', duration:'8 min', image:'../../assets/development-social.webp'},
    { id:'a4', color:'coral', tagLabel:'Motor',    title:'Tape-line obstacle course', meta:'Whole-body coordination', age:'4–6 yrs', duration:'20 min', image:'../../assets/development-pediatrician.png'},
  ],
};

const D20Container = ({ children, narrow }) => (
  <div style={{ maxWidth: narrow?900:1100, margin:'0 auto', padding:'0 28px' }}>{children}</div>
);

const D20Section = ({ children, top=56 }) => (
  <section style={{ paddingTop: top }}>{children}</section>
);

/* ─── Pages ──────────────────────────────────────────────── */

function HomePage({ age, setAge, onPick, onCTA }) {
  return (
    <>
      <D20Hero onCTA={onCTA}/>
      <D20Container>
        <D20Section top={-28}>
          <D20AgeStageBar value={age} onChange={setAge}/>
        </D20Section>
        <D20Section>
          <D20Eyebrow color="teal">What's inside</D20Eyebrow>
          <h2 style={{margin:'0 0 18px',fontFamily:'var(--d20-font-display)',fontSize:30,fontWeight:900,color:'var(--d20-grey-90)'}}>
            Pick a category to start
          </h2>
          <D20CategoryGrid onPick={onPick}/>
        </D20Section>

        <D20Section>
          <D20Eyebrow color="coral">Our promise</D20Eyebrow>
          <D20TrustedHero/>
        </D20Section>

        <D20Section>
          <D20Eyebrow color="purple">By the numbers</D20Eyebrow>
          <D20StatsRow/>
        </D20Section>

        <D20Section>
          <D20Eyebrow color="green">Trusted professionals</D20Eyebrow>
          <D20ExpertRow/>
        </D20Section>

        <D20Section>
          <D20Eyebrow color="coral">Our values</D20Eyebrow>
          <D20ValuesGrid/>
        </D20Section>

        <D20Section>
          <D20CTAStrip onCTA={onCTA}/>
        </D20Section>
      </D20Container>
    </>
  );
}

function CategoryPage({ category, age, onBack, onPick }) {
  const cat = D20_CATEGORIES.find(c=>c.id===category);
  const cards = SAMPLE[category] || [];
  return (
    <>
      <div style={{
        background:`var(--d20-${cat.color})`,
        padding:'48px 28px 64px', position:'relative', overflow:'hidden',
        borderRadius:'0 0 48px 48px',
      }}>
        <D20Container>
          <button onClick={onBack} style={{
            border:'none', background:'rgba(255,255,255,.18)', color:'#fff',
            borderRadius:10, padding:'7px 12px', fontFamily:'inherit',
            fontWeight:700, fontSize:13, cursor:'pointer', marginBottom:18,
          }}>← Back</button>
          <h1 style={{margin:0,fontFamily:'var(--d20-font-display)',fontSize:'clamp(2rem,4.5vw,3rem)',fontWeight:900,color:'#fff',lineHeight:1.15}}>
            {cat.label}
          </h1>
          <p style={{color:'rgba(255,255,255,.9)',fontSize:15,marginTop:10,maxWidth:560,lineHeight:1.7}}>{cat.desc}</p>
        </D20Container>
      </div>
      <D20Container>
        <D20Section top={32}>
          <div style={{
            display:'flex',justifyContent:'space-between',alignItems:'center',
            marginBottom:18,flexWrap:'wrap',gap:12,
          }}>
            <D20Eyebrow color={cat.color}>For age {age}</D20Eyebrow>
            <div style={{display:'flex',gap:8}}>
              <D20Pill color={cat.color} active>All</D20Pill>
              <D20Pill color={cat.color}>New</D20Pill>
              <D20Pill color={cat.color}>Saved</D20Pill>
            </div>
          </div>
          <D20ContentGrid cards={cards} onPick={onPick}/>
        </D20Section>
        <D20Section>
          <D20CTAStrip/>
        </D20Section>
      </D20Container>
    </>
  );
}

function DetailSheet({ item, onClose }) {
  if (!item) return null;
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, background:'rgba(26,26,46,.5)', zIndex:80,
      display:'flex', alignItems:'flex-end', justifyContent:'center',
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:'min(560px, 100%)', background:'#fff',
        borderRadius:'24px 24px 0 0', padding:24,
        boxShadow:'var(--d20-shadow-xl)',
        animation:'slideup .25s var(--d20-ease-bounce)',
      }}>
        <style>{`@keyframes slideup{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}`}</style>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
          <div>
            <D20Tag color={item.color}>{item.tagLabel}</D20Tag>
            <h3 style={{margin:'8px 0 4px',fontWeight:900,fontSize:22,color:'var(--d20-grey-90)'}}>{item.title}</h3>
            <p style={{margin:0,color:'var(--d20-grey-70)',fontSize:14}}>{item.meta}</p>
          </div>
          <button onClick={onClose} style={{border:'none',background:'var(--d20-grey-08)',width:34,height:34,borderRadius:10,cursor:'pointer',fontSize:16,fontWeight:900,color:'var(--d20-grey-70)'}}>×</button>
        </div>
        <div style={{display:'flex',gap:8,marginTop:14}}>
          <D20Tag color={item.color}>{item.duration}</D20Tag>
          <D20Tag color={item.color}>Age {item.age}</D20Tag>
        </div>
        <div style={{
          marginTop:16, padding:16, background:`var(--d20-${item.color}-light)`,
          borderRadius:14, fontSize:13, color:'var(--d20-grey-90)', lineHeight:1.7,
        }}>
          <b>What you'll need:</b> nothing more than what's in the cupboard.
          Discover20 walks you through the activity step-by-step — narrated by
          one of our pediatric consultants.
        </div>
        <div style={{marginTop:18,display:'flex',gap:10}}>
          <D20Button variant={item.color==='coral'?'coral':item.color==='purple'?'purple':'primary'} icon="→">Start activity</D20Button>
          <D20Button variant="ghost">Save for later</D20Button>
        </div>
      </div>
    </div>
  );
}

function SignupSheet({ onClose }) {
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(26,26,46,.5)',zIndex:90,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{width:'min(440px,100%)',background:'#fff',borderRadius:24,padding:28,boxShadow:'var(--d20-shadow-xl)'}}>
        <D20Eyebrow color="teal">Free trial</D20Eyebrow>
        <h3 style={{margin:'0 0 6px',fontFamily:'var(--d20-font-display)',fontSize:24,fontWeight:900,color:'var(--d20-grey-90)'}}>Welcome to Discover20</h3>
        <p style={{margin:'0 0 18px',color:'var(--d20-grey-70)',fontSize:14,lineHeight:1.65}}>Tell us about your child and we'll match daily activities to their exact stage.</p>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[['Your name','Asmaa'],['Child\'s name','Yara'],['Child\'s date of birth','2023-04-12']].map(([l,v])=>(
            <label key={l} style={{display:'flex',flexDirection:'column',gap:4}}>
              <span style={{fontSize:12,fontWeight:800,color:'var(--d20-grey-90)'}}>{l}</span>
              <input defaultValue={v} style={{fontFamily:'inherit',fontSize:14,padding:'12px 14px',borderRadius:14,border:'1px solid var(--d20-grey-15)'}}/>
            </label>
          ))}
        </div>
        <D20Button onClick={onClose} icon="→" style={{marginTop:16,width:'100%',justifyContent:'center'}}>Create my plan</D20Button>
        <button onClick={onClose} style={{display:'block',margin:'10px auto 0',background:'none',border:'none',color:'var(--d20-grey-50)',fontSize:13,fontFamily:'inherit',cursor:'pointer'}}>Maybe later</button>
      </div>
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────── */

function App() {
  const [lang, setLang]   = React.useState('en');
  const [page, setPage]   = React.useState('home'); // home | toys | stories | activities | about | contact
  const [age, setAge]     = React.useState('1-2y');
  const [item, setItem]   = React.useState(null);
  const [signup, setSignup] = React.useState(false);

  const isCategory = ['toys','stories','activities'].includes(page);

  return (
    <div dir={lang==='ar'?'rtl':'ltr'} style={{
      minHeight:'100vh', background:'var(--d20-bg-canvas)',
      fontFamily: lang==='ar' ? 'var(--d20-font-arabic)' : 'var(--d20-font-body)',
    }}>
      <D20Header
        lang={lang} setLang={setLang}
        current={page}
        onNav={(p)=>setPage(p)}
        onCTA={()=>setSignup(true)}
      />
      {page==='home' && (
        <HomePage age={age} setAge={setAge}
          onPick={(c)=>setPage(c)} onCTA={()=>setSignup(true)}/>
      )}
      {isCategory && (
        <CategoryPage category={page} age={age}
          onBack={()=>setPage('home')}
          onPick={setItem}/>
      )}
      {page==='about' && (
        <D20Container narrow>
          <D20Section top={48}>
            <D20Eyebrow>About</D20Eyebrow>
            <h1 style={{margin:'0 0 14px',fontFamily:'var(--d20-font-display)',fontSize:38,fontWeight:900,color:'var(--d20-grey-90)',lineHeight:1.15}}>We're a small team building a giant first 6 years.</h1>
            <p style={{fontSize:16,color:'var(--d20-grey-70)',lineHeight:1.85,maxWidth:640}}>Discover20 is an early childhood platform for mothers and their children, offering activities and toys mapped to your child's exact developmental stage, moral stories that build identity, and clinically validated developmental screening — rooted in Arab culture, designed for the way families actually live.</p>
          </D20Section>
          <D20Section><D20Eyebrow color="coral">Vision &amp; Mission</D20Eyebrow><D20TrustedHero/></D20Section>
          <D20Section><D20Eyebrow color="purple">Our values</D20Eyebrow><D20ValuesGrid/></D20Section>
          <D20Section><D20StatsRow/></D20Section>
          <D20Section><D20CTAStrip onCTA={()=>setSignup(true)}/></D20Section>
        </D20Container>
      )}
      {page==='contact' && (
        <D20Container narrow>
          <D20Section top={48}>
            <D20Eyebrow color="coral">Contact</D20Eyebrow>
            <h1 style={{margin:'0 0 14px',fontFamily:'var(--d20-font-display)',fontSize:38,fontWeight:900,color:'var(--d20-grey-90)'}}>We're here for you.</h1>
            <p style={{fontSize:16,color:'var(--d20-grey-70)',lineHeight:1.85,maxWidth:560}}>Drop us a note — every message is read by a real human on the Discover20 team.</p>
          </D20Section>
          <D20Section>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              {[{i:'discover20.com',l:'Website',c:'teal'},{i:'info@Discover20.com',l:'Email',c:'coral'},{i:'+20 111 111 1111',l:'Phone',c:'purple'},{i:'Mon–Fri 9–6',l:'Hours',c:'green'}].map(card=>(
                <div key={card.l} style={{background:'#fff',border:'1px solid var(--d20-grey-15)',borderInlineStart:`5px solid var(--d20-${card.c})`,borderRadius:18,padding:20}}>
                  <div style={{fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',fontWeight:800,color:'var(--d20-grey-70)'}}>{card.l}</div>
                  <div style={{fontSize:18,fontWeight:900,marginTop:6,color:'var(--d20-grey-90)'}}>{card.i}</div>
                </div>
              ))}
            </div>
          </D20Section>
          <D20Section><D20CTAStrip onCTA={()=>setSignup(true)}/></D20Section>
        </D20Container>
      )}
      <D20Footer/>

      <DetailSheet item={item} onClose={()=>setItem(null)}/>
      {signup && <SignupSheet onClose={()=>setSignup(false)}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
