/* Hero.jsx */
const D20Hero = ({ onCTA }) => (
  <section style={{
    background:'var(--d20-teal)',
    padding:'72px 28px 70px',
    textAlign:'center', position:'relative', overflow:'hidden',
    borderRadius:'0 0 48px 48px',
  }}>
    {[{w:260,t:-80,r:-60,d:0},{w:180,b:-60,l:-40,d:2},{w:120,t:30,l:'15%',d:4}].map((b,i)=>(
      <span key={i} style={{
        position:'absolute', borderRadius:'50%',
        background:'rgba(255,255,255,0.07)',
        width:b.w, height:b.w,
        top:b.t, bottom:b.b, left:b.l, right:b.r,
        animation:`d20float 6s ease-in-out ${b.d}s infinite`,
      }}/>
    ))}
    <style>{`@keyframes d20float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}`}</style>

    <div style={{position:'relative'}}>
      <D20Badge><span style={{width:8,height:8,borderRadius:'50%',background:'#fff',display:'inline-block'}}/>About Discover20</D20Badge>
      <h1 style={{
        fontFamily:'var(--d20-font-display)',
        fontSize:'clamp(2.2rem, 5vw, 3.4rem)',
        fontWeight:900, color:'#fff',
        lineHeight:1.15, margin:'18px 0 14px',
      }}>
        Your child's first 6 years<br/>
        <em style={{fontStyle:'normal',opacity:.85}}>are everything.</em>
      </h1>
      <p style={{
        fontSize:16, color:'rgba(255,255,255,.88)',
        maxWidth:560, margin:'0 auto 26px', lineHeight:1.75,
      }}>
        We believe early childhood is the foundation when your child's personality, abilities, and character take their shape. Discover20 turns 20 minutes of your day into a guided journey of play, stories, and discovery.
      </p>
      <div style={{display:'flex',justifyContent:'center',gap:10,flexWrap:'wrap'}}>
        <D20Button variant="white" onClick={onCTA} icon="→">Start for free</D20Button>
        <D20Button variant="ghost" style={{background:'rgba(255,255,255,.12)', color:'#fff', boxShadow:'inset 0 0 0 2px rgba(255,255,255,.4)'}}>Watch how it works</D20Button>
      </div>
    </div>
  </section>
);
Object.assign(window, { D20Hero });
