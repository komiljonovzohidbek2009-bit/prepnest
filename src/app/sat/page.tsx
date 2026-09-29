"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type Section = "math" | "rw";
type Mode = "learn" | "practice" | "test";
type Difficulty = "Easy" | "Medium" | "Hard";
type QuestionType = "choice" | "numeric";

type Question = {
  id: string;
  section: Section;
  module: 1 | 2;
  domain: string;
  skill: string;
  difficulty: Difficulty;
  type: QuestionType;
  passage?: string;
  prompt: string;
  choices?: string[];
  answer: string;
  explanation: string;
};

type Domain = {
  name: string;
  short: string;
  description: string;
  topics: string[];
  icon: string;
};

/* =========================
   DOMAINS
========================= */

const mathDomains: Domain[] = [
  {
    name: "Algebra",
    short: "Linear relationships",
    description:
      "Solve equations, inequalities, systems, and problems involving linear functions.",
    topics: [
      "Linear equations in one variable",
      "Linear equations in two variables",
      "Linear functions",
      "Systems of equations",
      "Linear inequalities",
    ],
    icon: "ƒ",
  },
  {
    name: "Advanced Math",
    short: "Nonlinear relationships",
    description:
      "Work with quadratic, exponential, polynomial, radical, rational, and other nonlinear relationships.",
    topics: [
      "Equivalent expressions",
      "Quadratic equations",
      "Polynomial expressions",
      "Exponential functions",
      "Nonlinear equations",
    ],
    icon: "x²",
  },
  {
    name: "Problem-Solving & Data Analysis",
    short: "Ratios, statistics & probability",
    description:
      "Use quantitative reasoning to interpret data, percentages, probability, and statistical claims.",
    topics: [
      "Ratios and rates",
      "Percentages",
      "Measures of center",
      "Probability",
      "Statistical claims",
    ],
    icon: "∑",
  },
  {
    name: "Geometry & Trigonometry",
    short: "Shapes, angles & circles",
    description:
      "Solve problems involving area, volume, triangles, trigonometry, and circles.",
    topics: [
      "Area and volume",
      "Lines and angles",
      "Triangles",
      "Right-triangle trigonometry",
      "Circles",
    ],
    icon: "△",
  },
];

const rwDomains: Domain[] = [
  {
    name: "Information & Ideas",
    short: "Understand and evaluate texts",
    description:
      "Identify central ideas, make inferences, and use textual or quantitative evidence.",
    topics: [
      "Central Ideas and Details",
      "Inferences",
      "Command of Evidence",
      "Quantitative Evidence",
    ],
    icon: "◉",
  },
  {
    name: "Craft & Structure",
    short: "How texts work",
    description:
      "Analyze vocabulary in context, structure, purpose, and connections between texts.",
    topics: [
      "Words in Context",
      "Text Structure and Purpose",
      "Cross-Text Connections",
      "Author's choices",
    ],
    icon: "Aa",
  },
  {
    name: "Expression of Ideas",
    short: "Revise effectively",
    description:
      "Improve organization, logical flow, transitions, and rhetorical effectiveness.",
    topics: [
      "Rhetorical Synthesis",
      "Transitions",
      "Logical flow",
      "Purposeful revision",
    ],
    icon: "↗",
  },
  {
    name: "Standard English Conventions",
    short: "Grammar & punctuation",
    description:
      "Edit sentences for boundaries, structure, usage, and grammatical correctness.",
    topics: [
      "Sentence boundaries",
      "Punctuation",
      "Subject-verb agreement",
      "Verb forms",
      "Modifiers and pronouns",
    ],
    icon: "✓",
  },
];

/* =========================
   MATH QUESTIONS
   5 MODULE 1 + 5 MODULE 2
========================= */

