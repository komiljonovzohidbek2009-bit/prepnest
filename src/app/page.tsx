import Link from "next/link";

const features = [
  {
    title: "SAT Preparation",
    description:
      "Build your SAT skills with structured Math and Reading & Writing lessons, examples, and practice.",
    href: "/sat",
    label: "Explore SAT",
  },
  {
    title: "IELTS Preparation",
    description:
      "Prepare for Listening, Reading, Writing, Speaking, vocabulary, and grammar in one place.",
    href: "/ielts",
    label: "Explore IELTS",
  },
  {
    title: "Practice",
    description:
      "Answer questions, check explanations, identify weak areas, and review your mistakes.",
    href: "/practice",
    label: "Start practicing",
  },
  {
    title: "Study Planner",
    description:
      "Organize your preparation around your target score, exam date, and daily study goals.",
    href: "/planner",
    label: "Plan your study",
  },
];

const stats = [
  { number: "SAT", text: "Digital SAT preparation" },
  { number: "IELTS", text: "Academic & General preparation" },
  { number: "FREE", text: "Free learning platform" },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-background" />

        <div className="container hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            FREE SAT & IELTS PREPARATION
          </div>

          <h1>
            Prepare.
            <br />
            Practice.
            <br />
            <span>Progress.</span>
          </h1>

          <p className="hero-description">
            PrepNest is a free learning platform designed to help students
            prepare for SAT and IELTS with structured lessons, practice,
            resources, and progress tracking.
          </p>

          <div className="hero-actions">
            <Link href="/sat" className="btn btn-primary">
              Start SAT Prep
              <span>→</span>
            </Link>

            <Link href="/ielts" className="btn btn-secondary">
              Explore IELTS
              <span>→</span>
            </Link>
          </div>

          <div className="hero-note">
            No complicated setup. Start learning immediately.
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.number}>
              <strong>{stat.number}</strong>
              <span>{stat.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">LEARNING PLATFORM</span>
              <h2>Everything you need in one place.</h2>
            </div>

            <p>
              Learn the concepts, practice what you learn, and track your
              progress as you prepare for your exam.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <Link
                href={feature.href}
                className="feature-card"
                key={feature.title}
              >
                <div className="feature-top">
                  <div className="feature-icon">
                    {feature.title === "SAT Preparation"
                      ? "S"
                      : feature.title === "IELTS Preparation"
                      ? "I"
                      : feature.title === "Practice"
                      ? "P"
                      : "✓"}
                  </div>

                  <span className="arrow">↗</span>
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <span className="feature-link">{feature.label} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">HOW IT WORKS</span>
            <h2>A simple way to prepare.</h2>
            <p>
              PrepNest is built around a straightforward learning cycle.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Learn</h3>
              <p>
                Understand the concepts through clear, structured lessons and
                examples.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Practice</h3>
              <p>
                Apply what you learned with practice questions and detailed
                explanations.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Improve</h3>
              <p>
                Review mistakes, identify weak areas, and continue improving
                your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div>
              <span className="section-label">START TODAY</span>
              <h2>Your preparation starts here.</h2>
              <p>
                Choose your exam and start learning with PrepNest.
              </p>
            </div>

            <div className="cta-actions">
              <Link href="/sat" className="btn btn-light">
                SAT
              </Link>

              <Link href="/ielts" className="btn btn-outline-light">
                IELTS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
