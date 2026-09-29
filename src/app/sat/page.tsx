"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  id: number;
  domain: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const mathDomains = [
  {
    title: "Algebra",
    description:
      "Linear equations, linear functions, systems, and inequalities.",
    percentage: "~35%",
    topics: [
      "Linear equations in one variable",
      "Linear equations in two variables",
      "Linear functions",
      "Systems of linear equations",
      "Linear inequalities",
    ],
  },
  {
    title: "Advanced Math",
    description:
      "Nonlinear equations, functions, polynomials, quadratics, and exponentials.",
    percentage: "~35%",
    topics: [
      "Equivalent expressions",
      "Quadratic equations",
      "Exponential equations",
      "Polynomial equations",
      "Radical and rational equations",
      "Nonlinear functions",
    ],
  },
  {
    title: "Problem-Solving & Data Analysis",
    description:
      "Ratios, percentages, statistics, probability, and data interpretation.",
    percentage: "~15%",
    topics: [
      "Ratios and rates",
      "Percentages",
      "One-variable data",
      "Two-variable data",
      "Probability",
      "Statistical claims",
    ],
  },
  {
    title: "Geometry & Trigonometry",
    description:
      "Area, volume, angles, triangles, circles, and right-triangle trigonometry.",
    percentage: "~15%",
    topics: [
      "Area and volume",
      "Lines and angles",
      "Triangles",
      "Right triangles",
      "Trigonometry",
      "Circles",
    ],
  },
];

const rwDomains = [
  {
    title: "Information & Ideas",
    description:
      "Understand, analyze, infer, and evaluate information from texts and graphics.",
    topics: [
      "Central Ideas and Details",
      "Inferences",
      "Command of Evidence",
      "Quantitative Evidence",
    ],
  },
  {
    title: "Craft & Structure",
    description:
      "Analyze vocabulary, structure, purpose, and connections between texts.",
    topics: [
      "Words in Context",
      "Text Structure and Purpose",
      "Cross-Text Connections",
    ],
  },
  {
    title: "Expression of Ideas",
    description:
      "Improve written expression and make ideas logical and cohesive.",
    topics: ["Rhetorical Synthesis", "Transitions"],
  },
  {
    title: "Standard English Conventions",
    description:
      "Apply grammar, punctuation, sentence structure, and usage conventions.",
    topics: ["Boundaries", "Form, Structure, and Sense"],
  },
];