const mathQuestions: Question[] = [
  {
    id: "math-m1-q1",
    section: "math",
    module: 1,
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "Easy",
    type: "choice",
    prompt: "If 3x + 5 = 20, what is the value of x?",
    choices: ["3", "5", "7", "15"],
    answer: "1",
    explanation:
      "Subtract 5 from both sides to get 3x = 15. Dividing by 3 gives x = 5.",
  },
  {
    id: "math-m1-q2",
    section: "math",
    module: 1,
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "Easy",
    type: "choice",
    prompt:
      "A line passes through the points (2, 5) and (6, 13). What is the slope of the line?",
    choices: ["1/2", "2", "4", "8"],
    answer: "1",
    explanation:
      "Slope = (13 − 5) / (6 − 2) = 8 / 4 = 2.",
  },
  {
    id: "math-m1-q3",
    section: "math",
    module: 1,
    domain: "Problem-Solving & Data Analysis",
    skill: "Percentages",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "A $240 item increases in price by 15%. What is the new price?",
    choices: ["$255", "$264", "$276", "$285"],
    answer: "2",
    explanation:
      "A 15% increase means multiplying the original price by 1.15. 240 × 1.15 = 276.",
  },
  {
    id: "math-m1-q4",
    section: "math",
    module: 1,
    domain: "Algebra",
    skill: "Systems of equations",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "If 2x + y = 11 and x − y = 1, what is the value of x?",
    choices: ["2", "3", "4", "5"],
    answer: "2",
    explanation:
      "From x − y = 1, y = x − 1. Substitute: 2x + x − 1 = 11, so 3x = 12 and x = 4.",
  },
  {
    id: "math-m1-q5",
    section: "math",
    module: 1,
    domain: "Geometry & Trigonometry",
    skill: "Right triangles",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "A right triangle has legs of lengths 6 and 8. What is the length of the hypotenuse?",
    choices: ["9", "10", "12", "14"],
    answer: "1",
    explanation:
      "Using the Pythagorean theorem, c² = 6² + 8² = 100. Therefore c = 10.",
  },

  {
    id: "math-m2-q1",
    section: "math",
    module: 2,
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "The equation x² − 7x + 12 = 0 has two solutions. What is the smaller solution?",
    choices: ["2", "3", "4", "6"],
    answer: "1",
    explanation:
      "Factor the expression: (x − 3)(x − 4) = 0. The solutions are 3 and 4, so the smaller solution is 3.",
  },
  {
    id: "math-m2-q2",
    section: "math",
    module: 2,
    domain: "Advanced Math",
    skill: "Exponential equations",
    difficulty: "Medium",
    type: "numeric",
    prompt: "If 2^(x + 1) = 16, what is the value of x?",
    answer: "3",
    explanation:
      "Since 16 = 2⁴, x + 1 = 4. Therefore x = 3.",
  },
  {
    id: "math-m2-q3",
    section: "math",
    module: 2,
    domain: "Problem-Solving & Data Analysis",
    skill: "Measures of center",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "The five values 4, 7, 9, 10, and 10 represent a data set. What is the mean?",
    choices: ["7", "8", "9", "10"],
    answer: "1",
    explanation:
      "The sum is 40. Dividing by the 5 values gives a mean of 8.",
  },
  {
    id: "math-m2-q4",
    section: "math",
    module: 2,
    domain: "Geometry & Trigonometry",
    skill: "Circles",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "The equation (x − 3)² + (y + 2)² = 25 represents a circle. What is its radius?",
    choices: ["3", "5", "10", "25"],
    answer: "1",
    explanation:
      "The standard form is (x − h)² + (y − k)² = r². Since r² = 25, r = 5.",
  },
  {
    id: "math-m2-q5",
    section: "math",
    module: 2,
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "A linear function f satisfies f(2) = 7 and f(6) = 19. What is f(10)?",
    choices: ["25", "28", "31", "34"],
    answer: "2",
    explanation:
      "The slope is (19 − 7) / (6 − 2) = 3. From x = 6 to x = 10, the increase is 4 × 3 = 12. Thus f(10) = 31.",
  },
];

/* =========================
   READING & WRITING
   5 MODULE 1 + 5 MODULE 2
========================= */

