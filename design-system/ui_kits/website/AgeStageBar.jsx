/* AgeStageBar.jsx */
const D20_AGES = [
  { id:'0-6m',  label:'0–6 months',  color:'teal' },
  { id:'6-12m', label:'6–12 months', color:'coral' },
  { id:'1-2y',  label:'1–2 years',   color:'yellow' },
  { id:'2-3y',  label:'2–3 years',   color:'purple' },
  { id:'3-4y',  label:'3–4 years',   color:'green' },
  { id:'4-6y',  label:'4–6 years',   color:'teal' },
];

const D20AgeStageBar = ({ value, onChange }) => (
  <div style={{
    background:'#fff', border:'1px solid var(--d20-grey-15)',
    borderRadius:18, padding:'14px 18px', boxShadow:'var(--d20-shadow-sm)',
  }}>
    <D20Eyebrow color="teal">Choose your child's age</D20Eyebrow>
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {D20_AGES.map(a => (
        <D20Pill key={a.id} color={a.color==='yellow'?'coral':a.color}
          active={value===a.id} onClick={()=>onChange(a.id)}>
          {a.label}
        </D20Pill>
      ))}
    </div>
  </div>
);

Object.assign(window, { D20AgeStageBar, D20_AGES });
