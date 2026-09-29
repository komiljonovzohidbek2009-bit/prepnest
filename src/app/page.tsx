import Link from 'next/link';

const cards=[
 {icon:'∑',title:'SAT Preparation',text:'Structured Math and Reading & Writing lessons, examples, practice and explanations.',href:'/sat'},
 {icon:'A',title:'IELTS Preparation',text:'Build Listening, Reading, Writing and Speaking skills with targeted practice.',href:'/ielts'},
 {icon:'✓',title:'Practice',text:'Answer questions, review explanations and track your accuracy.',href:'/practice'},
 {icon:'◫',title:'Resources',text:'A curated collection of free and official preparation resources.',href:'/resources'},
];
export default function Home(){return <>
 <nav className="nav"><div className="container navin"><div className="logo">Prep<span>Nest</span></div><div className="links"><Link href="/sat">SAT</Link><Link href="/ielts">IELTS</Link><Link href="/practice">Practice</Link><Link href="/resources">Resources</Link><Link href="/progress">Progress</Link><Link href="/login" className="btn primary">Sign in</Link></div></div></nav>
 <main><section className="hero"><div className="container"><span className="eyebrow">FREE SAT & IELTS PREPARATION</span><h1>Prepare. Practice. Progress.</h1><p>Everything you need to prepare for SAT and IELTS — structured learning, focused practice, useful resources and measurable progress.</p><div className="actions"><Link className="btn primary" href="/sat">Start SAT Prep</Link><Link className="btn secondary" href="/ielts">Explore IELTS</Link></div><div className="stats"><div className="stat"><strong>2</strong><span>Core exams</span></div><div className="stat"><strong>4+</strong><span>Learning areas</span></div><div className="stat"><strong>100%</strong><span>Free to start</span></div></div></div></section>
 <section className="section"><div className="container"><h2>Everything in one place.</h2><p className="sub">Learn the topic, practice it, understand your mistakes and keep improving.</p><div className="grid">{cards.map(c=><Link key={c.title} href={c.href} className="card" style={{textDecoration:'none',color:'inherit'}}><div className="icon">{c.icon}</div><h3>{c.title}</h3><p>{c.text}</p></Link>)}</div></div></section>
 </main><footer className="footer"><div className="container">© 2026 PrepNest. Free learning for ambitious students.</div></footer>
 </>}