const rwQuestions: Question[] = [
  {
    id: "rw-m1-q1",
    section: "rw",
    module: 1,
    domain: "Information & Ideas",
    skill: "Central Ideas and Details",
    difficulty: "Easy",
    type: "choice",
    passage:
      "Researchers studying urban gardens found that small plots can provide fresh produce while also creating spaces where neighbors interact. The researchers therefore suggest that the value of urban gardens extends beyond the food they produce.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "Urban gardens are usually larger than traditional farms.",
      "Urban gardens can provide both food and community benefits.",
      "Researchers prefer urban gardens to rural farms.",
      "Growing food in cities is more difficult than expected.",
    ],
    answer: "1",
    explanation:
      "The passage emphasizes two benefits: producing food and creating opportunities for community interaction.",
  },
  {
    id: "rw-m1-q2",
    section: "rw",
    module: 1,
    domain: "Craft & Structure",
    skill: "Words in Context",
    difficulty: "Easy",
    type: "choice",
    passage:
      "The scientist's explanation was concise, but it was not superficial; she included every piece of evidence necessary to support her conclusion.",
    prompt:
      "As used in the text, what does “superficial” most nearly mean?",
    choices: ["Incomplete", "Decorative", "Unusual", "Persuasive"],
    answer: "0",
    explanation:
      "The contrast with the complete evidence shows that superficial means lacking depth or completeness.",
  },
  {
    id: "rw-m1-q3",
    section: "rw",
    module: 1,
    domain: "Standard English Conventions",
    skill: "Sentence boundaries",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "The museum extended its hours during the summer___allowing visitors to explore the new exhibition after work.",
    choices: [",", ";", ":", "."],
    answer: "0",
    explanation:
      "A comma correctly separates the independent clause from the participial phrase “allowing visitors...” that modifies the clause.",
  },
  {
    id: "rw-m1-q4",
    section: "rw",
    module: 1,
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    type: "choice",
    passage:
      "The first generation of solar panels was relatively expensive to manufacture. ______, improvements in production methods have substantially reduced costs.",
    prompt:
      "Which choice completes the text with the most logical transition?",
    choices: ["For example", "However", "Similarly", "In particular"],
    answer: "1",
    explanation:
      "The second sentence contrasts earlier high costs with later cost reductions. Therefore, “However” is appropriate.",
  },
  {
    id: "rw-m1-q5",
    section: "rw",
    module: 1,
    domain: "Information & Ideas",
    skill: "Inference",
    difficulty: "Medium",
    type: "choice",
    passage:
      "In one experiment, participants remembered more information when they organized it into meaningful groups rather than studying each item separately.",
    prompt:
      "Which inference is best supported by the text?",
    choices: [
      "Organization can improve how information is remembered.",
      "Participants remembered every item perfectly.",
      "Studying individual items is always ineffective.",
      "Meaningful groups require more study time.",
    ],
    answer: "0",
    explanation:
      "The experiment directly supports the conclusion that organizing information into meaningful groups can improve memory.",
  },

  {
    id: "rw-m2-q1",
    section: "rw",
    module: 2,
    domain: "Craft & Structure",
    skill: "Text Structure and Purpose",
    difficulty: "Medium",
    type: "choice",
    passage:
      "For decades, historians assumed that the decline of a particular trading port resulted primarily from political instability. Recently discovered shipping records, however, reveal that merchants continued to use the port extensively during the same period. The new evidence has led historians to reconsider the original explanation.",
    prompt: "What is the primary purpose of the text?",
    choices: [
      "To describe how shipping records are preserved",
      "To present evidence that challenges an earlier historical explanation",
      "To explain why political instability affects every trading port",
      "To compare two different ports",
    ],
    answer: "1",
    explanation:
      "The passage presents an older explanation and then introduces evidence that challenges it.",
  },
  {
    id: "rw-m2-q2",
    section: "rw",
    module: 2,
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Medium",
    type: "choice",
    passage:
      "A student has taken the following notes:\n\n• The monarch butterfly migrates thousands of kilometers.\n• Some populations travel from Canada to central Mexico.\n• During migration, the butterflies depend on milkweed plants.\n• Milkweed is the primary food source for monarch caterpillars.\n\nThe student wants to emphasize the relationship between migration and milkweed.",
    prompt:
      "Which choice most effectively accomplishes this goal?",
    choices: [
      "Monarch butterflies are capable of migrating thousands of kilometers.",
      "Some monarch populations migrate from Canada to central Mexico.",
      "Milkweed is important to monarchs because it provides the primary food for their caterpillars.",
      "Monarch butterflies are found in both Canada and Mexico.",
    ],
    answer: "2",
    explanation:
      "Choice C directly connects monarch butterflies and milkweed, matching the student's stated purpose.",
  },
  {
    id: "rw-m2-q3",
    section: "rw",
    module: 2,
    domain: "Standard English Conventions",
    skill: "Subject-verb agreement",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "The collection of rare manuscripts, along with several recently acquired maps, ___ stored in a climate-controlled room.",
    choices: ["are", "were", "is", "have been"],
    answer: "2",
    explanation:
      "The subject is “collection,” which is singular. The phrase “along with...” does not change the subject, so “is” is correct.",
  },
  {
    id: "rw-m2-q4",
    section: "rw",
    module: 2,
    domain: "Craft & Structure",
    skill: "Cross-Text Connections",
    difficulty: "Hard",
    type: "choice",
    passage:
      "Text 1: A study of remote work found that employees reported greater flexibility when working from home.\n\nText 2: Another study found that remote workers sometimes experienced difficulty separating work responsibilities from personal time.",
    prompt:
      "Based on the texts, how would the authors most likely agree?",
    choices: [
      "Remote work has no effect on employees.",
      "Remote work can affect how employees manage their time.",
      "Remote work always increases productivity.",
      "Remote work should replace office work.",
    ],
    answer: "1",
    explanation:
      "Both texts address how remote work affects employees' management of time, although they emphasize different effects.",
  },
  {
    id: "rw-m2-q5",
    section: "rw",
    module: 2,
    domain: "Standard English Conventions",
    skill: "Punctuation",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "The architect designed the building with one unusual feature___a central courtyard open to the sky.",
    choices: [",", ";", ":", "and"],
    answer: "2",
    explanation:
      "A colon appropriately introduces the specific feature that explains what the unusual feature is.",
  },
];