const questions: Question[] = [
  {
    id: 1,
    domain: "Algebra",
    topic: "Linear equations in one variable",
    difficulty: "Easy",
    question:
      "If 3x + 7 = 25, what is the value of x?",
    options: ["4", "5", "6", "8"],
    answer: 0,
    explanation:
      "Subtract 7 from both sides: 3x = 18. Divide by 3: x = 6. Therefore, the correct answer is C.",
  },
  {
    id: 2,
    domain: "Algebra",
    topic: "Linear functions",
    difficulty: "Medium",
    question:
      "A linear function has the form f(x) = mx + b. If f(2) = 11 and f(5) = 20, what is the value of m?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    explanation:
      "The slope is (20 − 11) / (5 − 2) = 9 / 3 = 3. Therefore, m = 3.",
  },
  {
    id: 3,
    domain: "Algebra",
    topic: "Systems of equations",
    difficulty: "Medium",
    question:
      "If x + y = 11 and x − y = 3, what is the value of x?",
    options: ["4", "6", "7", "8"],
    answer: 2,
    explanation:
      "Add the two equations: 2x = 14. Therefore x = 7.",
  },
  {
    id: 4,
    domain: "Advanced Math",
    topic: "Quadratic equations",
    difficulty: "Medium",
    question:
      "If x² − 9x + 20 = 0, which of the following could be a value of x?",
    options: ["2", "4", "6", "9"],
    answer: 1,
    explanation:
      "Factor the quadratic: (x − 4)(x − 5) = 0. Thus x = 4 or x = 5. Among the choices, 4 is correct.",
  },
  {
    id: 5,
    domain: "Problem-Solving & Data Analysis",
    topic: "Percentages",
    difficulty: "Easy",
    question:
      "A jacket originally costs $80. Its price is increased by 15%. What is the new price?",
    options: ["$88", "$90", "$92", "$95"],
    answer: 2,
    explanation:
      "15% of $80 is $12. Add $12 to $80: $92.",
  },
  {
    id: 6,
    domain: "Problem-Solving & Data Analysis",
    topic: "Mean",
    difficulty: "Easy",
    question:
      "The numbers 6, 8, 10, 12, and 14 have a mean of what value?",
    options: ["8", "9", "10", "12"],
    answer: 2,
    explanation:
      "The sum is 50. There are 5 numbers, so the mean is 50 ÷ 5 = 10.",
  },
  {
    id: 7,
    domain: "Geometry & Trigonometry",
    topic: "Area",
    difficulty: "Easy",
    question:
      "A rectangle has a length of 12 and a width of 7. What is its area?",
    options: ["19", "38", "72", "84"],
    answer: 3,
    explanation:
      "The area of a rectangle is length × width. Therefore, 12 × 7 = 84.",
  },
  {
    id: 8,
    domain: "Geometry & Trigonometry",
    topic: "Right triangles",
    difficulty: "Medium",
    question:
      "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
    options: ["9", "10", "12", "14"],
    answer: 1,
    explanation:
      "Using the Pythagorean theorem: c² = 6² + 8² = 36 + 64 = 100. Therefore c = 10.",
  },
  {
    id: 9,
    domain: "Information & Ideas",
    topic: "Central Ideas and Details",
    difficulty: "Easy",
    question:
      "Researchers observed that students who regularly reviewed their mistakes tended to retain concepts longer than students who only completed new questions. Which statement best expresses the central idea?",
    options: [
      "Students should avoid difficult questions.",
      "Reviewing mistakes can support longer-term learning.",
      "New questions are more useful than old questions.",
      "Researchers should stop studying student behavior.",
    ],
    answer: 1,
    explanation:
      "The passage focuses on the relationship between reviewing mistakes and retaining concepts. Therefore, B best states the central idea.",
  },
  {
    id: 10,
    domain: "Craft & Structure",
    topic: "Words in Context",
    difficulty: "Medium",
    question:
      "Although the initial results appeared promising, the researchers remained cautious because the sample size was small. As used in the text, 'cautious' most nearly means:",
    options: [
      "careful",
      "excited",
      "confused",
      "uninterested",
    ],
    answer: 0,
    explanation:
      "Because the sample size was small, the researchers did not want to make a strong conclusion. 'Cautious' means careful.",
  },
  {
    id: 11,
    domain: "Expression of Ideas",
    topic: "Transitions",
    difficulty: "Medium",
    question:
      "A study found that regular physical activity was associated with improved concentration. ______, the researchers noted that the study did not establish a cause-and-effect relationship.",
    options: [
      "For example",
      "However",
      "Similarly",
      "Therefore",
    ],
    answer: 1,
    explanation:
      "The second sentence contrasts with the first: the study found an association, but it did not establish causation. 'However' provides the correct transition.",
  },
  {
    id: 12,
    domain: "Standard English Conventions",
    topic: "Sentence boundaries",
    difficulty: "Medium",
    question:
      "The museum opened a new science exhibition last month ______ it has already attracted thousands of visitors.",
    options: [
      "month, it",
      "month; it",
      "month it",
      "month: and it",
    ],
    answer: 1,
    explanation:
      "Both sides are independent clauses. A semicolon can correctly join two closely related independent clauses.",
  },
];

