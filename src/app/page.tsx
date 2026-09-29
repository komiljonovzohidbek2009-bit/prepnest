import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="badge">FREE SAT & IELTS PREPARATION</span>

          <h1>
            Prepare.
            <br />
            Practice.
            <br />
            <span>Progress.</span>
          </h1>

          <p>
            Everything you need to prepare for SAT and IELTS —
            structured learning, focused practice, useful resources
            and measurable progress.
          </p>

          <div className="hero-buttons">
            <Link href="/sat" className="primary-btn">
              Start SAT Prep
            </Link>

            <Link href="/ielts" className="secondary-btn">
              Explore IELTS
            </Link>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-card">
          <strong>2</strong>
          <span>Core exams</span>
        </div>

        <div className="stat-card">
          <strong>4+</strong>
          <span>Learning areas</span>
        </div>

        <div className="stat-card">
          <strong>100%</strong>
          <span>Free to start</span>
        </div>
      </section>

      <section className="features">
        <h2>Everything in one place.</h2>

        <div className="feature-grid">
          <Link href="/sat" className="feature-card">
            <h3>SAT Preparation</h3>
            <p>
              Math and Reading & Writing lessons, practice and explanations.
            </p>
          </Link>

          <Link href="/ielts" className="feature-card">
            <h3>IELTS Preparation</h3>
            <p>
              Listening, Reading, Writing, Speaking, vocabulary and grammar.
            </p>
          </Link>

          <Link href="/practice" className="feature-card">
            <h3>Practice</h3>
            <p>
              Practice questions and review your mistakes.
            </p>
          </Link>

          <Link href="/progress" className="feature-card">
            <h3>Your Progress</h3>
            <p>
              Track your learning and see how you are improving.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