/* =========================
   HELPERS
========================= */

const allQuestions = [...mathQuestions, ...rwQuestions];

function isCorrect(question: Question, answer?: string) {
  if (answer === undefined || answer.trim() === "") {
    return false;
  }

  if (question.type === "numeric") {
    return answer.trim() === question.answer;
  }

  return answer === question.answer;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const remainingSeconds = (seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

/* =========================
   MAIN PAGE
========================= */

export default function SATPage() {
  const [section, setSection] = useState<Section>("math");
  const [mode, setMode] = useState<Mode>("learn");

  /* Practice */
  const [practiceDomain, setPracticeDomain] = useState("All");
  const [practiceDifficulty, setPracticeDifficulty] = useState("All");
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceChecked, setPracticeChecked] = useState(false);

  /* Test */
  const [testModule, setTestModule] = useState<1 | 2>(1);
  const [testIndex, setTestIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [moduleScores, setModuleScores] = useState<number[]>([]);
  const [testFinishedModule, setTestFinishedModule] = useState(false);
  const [testFinished, setTestFinished] = useState(false);

  /* 10-minute timer for each mini-test module */
  const [secondsLeft, setSecondsLeft] = useState(600);

  const domains = section === "math" ? mathDomains : rwDomains;

  const testQuestions =
    section === "math" ? mathQuestions : rwQuestions;

  const moduleQuestions = useMemo(
    () =>
      testQuestions.filter(
        (question) => question.module === testModule
      ),
    [testQuestions, testModule]
  );

  const currentTestQuestion = moduleQuestions[testIndex];

  const filteredPractice = useMemo(() => {
    return allQuestions.filter((question) => {
      const sectionMatch = question.section === section;

      const domainMatch =
        practiceDomain === "All" ||
        question.domain === practiceDomain;

      const difficultyMatch =
        practiceDifficulty === "All" ||
        question.difficulty === practiceDifficulty;

      return sectionMatch && domainMatch && difficultyMatch;
    });
  }, [section, practiceDomain, practiceDifficulty]);

  const currentPracticeQuestion =
    filteredPractice[practiceIndex];

  /* =========================
     MINI TEST TIMER
  ========================= */

  useEffect(() => {
    if (mode !== "test" || testFinished || testFinishedModule) {
      return;
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [mode, testFinished, testFinishedModule]);

  /* =========================
     RESET / SECTION
  ========================= */

  function changeSection(nextSection: Section) {
    setSection(nextSection);
    setMode("learn");

    setPracticeDomain("All");
    setPracticeDifficulty("All");
    setPracticeIndex(0);
    setPracticeAnswer("");
    setPracticeChecked(false);

    resetTest();
  }

  function resetTest() {
    setTestModule(1);
    setTestIndex(0);
    setTestAnswers({});
    setModuleScores([]);
    setTestFinishedModule(false);
    setTestFinished(false);
    setSecondsLeft(600);
  }

  function startTest() {
    resetTest();
    setMode("test");
  }

  /* =========================
     PRACTICE
  ========================= */

  function selectPracticeAnswer(answer: string) {
    setPracticeAnswer(answer);
    setPracticeChecked(false);
  }

  function checkPracticeAnswer() {
    if (!currentPracticeQuestion || !practiceAnswer) {
      return;
    }

    setPracticeChecked(true);
  }

  function nextPracticeQuestion() {
    setPracticeAnswer("");
    setPracticeChecked(false);

    setPracticeIndex((current) => {
      if (filteredPractice.length === 0) {
        return 0;
      }

      return (current + 1) % filteredPractice.length;
    });
  }

  /* =========================
     TEST
  ========================= */

  function selectTestAnswer(answer: string) {
    if (!currentTestQuestion) {
      return;
    }

    setTestAnswers((current) => ({
      ...current,
      [currentTestQuestion.id]: answer,
    }));
  }

  function calculateModuleScore() {
    return moduleQuestions.reduce((total, question) => {
      return (
        total +
        (isCorrect(question, testAnswers[question.id]) ? 1 : 0)
      );
    }, 0);
  }

  function finishModule() {
    const score = calculateModuleScore();

    setModuleScores((current) => [...current, score]);
    setTestFinishedModule(true);
  }

  function continueToModule2() {
    setTestModule(2);
    setTestIndex(0);
    setTestFinishedModule(false);
    setSecondsLeft(600);
  }

  function finishFinalModule() {
    const score = calculateModuleScore();

    setModuleScores((current) => [...current, score]);
    setTestFinished(true);
    setTestFinishedModule(false);
  }

  function restartTest() {
    startTest();
  }

  const answeredCount = moduleQuestions.filter(
    (question) => Boolean(testAnswers[question.id])
  ).length;

  const allCurrentModuleAnswered =
    answeredCount === moduleQuestions.length;

  /* =========================
     RENDER
  ========================= */

  return (
    <main className={styles.page}>
      {/* HERO */}

      <section className={styles.hero}>
        <div className={styles.heroGlowOne} />
        <div className={styles.heroGlowTwo} />

        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <span className={styles.liveDot} />
            PrepNest SAT Preparation
          </div>

          <div className={styles.heroGrid}>
            <div>
              <h1>
                Master the SAT.
                <br />
                <span>One skill at a time.</span>
              </h1>

              <p className={styles.heroText}>
                Learn the concepts, practice the skills, and test
                yourself with original SAT-style questions.
              </p>

              <div className={styles.heroActions}>
                <button
                  className={styles.primaryButton}
                  onClick={() => setMode("learn")}
                >
                  Start Learning
                  <span>→</span>
                </button>

                <button
                  className={styles.secondaryButton}
                  onClick={startTest}
                >
                  Take Mini Test
                </button>
              </div>
            </div>

            <div className={styles.statsCard}>
              <div className={styles.statTop}>
                <span>SAT structure</span>
                <span className={styles.statusBadge}>
                  Current format
                </span>
              </div>

              <div className={styles.statGrid}>
                <div>
                  <strong>2</strong>
                  <span>Sections</span>
                </div>

                <div>
                  <strong>4</strong>
                  <span>Math domains</span>
                </div>

                <div>
                  <strong>4</strong>
                  <span>R&W domains</span>
                </div>

                <div>
                  <strong>2</strong>
                  <span>Modules / section</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* SECTION SWITCHER */}

        <section className={styles.sectionSwitcher}>
          <button
            className={`${styles.sectionCard} ${
              section === "math" ? styles.activeSection : ""
            }`}
            onClick={() => changeSection("math")}
          >
            <div className={styles.sectionIcon}>∑</div>

            <div>
              <span className={styles.cardLabel}>
                SAT SECTION
              </span>

              <h2>Math</h2>

              <p>
                Algebra, advanced math, data analysis and
                geometry.
              </p>
            </div>

            <span className={styles.arrow}>→</span>
          </button>

          <button
            className={`${styles.sectionCard} ${
              section === "rw" ? styles.activeSection : ""
            }`}
            onClick={() => changeSection("rw")}
          >
            <div
              className={`${styles.sectionIcon} ${styles.rwIcon}`}
            >
              Aa
            </div>

            <div>
              <span className={styles.cardLabel}>
                SAT SECTION
              </span>

              <h2>Reading & Writing</h2>

              <p>
                Reading comprehension, language, grammar and
                revision.
              </p>
            </div>

            <span className={styles.arrow}>→</span>
          </button>
        </section>

        {/* WORKSPACE */}

        <section className={styles.workspace}>
          <div className={styles.workspaceHeader}>
            <div>
              <span className={styles.kicker}>
                {section === "math"
                  ? "MATH"
                  : "READING & WRITING"}
              </span>

              <h2>
                {mode === "learn"
                  ? "Learn"
                  : mode === "practice"
                  ? "Practice"
                  : "Mini Practice Test"}
              </h2>
            </div>

            <div className={styles.modeTabs}>
              <button
                className={
                  mode === "learn" ? styles.activeTab : ""
                }
                onClick={() => setMode("learn")}
              >
                Learn
              </button>

              <button
                className={
                  mode === "practice" ? styles.activeTab : ""
                }
                onClick={() => {
                  setMode("practice");
                  setPracticeIndex(0);
                  setPracticeAnswer("");
                  setPracticeChecked(false);
                }}
              >
                Practice
              </button>

              <button
                className={
                  mode === "test" ? styles.activeTab : ""
                }
                onClick={startTest}
              >
                Mini Test
              </button>
            </div>
          </div>

          {/* =========================
              LEARN
          ========================= */}

          {mode === "learn" && (
            <div className={styles.learnArea}>
              <div className={styles.learnIntro}>
                <div>
                  <span className={styles.kicker}>
                    BUILD YOUR FOUNDATION
                  </span>

                  <h3>
                    Four domains. Complete coverage.
                  </h3>

                  <p>
                    Explore the major SAT skill areas before
                    moving into targeted practice.
                  </p>
                </div>

                <div className={styles.progressRing}>
                  <strong>4</strong>
                  <span>domains</span>
                </div>
              </div>

              <div className={styles.domainGrid}>
                {domains.map((domain, index) => (
                  <article
                    className={styles.domainCard}
                    key={domain.name}
                  >
                    <div className={styles.domainTop}>
                      <div className={styles.domainNumber}>
                        0{index + 1}
                      </div>

                      <div className={styles.domainIcon}>
                        {domain.icon}
                      </div>
                    </div>

                    <h3>{domain.name}</h3>

                    <span className={styles.domainShort}>
                      {domain.short}
                    </span>

                    <p>{domain.description}</p>

                    <div className={styles.topicList}>
                      {domain.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>

                    <button
                      className={styles.learnButton}
                      onClick={() => {
                        setPracticeDomain(domain.name);
                        setPracticeIndex(0);
                        setPracticeAnswer("");
                        setPracticeChecked(false);
                        setMode("practice");
                      }}
                    >
                      Practice this domain
                      <span>→</span>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* =========================
              PRACTICE
          ========================= */}

          {mode === "practice" && (
            <div className={styles.practiceArea}>
              <div className={styles.filterBar}>
                <div>
                  <span className={styles.kicker}>
                    SKILL PRACTICE
                  </span>

                  <h3>Target your weak areas.</h3>
                </div>

                <div className={styles.filters}>
                  <label>
                    <span>Domain</span>

                    <select
                      value={practiceDomain}
                      onChange={(event) => {
                        setPracticeDomain(event.target.value);
                        setPracticeIndex(0);
                        setPracticeAnswer("");
                        setPracticeChecked(false);
                      }}
                    >
                      <option value="All">
                        All domains
                      </option>

                      {domains.map((domain) => (
                        <option
                          key={domain.name}
                          value={domain.name}
                        >
                          {domain.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Difficulty</span>

                    <select
                      value={practiceDifficulty}
                      onChange={(event) => {
                        setPracticeDifficulty(
                          event.target.value
                        );
                        setPracticeIndex(0);
                        setPracticeAnswer("");
                        setPracticeChecked(false);
                      }}
                    >
                      <option value="All">
                        All levels
                      </option>

                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </label>
                </div>
              </div>

              {currentPracticeQuestion ? (
                <PracticeQuestionCard
                  question={currentPracticeQuestion}
                  answer={practiceAnswer}
                  checked={practiceChecked}
                  onSelect={selectPracticeAnswer}
                  onCheck={checkPracticeAnswer}
                  onNext={nextPracticeQuestion}
                />
              ) : (
                <div className={styles.emptyState}>
                  <div>∅</div>
                  <h3>
                    No questions match these filters.
                  </h3>
                  <p>
                    Try another domain or difficulty.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* =========================
              TEST
          ========================= */}

          {mode === "test" && (
            <div className={styles.testArea}>
              {!testFinished &&
                !testFinishedModule &&
                currentTestQuestion && (
                  <>
                    <div className={styles.testTopBar}>
                      <div>
                        <span className={styles.kicker}>
                          {section === "math"
                            ? "MATH"
                            : "READING & WRITING"}
                        </span>

                        <strong>
                          Module {testModule}
                        </strong>
                      </div>

                      <div className={styles.testMeta}>
                        <span>
                          {answeredCount}/
                          {moduleQuestions.length} answered
                        </span>

                        <span className={styles.timer}>
                          {formatTime(secondsLeft)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.moduleProgress}>
                      {moduleQuestions.map(
                        (question, index) => (
                          <span
                            key={question.id}
                            className={
                              index === testIndex
                                ? styles.progressCurrent
                                : testAnswers[question.id]
                                ? styles.progressDone
                                : ""
                            }
                          />
                        )
                      )}
                    </div>

                    <TestQuestionCard
                      question={currentTestQuestion}
                      answer={
                        testAnswers[
                          currentTestQuestion.id
                        ]
                      }
                      onSelect={selectTestAnswer}
                    />

                    <div className={styles.testFooter}>
                      <div>
                        <span
                          className={styles.questionSkill}
                        >
                          {currentTestQuestion.domain}
                        </span>

                        <span
                          className={styles.questionSkill}
                        >
                          {currentTestQuestion.difficulty}
                        </span>
                      </div>

                      {testIndex <
                      moduleQuestions.length - 1 ? (
                        <button
                          className={styles.primaryButton}
                          onClick={() =>
                            setTestIndex(
                              (current) => current + 1
                            )
                          }
                        >
                          Next question
                          <span>→</span>
                        </button>
                      ) : (
                        <button
                          className={styles.finishButton}
                          disabled={!allCurrentModuleAnswered}
                          onClick={
                            testModule === 1
                              ? finishModule
                              : finishFinalModule
                          }
                        >
                          Finish Module {testModule}
                          <span>✓</span>
                        </button>
                      )}
                    </div>

                    {!allCurrentModuleAnswered &&
                      testIndex ===
                        moduleQuestions.length - 1 && (
                        <p
                          className={
                            styles.answerWarning
                          }
                        >
                          Answer all questions before
                          finishing this module.
                        </p>
                      )}
                  </>
                )}

              {testFinishedModule && !testFinished && (
                <ModuleComplete
                  module={testModule}
                  score={
                    moduleScores[
                      moduleScores.length - 1
                    ] ?? 0
                  }
                  total={moduleQuestions.length}
                  onContinue={continueToModule2}
                />
              )}

              {testFinished && (
                <FinalResult
                  scores={moduleScores}
                  totalQuestions={testQuestions.length}
                  onRestart={restartTest}
                />
              )}
            </div>
          )}
        </section>

        {/* RESOURCES */}

        <section className={styles.resourcesSection}>
          <div>
            <span className={styles.kicker}>
              TRUSTED RESOURCES
            </span>

            <h2>
              Use PrepNest + official practice.
            </h2>

            <p>
              PrepNest provides original practice content.
              For official SAT questions and full-length
              adaptive practice tests, use the official
              College Board resources.
            </p>
          </div>

          <div className={styles.resourceLinks}>
            <a
              href="https://satsuite.collegeboard.org/sat/practice"
              target="_blank"
              rel="noreferrer"
            >
              <span>College Board</span>
              <strong>
                Official SAT practice ↗
              </strong>
            </a>

            <a
              href="https://www.khanacademy.org/test-prep/sat"
              target="_blank"
              rel="noreferrer"
            >
              <span>Khan Academy</span>
              <strong>
                Official SAT preparation ↗
              </strong>
            </a>

            <a
              href="https://satsuite.collegeboard.org/practice/question-bank"
              target="_blank"
              rel="noreferrer"
            >
              <span>Student Question Bank</span>
              <strong>
                Official question practice ↗
              </strong>
            </a>
          </div>

          <div className={styles.sourceNote}>
            <span className={styles.sourceDot} />

            <strong>PrepNest Original</strong>

            <span>
              All practice questions on this page are
              original PrepNest questions aligned with SAT
              content domains and skills.
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================
   PRACTICE QUESTION
========================= */

function PracticeQuestionCard({
  question,
  answer,
  checked,
  onSelect,
  onCheck,
  onNext,
}: {
  question: Question;
  answer: string;
  checked: boolean;
  onSelect: (answer: string) => void;
  onCheck: () => void;
  onNext: () => void;
}) {
  const correct = isCorrect(question, answer);

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <div>
          <span className={styles.questionNumber}>
            Practice Question
          </span>

          <h3>{question.skill}</h3>
        </div>

        <span className={styles.difficultyBadge}>
          {question.difficulty}
        </span>
      </div>

      {question.passage && (
        <div className={styles.passage}>
          {question.passage}
        </div>
      )}

      <p className={styles.prompt}>
        {question.prompt}
      </p>

      {question.type === "numeric" ? (
        <input
          className={styles.numericInput}
          type="text"
          inputMode="decimal"
          placeholder="Enter your answer"
          value={answer}
          onChange={(event) =>
            onSelect(event.target.value)
          }
        />
      ) : (
        <div className={styles.choiceGrid}>
          {question.choices?.map(
            (choice, index) => {
              const selected =
                answer === String(index);

              const correctChoice =
                String(index) === question.answer;

              const wrongSelected =
                checked &&
                selected &&
                !correctChoice;

              return (
                <button
                  key={choice}
                  className={`${styles.choice} ${
                    selected
                      ? styles.choiceSelected
                      : ""
                  } ${
                    checked && correctChoice
                      ? styles.choiceCorrect
                      : ""
                  } ${
                    wrongSelected
                      ? styles.choiceWrong
                      : ""
                  }`}
                  onClick={() =>
                    onSelect(String(index))
                  }
                >
                  <span>
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  {choice}
                </button>
              );
            }
          )}
        </div>
      )}

      {checked && (
        <div
          className={`${styles.feedback} ${
            correct
              ? styles.feedbackCorrect
              : styles.feedbackWrong
          }`}
        >
          <div className={styles.feedbackTitle}>
            {correct ? "Correct!" : "Not quite."}
          </div>

          {!correct && (
            <div className={styles.correctAnswer}>
              Correct answer:{" "}
              {question.type === "numeric"
                ? question.answer
                : question.choices?.[
                    Number(question.answer)
                  ]}
            </div>
          )}

          <p>{question.explanation}</p>
        </div>
      )}

      <div className={styles.questionActions}>
        {!checked ? (
          <button
            className={styles.primaryButton}
            disabled={!answer.trim()}
            onClick={onCheck}
          >
            Check answer
            <span>✓</span>
          </button>
        ) : (
          <button
            className={styles.primaryButton}
            onClick={onNext}
          >
            Next question
            <span>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* =========================
   TEST QUESTION
========================= */

function TestQuestionCard({
  question,
  answer,
  onSelect,
}: {
  question: Question;
  answer?: string;
  onSelect: (answer: string) => void;
}) {
  return (
    <div className={styles.testQuestionCard}>
      <div className={styles.testQuestionTop}>
        <span>{question.domain}</span>
        <span>{question.skill}</span>
      </div>

      {question.passage && (
        <div className={styles.testPassage}>
          {question.passage}
        </div>
      )}

      <h3>{question.prompt}</h3>

      {question.type === "numeric" ? (
        <input
          className={styles.numericInputLarge}
          type="text"
          inputMode="decimal"
          placeholder="Type your answer"
          value={answer ?? ""}
          onChange={(event) =>
            onSelect(event.target.value)
          }
        />
      ) : (
        <div className={styles.testChoices}>
          {question.choices?.map(
            (choice, index) => {
              const selected =
                answer === String(index);

              return (
                <button
                  key={choice}
                  className={`${styles.testChoice} ${
                    selected
                      ? styles.testChoiceSelected
                      : ""
                  }`}
                  onClick={() =>
                    onSelect(String(index))
                  }
                >
                  <span>
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  <strong>{choice}</strong>
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

/* =========================
   MODULE COMPLETE
========================= */

function ModuleComplete({
  module,
  score,
  total,
  onContinue,
}: {
  module: number;
  score: number;
  total: number;
  onContinue: () => void;
}) {
  const percentage = Math.round(
    (score / total) * 100
  );

  return (
    <div className={styles.completeScreen}>
      <div className={styles.completeIcon}>
        ✓
      </div>

      <span className={styles.kicker}>
        MODULE COMPLETE
      </span>

      <h2>
        Module {module} finished.
      </h2>

      <p>
        You answered <strong>{score}</strong> of{" "}
        <strong>{total}</strong> questions correctly.
      </p>

      <div className={styles.scoreCircle}>
        <strong>{percentage}%</strong>
        <span>accuracy</span>
      </div>

      <div className={styles.completeActions}>
        <button
          className={styles.primaryButton}
          onClick={onContinue}
        >
          Continue to Module 2
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

/* =========================
   FINAL RESULT
========================= */

function FinalResult({
  scores,
  totalQuestions,
  onRestart,
}: {
  scores: number[];
  totalQuestions: number;
  onRestart: () => void;
}) {
  const totalCorrect = scores.reduce(
    (sum, score) => sum + score,
    0
  );

  const percentage = Math.round(
    (totalCorrect / totalQuestions) * 100
  );

  return (
    <div className={styles.completeScreen}>
      <div className={styles.completeIcon}>
        ★
      </div>

      <span className={styles.kicker}>
        TEST COMPLETE
      </span>

      <h2>
        Your mini test is complete.
      </h2>

      <p>
        This percentage represents accuracy on this
        PrepNest mini test. It is not an official SAT
        score.
      </p>

      <div className={styles.finalScore}>
        <strong>{percentage}%</strong>
        <span>overall accuracy</span>
      </div>

      <div className={styles.moduleResults}>
        {scores.map((score, index) => (
          <div key={index}>
            <span>
              Module {index + 1}
            </span>

            <strong>
              {score}/5
            </strong>
          </div>
        ))}
      </div>

      <div className={styles.completeActions}>
        <button
          className={styles.primaryButton}
          onClick={onRestart}
        >
          Retake mini test
          <span>↻</span>
        </button>
      </div>
    </div>
  );
}