export default function SATPage() {
  const [activeSection, setActiveSection] = useState<"overview" | "practice">(
    "overview"
  );

  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [filterDomain, setFilterDomain] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");

  const domains = [
    "All",
    "Algebra",
    "Advanced Math",
    "Problem-Solving & Data Analysis",
    "Geometry & Trigonometry",
    "Information & Ideas",
    "Craft & Structure",
    "Expression of Ideas",
    "Standard English Conventions",
  ];

  const filteredQuestions = questions.filter((q) => {
    const domainMatch =
      filterDomain === "All" || q.domain === filterDomain;

    const difficultyMatch =
      filterDifficulty === "All" ||
      q.difficulty === filterDifficulty;

    return domainMatch && difficultyMatch;
  });

  const currentQuestion = filteredQuestions[selectedQuestion];

  function chooseAnswer(index: number) {
    if (!submitted) {
      setSelectedAnswer(index);
    }
  }

  function submitAnswer() {
    if (selectedAnswer !== null) {
      setSubmitted(true);
    }
  }

  function nextQuestion() {
    setSelectedAnswer(null);
    setSubmitted(false);

    if (selectedQuestion < filteredQuestions.length - 1) {
      setSelectedQuestion(selectedQuestion + 1);
    } else {
      setSelectedQuestion(0);
    }
  }

  function changeFilter(
    type: "domain" | "difficulty",
    value: string
  ) {
    if (type === "domain") {
      setFilterDomain(value);
    } else {
      setFilterDifficulty(value);
    }

    setSelectedQuestion(0);
    setSelectedAnswer(null);
    setSubmitted(false);
  }

  return (
    <main className="sat-page">
      {/* HERO */}
      <section className="sat-hero">
        <div className="container">
          <span className="section-label">SAT PREPARATION</span>

          <h1>
            Master the SAT
            <br />
            <span>one skill at a time.</span>
          </h1>

          <p>
            Learn the concepts, practice with original SAT-style questions,
            review explanations, and build confidence across every tested
            domain.
          </p>

          <div className="sat-hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                setActiveSection("practice");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Start Practice →
            </button>

            <a
              className="btn btn-secondary"
              href="#curriculum"
            >
              Explore Curriculum
            </a>
          </div>

          <div className="sat-info-grid">
            <div>
              <strong>98</strong>
              <span>Total questions</span>
            </div>

            <div>
              <strong>134 min</strong>
              <span>Total testing time</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Sections</span>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="sat-tabs-section">
        <div className="container">
          <div className="sat-tabs">
            <button
              className={activeSection === "overview" ? "active" : ""}
              onClick={() => setActiveSection("overview")}
            >
              Curriculum
            </button>

            <button
              className={activeSection === "practice" ? "active" : ""}
              onClick={() => setActiveSection("practice")}
            >
              Practice
            </button>
          </div>
        </div>
      </section>

      {activeSection === "overview" ? (
        <>
          {/* CURRICULUM */}
          <section className="section" id="curriculum">
            <div className="container">
              <div className="section-heading">
                <div>
                  <span className="section-label">MATH</span>
                  <h2>Math curriculum</h2>
                </div>

                <p>
                  The Math section covers four official content domains:
                  Algebra, Advanced Math, Problem-Solving and Data Analysis,
                  and Geometry and Trigonometry.
                </p>
              </div>

              <div className="sat-domain-grid">
                {mathDomains.map((domain) => (
                  <article
                    className="sat-domain-card"
                    key={domain.title}
                  >
                    <div className="domain-header">
                      <div className="domain-number">
                        {mathDomains.indexOf(domain) + 1}
                      </div>

                      <span>{domain.percentage}</span>
                    </div>

                    <h3>{domain.title}</h3>

                    <p>{domain.description}</p>

                    <div className="topic-list">
                      {domain.topics.map((topic) => (
                        <div className="topic-item" key={topic}>
                          <span>✓</span>
                          {topic}
                        </div>
                      ))}
                    </div>

                    <button
                      className="topic-button"
                      onClick={() => {
                        setFilterDomain(domain.title);
                        setActiveSection("practice");
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      Practice this domain →
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* READING & WRITING */}
          <section className="section sat-rw-section">
            <div className="container">
              <div className="section-heading">
                <div>
                  <span className="section-label">
                    READING & WRITING
                  </span>
                  <h2>Reading & Writing curriculum</h2>
                </div>

                <p>
                  Build comprehension, vocabulary, rhetorical reasoning,
                  grammar, punctuation, and revision skills.
                </p>
              </div>

              <div className="sat-domain-grid">
                {rwDomains.map((domain, index) => (
                  <article
                    className="sat-domain-card"
                    key={domain.title}
                  >
                    <div className="domain-header">
                      <div className="domain-number">
                        {index + 1}
                      </div>

                      <span>RW</span>
                    </div>

                    <h3>{domain.title}</h3>

                    <p>{domain.description}</p>

                    <div className="topic-list">
                      {domain.topics.map((topic) => (
                        <div className="topic-item" key={topic}>
                          <span>✓</span>
                          {topic}
                        </div>
                      ))}
                    </div>

                    <button
                      className="topic-button"
                      onClick={() => {
                        setFilterDomain(domain.title);
                        setActiveSection("practice");
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      Practice this domain →
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* STUDY FLOW */}
          <section className="how-section">
            <div className="container">
              <div className="section-heading centered">
                <span className="section-label">STUDY METHOD</span>
                <h2>Learn → Practice → Review</h2>
                <p>
                  Every topic will eventually follow the same structured
                  learning cycle.
                </p>
              </div>

              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-number">01</div>
                  <h3>Learn the concept</h3>
                  <p>
                    Read a concise explanation, formulas, rules, and
                    worked examples.
                  </p>
                </div>

                <div className="step-card">
                  <div className="step-number">02</div>
                  <h3>Practice</h3>
                  <p>
                    Solve original SAT-style questions that target the
                    specific skill.
                  </p>
                </div>

                <div className="step-card">
                  <div className="step-number">03</div>
                  <h3>Review mistakes</h3>
                  <p>
                    Understand why the correct answer works and why the
                    other choices do not.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* OFFICIAL RESOURCES */}
          <section className="section">
            <div className="container">
              <div className="official-card">
                <div>
                  <span className="section-label">
                    OFFICIAL RESOURCES
                  </span>

                  <h2>Use official College Board practice too.</h2>

                  <p>
                    PrepNest provides original learning and practice
                    material. For official SAT tests and official questions,
                    use College Board&apos;s own practice resources.
                  </p>
                </div>

                <div className="official-actions">
                  <a
                    href="https://satsuite.collegeboard.org/practice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Official SAT Practice ↗
                  </a>

                  <a
                    href="https://satsuite.collegeboard.org/practice/student-question-bank"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Student Question Bank ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* PRACTICE */
        <section className="section practice-section">
          <div className="container">
            <div className="practice-heading">
              <div>
                <span className="section-label">
                  ORIGINAL SAT-STYLE PRACTICE
                </span>

                <h2>Test your skills.</h2>

                <p>
                  These questions are original PrepNest questions designed
                  around SAT-tested skills.
                </p>
              </div>

              <div className="question-counter">
                {filteredQuestions.length === 0
                  ? "0 questions"
                  : `${selectedQuestion + 1} / ${
                      filteredQuestions.length
                    }`}
              </div>
            </div>

            {/* FILTERS */}
            <div className="practice-filters">
              <div>
                <label>Domain</label>

                <select
                  value={filterDomain}
                  onChange={(e) =>
                    changeFilter("domain", e.target.value)
                  }
                >
                  {domains.map((domain) => (
                    <option key={domain}>{domain}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Difficulty</label>

                <select
                  value={filterDifficulty}
                  onChange={(e) =>
                    changeFilter(
                      "difficulty",
                      e.target.value
                    )
                  }
                >
                  <option>All</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            {currentQuestion ? (
              <article className="question-card">
                <div className="question-meta">
                  <span>{currentQuestion.domain}</span>
                  <span>{currentQuestion.topic}</span>
                  <span>{currentQuestion.difficulty}</span>
                </div>

                <h3>{currentQuestion.question}</h3>

                <div className="answer-options">
                  {currentQuestion.options.map(
                    (option, index) => {
                      const isSelected =
                        selectedAnswer === index;

                      const isCorrect =
                        currentQuestion.answer === index;

                      let className = "answer-option";

                      if (submitted && isCorrect) {
                        className += " correct";
                      }

                      if (
                        submitted &&
                        isSelected &&
                        !isCorrect
                      ) {
                        className += " incorrect";
                      }

                      if (
                        !submitted &&
                        isSelected
                      ) {
                        className += " selected";
                      }

                      return (
                        <button
                          key={option}
                          className={className}
                          onClick={() =>
                            chooseAnswer(index)
                          }
                        >
                          <span>
                            {String.fromCharCode(
                              65 + index
                            )}
                          </span>

                          {option}
                        </button>
                      );
                    }
                  )}
                </div>

                {!submitted ? (
                  <button
                    className="btn btn-primary submit-answer"
                    disabled={selectedAnswer === null}
                    onClick={submitAnswer}
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className="explanation-box">
                    <div
                      className={
                        selectedAnswer ===
                        currentQuestion.answer
                          ? "result correct-result"
                          : "result incorrect-result"
                      }
                    >
                      {selectedAnswer ===
                      currentQuestion.answer
                        ? "Correct"
                        : "Incorrect"}
                    </div>

                    <h4>Explanation</h4>

                    <p>
                      {currentQuestion.explanation}
                    </p>

                    <button
                      className="btn btn-primary"
                      onClick={nextQuestion}
                    >
                      Next Question →
                    </button>
                  </div>
                )}
              </article>
            ) : (
              <div className="empty-practice">
                <h3>No questions found.</h3>
                <p>
                  Try changing your filters.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* DISCLAIMER */}
      <section className="sat-note-section">
        <div className="container">
          <div className="sat-note">
            <strong>PrepNest practice notice</strong>
            <p>
              PrepNest practice questions are original educational
              materials. They are designed to reflect the skills and
              general formats tested on the SAT, but they are not official
              College Board questions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
