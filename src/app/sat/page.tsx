"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Section = "math" | "rw";
type Mode = "learn" | "practice" | "test";
type QuestionType = "choice" | "numeric";

type Question = {
  id: string;
  section: Section;
  module: 1 | 2;
  domain: string;
  skill: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: QuestionType;
  prompt: string;
  passage?: string;
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
      "Measures of center and spread",
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
      "Author's rhetorical choices",
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

const mathQuestions: Question[] = [
  {
    id: "math-m1-1",
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
      "Subtract 5 from both sides: 3x = 15. Then divide by 3, giving x = 5.",
  },
  {
    id: "math-m1-2",
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
      "The slope is (13 − 5) / (6 − 2) = 8 / 4 = 2.",
  },
  {
    id: "math-m1-3",
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
      "A 15% increase means multiplying by 1.15: 240 × 1.15 = 276.",
  },
  {
    id: "math-m1-4",
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
      "From x − y = 1, y = x − 1. Substitute into the first equation: 2x + x − 1 = 11, so 3x = 12 and x = 4.",
  },
  {
    id: "math-m1-5",
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
      "Using the Pythagorean theorem: c² = 6² + 8² = 36 + 64 = 100, so c = 10.",
  },

  {
    id: "math-m2-1",
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
      "Factor the quadratic: (x − 3)(x − 4) = 0. Therefore, the solutions are 3 and 4, and the smaller is 3.",
  },
  {
    id: "math-m2-2",
    section: "math",
    module: 2,
    domain: "Advanced Math",
    skill: "Exponential equations",
    difficulty: "Medium",
    type: "numeric",
    prompt:
      "If 2^(x + 1) = 16, what is the value of x?",
    answer: "3",
    explanation:
      "Since 16 = 2⁴, we have x + 1 = 4. Therefore, x = 3.",
  },
  {
    id: "math-m2-3",
    section: "math",
    module: 2,
    domain: "Problem-Solving & Data Analysis",
    skill: "Measures of center",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "The five values 4, 7, 9, 10, and 10 represent a data set. What is the mean of the data set?",
    choices: ["7", "8", "9", "10"],
    answer: "1",
    explanation:
      "Add the values: 4 + 7 + 9 + 10 + 10 = 40. Divide by 5 to get a mean of 8.",
  },
  {
    id: "math-m2-4",
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
      "A circle has the form (x − h)² + (y − k)² = r². Here r² = 25, so r = 5.",
  },
  {
    id: "math-m2-5",
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
      "The slope is (19 − 7)/(6 − 2) = 3. From x = 6 to x = 10, x increases by 4, so f(x) increases by 12. Therefore f(10) = 19 + 12 = 31.",
  },
];

const rwQuestions: Question[] = [
  {
    id: "rw-m1-1",
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
      "The passage emphasizes two benefits: producing food and encouraging interaction among neighbors.",
  },
  {
    id: "rw-m1-2",
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
      "The contrast with “every piece of evidence necessary” shows that superficial means lacking depth or completeness.",
  },
  {
    id: "rw-m1-3",
    section: "rw",
    module: 1,
    domain: "Standard English Conventions",
    skill: "Sentence boundaries",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "The museum extended its hours during the summer___ visitors could explore the new exhibition after work.",
    choices: [", allowing", "; allowing", ": allowing", ". Allowing"],
    answer: "0",
    explanation:
      "The phrase “allowing visitors...” is a participial phrase that logically modifies the preceding independent clause. A comma correctly connects it.",
  },
  {
    id: "rw-m1-4",
    section: "rw",
    module: 1,
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    type: "choice",
    passage:
      "The first generation of solar panels was relatively expensive to manufacture. ______, improvements in production methods have substantially reduced costs.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["For example", "However", "Similarly", "In particular"],
    answer: "1",
    explanation:
      "The second sentence contrasts the earlier high costs with later cost reductions, so “However” is the appropriate transition.",
  },
  {
    id: "rw-m1-5",
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
      "The experiment directly supports the idea that organizing information into meaningful groups can improve memory.",
  },

  {
    id: "rw-m2-1",
    section: "rw",
    module: 2,
    domain: "Craft & Structure",
    skill: "Text Structure and Purpose",
    difficulty: "Medium",
    type: "choice",
    passage:
      "For decades, historians assumed that the decline of a particular trading port resulted primarily from political instability. Recently discovered shipping records, however, reveal that merchants continued to use the port extensively during the same period. The new evidence has led historians to reconsider the original explanation.",
    prompt:
      "What is the primary purpose of the text?",
    choices: [
      "To describe how shipping records are preserved",
      "To present evidence that challenges an earlier historical explanation",
      "To explain why political instability affects every trading port",
      "To compare two different ports",
    ],
    answer: "1",
    explanation:
      "The text first presents the older explanation and then introduces evidence that causes historians to reconsider it.",
  },
  {
    id: "rw-m2-2",
    section: "rw",
    module: 2,
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Medium",
    type: "choice",
    passage:
      "A student has taken the following notes:\n\n• The monarch butterfly migrates thousands of kilometers.\n• Some populations travel from Canada to central Mexico.\n• During migration, the butterflies depend on milkweed plants.\n• Milkweed is the primary food source for monarch caterpillars.\n\nThe student wants to emphasize the relationship between migration and milkweed.",
    prompt: "Which choice most effectively accomplishes this goal?",
    choices: [
      "Monarch butterflies are capable of migrating thousands of kilometers.",
      "Some monarch populations migrate from Canada to central Mexico.",
      "Milkweed is important to monarchs because it provides the primary food for their caterpillars during their life cycle.",
      "Monarch butterflies are found in both Canada and Mexico.",
    ],
    answer: "2",
    explanation:
      "Choice C directly emphasizes the connection between monarchs and milkweed, which is the student's stated goal.",
  },
  {
    id: "rw-m2-3",
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
      "The subject is “collection,” which is singular. The intervening phrase “along with...” does not change the subject, so “is” is correct.",
  },
  {
    id: "rw-m2-4",
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
      "Both texts discuss how remote work changes employees' management of work and personal time, although they emphasize different effects.",
  },
  {
    id: "rw-m2-5",
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
      "A colon can introduce an explanation or specific example of what was just mentioned. The courtyard is the unusual feature.",
  },
];

const practiceQuestions: Question[] = [
  {
    id: "practice-math-1",
    section: "math",
    module: 1,
    domain: "Algebra",
    skill: "Linear equations",
    difficulty: "Easy",
    type: "choice",
    prompt: "If 5x − 8 = 17, what is x?",
    choices: ["3", "4", "5", "6"],
    answer: "2",
    explanation:
      "Add 8 to both sides: 5x = 25. Divide by 5: x = 5.",
  },
  {
    id: "practice-math-2",
    section: "math",
    module: 1,
    domain: "Problem-Solving & Data Analysis",
    skill: "Ratios",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "A recipe uses 3 cups of flour for every 2 cups of water. If 9 cups of flour are used, how many cups of water are needed?",
    choices: ["4", "5", "6", "8"],
    answer: "2",
    explanation:
      "The ratio is 3:2. Multiplying both parts by 3 gives 9:6.",
  },
  {
    id: "practice-math-3",
    section: "math",
    module: 1,
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "Which expression is equivalent to (x + 4)(x − 4)?",
    choices: ["x² + 16", "x² − 16", "x² − 8x + 16", "x² + 8x + 16"],
    answer: "1",
    explanation:
      "This is a difference of squares: (x + 4)(x − 4) = x² − 16.",
  },
  {
    id: "practice-math-4",
    section: "math",
    module: 2,
    domain: "Geometry & Trigonometry",
    skill: "Area",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "A rectangle has length 12 and width 7. What is its area?",
    choices: ["19", "38", "84", "168"],
    answer: "2",
    explanation: "Area = length × width = 12 × 7 = 84.",
  },
  {
    id: "practice-rw-1",
    section: "rw",
    module: 1,
    domain: "Craft & Structure",
    skill: "Words in Context",
    difficulty: "Easy",
    type: "choice",
    passage:
      "The engineer proposed a novel approach to the problem, one that differed substantially from earlier methods.",
    prompt: "As used in the text, what does “novel” most nearly mean?",
    choices: ["Practical", "New", "Complicated", "Expensive"],
    answer: "1",
    explanation:
      "The phrase “differed substantially from earlier methods” indicates that the approach was new.",
  },
  {
    id: "practice-rw-2",
    section: "rw",
    module: 1,
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    type: "choice",
    passage:
      "The original experiment produced unexpected results. ______, the researchers repeated the experiment using a larger sample.",
    prompt: "Which transition is most logical?",
    choices: ["As a result", "For instance", "Likewise", "Meanwhile"],
    answer: "0",
    explanation:
      "The second action occurred because of the unexpected results, so “As a result” is logical.",
  },
  {
    id: "practice-rw-3",
    section: "rw",
    module: 1,
    domain: "Information & Ideas",
    skill: "Inference",
    difficulty: "Medium",
    type: "choice",
    passage:
      "After the library extended its weekend hours, attendance increased by 18 percent.",
    prompt:
      "Which conclusion is most directly supported by the text?",
    choices: [
      "The extended hours were associated with higher attendance.",
      "All library visitors preferred weekends.",
      "The library was previously closed every weekend.",
      "Attendance increased by exactly 18 percent every month.",
    ],
    answer: "0",
    explanation:
      "The statement supports an association between extended weekend hours and increased attendance.",
  },
];

const allQuestions = [...mathQuestions, ...rwQuestions, ...practiceQuestions];

function getQuestionAnswer(question: Question, value: string | undefined) {
  if (value === undefined) return false;

  if (question.type === "numeric") {
    return value.trim() === question.answer;
  }

  return value === question.answer;
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function SATPage() {
  const [section, setSection] = useState<Section>("math");
  const [mode, setMode] = useState<Mode>("learn");

  const [practiceDomain, setPracticeDomain] = useState("All");
  const [practiceDifficulty, setPracticeDifficulty] = useState("All");
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState<string>();
  const [practiceChecked, setPracticeChecked] = useState(false);

  const [testModule, setTestModule] = useState<1 | 2>(1);
  const [testIndex, setTestIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [testFinishedModule, setTestFinishedModule] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [moduleScores, setModuleScores] = useState<number[]>([]);

  const [testSeconds, setTestSeconds] = useState(0);

  const domains = section === "math" ? mathDomains : rwDomains;

  const testQuestions = section === "math" ? mathQuestions : rwQuestions;

  const currentModuleQuestions = useMemo(
    () => testQuestions.filter((q) => q.module === testModule),
    [testQuestions, testModule]
  );

  const currentTestQuestion = currentModuleQuestions[testIndex];

  const filteredPractice = useMemo(() => {
    return allQuestions.filter((q) => {
      const sectionMatch = q.section === section;
      const domainMatch =
        practiceDomain === "All" || q.domain === practiceDomain;
      const difficultyMatch =
        practiceDifficulty === "All" || q.difficulty === practiceDifficulty;

      return sectionMatch && domainMatch && difficultyMatch;
    });
  }, [section, practiceDomain, practiceDifficulty]);

  const currentPracticeQuestion = filteredPractice[practiceIndex];

  const totalAnswered = Object.keys(testAnswers).length;

  function changeSection(nextSection: Section) {
    setSection(nextSection);
    setMode("learn");

    setPracticeDomain("All");
    setPracticeDifficulty("All");
    setPracticeIndex(0);
    setPracticeAnswer(undefined);
    setPracticeChecked(false);

    setTestModule(1);
    setTestIndex(0);
    setTestAnswers({});
    setTestFinishedModule(false);
    setTestFinished(false);
    setModuleScores([]);
    setTestSeconds(0);
  }

  function startTest() {
    setMode("test");
    setTestModule(1);
    setTestIndex(0);
    setTestAnswers({});
    setTestFinishedModule(false);
    setTestFinished(false);
    setModuleScores([]);
    setTestSeconds(0);
  }

  function selectPracticeAnswer(value: string) {
    setPracticeAnswer(value);
    setPracticeChecked(false);
  }

  function checkPracticeAnswer() {
    if (!practiceAnswer || !currentPracticeQuestion) return;
    setPracticeChecked(true);
  }

  function nextPracticeQuestion() {
    setPracticeAnswer(undefined);
    setPracticeChecked(false);

    setPracticeIndex((current) =>
      current + 1 >= filteredPractice.length ? 0 : current + 1
    );
  }

  function selectTestAnswer(value: string) {
    if (!currentTestQuestion) return;

    setTestAnswers((current) => ({
      ...current,
      [currentTestQuestion.id]: value,
    }));
  }

  function finishModule() {
    const score = currentModuleQuestions.reduce((total, question) => {
      return (
        total +
        (getQuestionAnswer(testAnswers[question.id], testAnswers[question.id])
          ? 0
          : 0)
      );
    }, 0);

    const actualScore = currentModuleQuestions.reduce(
      (total, question) =>
        total +
        (getQuestionAnswer(question, testAnswers[question.id]) ? 1 : 0),
      0
    );

    setModuleScores((current) => [...current, actualScore]);
    setTestFinishedModule(true);
  }

  function continueToModule2() {
    setTestModule(2);
    setTestIndex(0);
    setTestFinishedModule(false);
  }

  function finishTest() {
    const score = currentModuleQuestions.reduce(
      (total, question) =>
        total +
        (getQuestionAnswer(question, testAnswers[question.id]) ? 1 : 0),
      0
    );

    setModuleScores((current) => [...current, score]);
    setTestFinished(true);
  }

  function restartTest() {
    startTest();
  }

  return (
    <main className={styles.page}>
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
                Learn the concepts, practice the skills, then test yourself
                with an original SAT-style mini test.
              </p>

              <div className={styles.heroActions}>
                <button
                  className={styles.primaryButton}
                  onClick={() => setMode("learn")}
                >
                  Start Learning <span>→</span>
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
                <span className={styles.statusBadge}>Current format</span>
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
        <section className={styles.sectionSwitcher}>
          <button
            className={`${styles.sectionCard} ${
              section === "math" ? styles.activeSection : ""
            }`}
            onClick={() => changeSection("math")}
          >
            <div className={styles.sectionIcon}>∑</div>
            <div>
              <span className={styles.cardLabel}>SAT SECTION</span>
              <h2>Math</h2>
              <p>Algebra, advanced math, data analysis & geometry.</p>
            </div>
            <span className={styles.arrow}>→</span>
          </button>

          <button
            className={`${styles.sectionCard} ${
              section === "rw" ? styles.activeSection : ""
            }`}
            onClick={() => changeSection("rw")}
          >
            <div className={`${styles.sectionIcon} ${styles.rwIcon}`}>Aa</div>
            <div>
              <span className={styles.cardLabel}>SAT SECTION</span>
              <h2>Reading & Writing</h2>
              <p>Reading comprehension, language, grammar & revision.</p>
            </div>
            <span className={styles.arrow}>→</span>
          </button>
        </section>

        <section className={styles.workspace}>
          <div className={styles.workspaceHeader}>
            <div>
              <span className={styles.kicker}>
                {section === "math" ? "MATH" : "READING & WRITING"}
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
                className={mode === "learn" ? styles.activeTab : ""}
                onClick={() => setMode("learn")}
              >
                Learn
              </button>
              <button
                className={mode === "practice" ? styles.activeTab : ""}
                onClick={() => setMode("practice")}
              >
                Practice
              </button>
              <button
                className={mode === "test" ? styles.activeTab : ""}
                onClick={startTest}
              >
                Mini Test
              </button>
            </div>
          </div>

          {mode === "learn" && (
            <div className={styles.learnArea}>
              <div className={styles.learnIntro}>
                <div>
                  <span className={styles.kicker}>BUILD YOUR FOUNDATION</span>
                  <h3>
                    {section === "math"
                      ? "Four domains. Complete coverage."
                      : "Four domains. Stronger reading & writing."}
                  </h3>
                  <p>
                    Start with the skill areas below. Each card shows the
                    knowledge you need to build before moving into practice.
                  </p>
                </div>

                <div className={styles.progressRing}>
                  <strong>4</strong>
                  <span>domains</span>
                </div>
              </div>

              <div className={styles.domainGrid}>
                {domains.map((domain, index) => (
                  <article className={styles.domainCard} key={domain.name}>
                    <div className={styles.domainTop}>
                      <div className={styles.domainNumber}>
                        0{index + 1}
                      </div>
                      <div className={styles.domainIcon}>{domain.icon}</div>
                    </div>

                    <h3>{domain.name}</h3>
                    <span className={styles.domainShort}>{domain.short}</span>
                    <p>{domain.description}</p>

                    <div className={styles.topicList}>
                      {domain.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>

                    <button
                      className={styles.learnButton}
                      onClick={() => setMode("practice")}
                    >
                      Practice this domain <span>→</span>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {mode === "practice" && (
            <div className={styles.practiceArea}>
              <div className={styles.filterBar}>
                <div>
                  <span className={styles.kicker}>SKILL PRACTICE</span>
                  <h3>Target your weak areas.</h3>
                </div>

                <div className={styles.filters}>
                  <label>
                    <span>Domain</span>
                    <select
                      value={practiceDomain}
                      onChange={(e) => {
                        setPracticeDomain(e.target.value);
                        setPracticeIndex(0);
                        setPracticeAnswer(undefined);
                        setPracticeChecked(false);
                      }}
                    >
                      <option value="All">All domains</option>
                      {domains.map((domain) => (
                        <option key={domain.name} value={domain.name}>
                          {domain.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Difficulty</span>
                    <select
                      value={practiceDifficulty}
                      onChange={(e) => {
                        setPracticeDifficulty(e.target.value);
                        setPracticeIndex(0);
                        setPracticeAnswer(undefined);
                        setPracticeChecked(false);
                      }}
                    >
                      <option value="All">All levels</option>
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
                  <h3>No questions match these filters.</h3>
                  <p>Try another domain or difficulty.</p>
                </div>
              )}
            </div>
          )}

          {mode === "test" && (
            <div className={styles.testArea}>
              {!testFinished && !testFinishedModule && currentTestQuestion && (
                <>
                  <div className={styles.testTopBar}>
                    <div>
                      <span className={styles.kicker}>
                        {section === "math" ? "MATH" : "READING & WRITING"}
                      </span>
                      <strong>Module {testModule}</strong>
                    </div>

                    <div className={styles.testMeta}>
                      <span>
                        Question {testIndex + 1} of{" "}
                        {currentModuleQuestions.length}
                      </span>
                      <span className={styles.timer}>
                        {formatTime(testSeconds)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.moduleProgress}>
                    {currentModuleQuestions.map((question, index) => (
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
                    ))}
                  </div>

                  <TestQuestionCard
                    question={currentTestQuestion}
                    answer={testAnswers[currentTestQuestion.id]}
                    onSelect={selectTestAnswer}
                  />

                  <div className={styles.testFooter}>
                    <div>
                      <span className={styles.questionSkill}>
                        {currentTestQuestion.domain}
                      </span>
                      <span className={styles.questionSkill}>
                        {currentTestQuestion.difficulty}
                      </span>
                    </div>

                    {testIndex < currentModuleQuestions.length - 1 ? (
                      <button
                        className={styles.primaryButton}
                        onClick={() => setTestIndex((current) => current + 1)}
                      >
                        Next question <span>→</span>
                      </button>
                    ) : (
                      <button
                        className={styles.finishButton}
                        disabled={
                          currentModuleQuestions.some(
                            (question) => !testAnswers[question.id]
                          )
                        }
                        onClick={finishModule}
                      >
                        Finish Module {testModule} ✓
                      </button>
                    )}
                  </div>
                </>
              )}

              {testFinishedModule && !testFinished && (
                <ModuleComplete
                  module={testModule}
                  score={moduleScores[moduleScores.length - 1] ?? 0}
                  total={currentModuleQuestions.length}
                  onContinue={continueToModule2}
                  isLastModule={testModule === 2}
                  onFinish={finishTest}
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

        <section className={styles.resourcesSection}>
          <div>
            <span className={styles.kicker}>TRUSTED RESOURCES</span>
            <h2>Use PrepNest + official practice.</h2>
            <p>
              PrepNest provides original practice content. For official SAT
              questions and full-length adaptive tests, use College Board's
              official resources.
            </p>
          </div>

          <div className={styles.resourceLinks}>
            <a
              href="https://satsuite.collegeboard.org/sat/practice"
              target="_blank"
              rel="noreferrer"
            >
              <span>College Board</span>
              <strong>Official SAT practice ↗</strong>
            </a>

            <a
              href="https://www.khanacademy.org/test-prep/sat"
              target="_blank"
              rel="noreferrer"
            >
              <span>Khan Academy</span>
              <strong>Official SAT preparation ↗</strong>
            </a>

            <a
              href="https://satsuite.collegeboard.org/practice/question-bank"
              target="_blank"
              rel="noreferrer"
            >
              <span>Student Question Bank</span>
              <strong>Official question practice ↗</strong>
            </a>
          </div>

          <div className={styles.sourceNote}>
            <span className={styles.sourceDot} />
            <strong>PrepNest Original</strong>
            <span>
              Questions on this page are original PrepNest questions aligned
              with the SAT content domains and skills.
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

function PracticeQuestionCard({
  question,
  answer,
  checked,
  onSelect,
  onCheck,
  onNext,
}: {
  question: Question;
  answer?: string;
  checked: boolean;
  onSelect: (value: string) => void;
  onCheck: () => void;
  onNext: () => void;
}) {
  const isCorrect = getQuestionAnswer(question, answer);

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <div>
          <span className={styles.questionNumber}>Practice Question</span>
          <h3>{question.skill}</h3>
        </div>

        <span className={styles.difficultyBadge}>
          {question.difficulty}
        </span>
      </div>

      {question.passage && (
        <div className={styles.passage}>{question.passage}</div>
      )}

      <p className={styles.prompt}>{question.prompt}</p>

      {question.type === "numeric" ? (
        <input
          className={styles.numericInput}
          type="text"
          inputMode="decimal"
          placeholder="Enter your answer"
          value={answer ?? ""}
          onChange={(e) => onSelect(e.target.value)}
        />
      ) : (
        <div className={styles.choiceGrid}>
          {question.choices?.map((choice, index) => {
            const selected = answer === String(index);

            return (
              <button
                key={choice}
                className={`${styles.choice} ${
                  selected ? styles.choiceSelected : ""
                } ${
                  checked && String(index) === question.answer
                    ? styles.choiceCorrect
                    : ""
                } ${
                  checked &&
                  selected &&
                  String(index) !== question.answer
                    ? styles.choiceWrong
                    : ""
                }`}
                onClick={() => onSelect(String(index))}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {choice}
              </button>
            );
          })}
        </div>
      )}

      {checked && (
        <div
          className={`${styles.feedback} ${
            isCorrect ? styles.feedbackCorrect : styles.feedbackWrong
          }`}
        >
          <div className={styles.feedbackTitle}>
            {isCorrect ? "Correct!" : "Not quite."}
          </div>

          {!isCorrect && (
            <div className={styles.correctAnswer}>
              Correct answer:{" "}
              {question.type === "numeric"
                ? question.answer
                : question.choices?.[Number(question.answer)]}
            </div>
          )}

          <p>{question.explanation}</p>
        </div>
      )}

      <div className={styles.questionActions}>
        {!checked ? (
          <button
            className={styles.primaryButton}
            disabled={!answer}
            onClick={onCheck}
          >
            Check answer <span>✓</span>
          </button>
        ) : (
          <button className={styles.primaryButton} onClick={onNext}>
            Next question <span>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

function TestQuestionCard({
  question,
  answer,
  onSelect,
}: {
  question: Question;
  answer?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className={styles.testQuestionCard}>
      <div className={styles.testQuestionTop}>
        <span>{question.domain}</span>
        <span>{question.skill}</span>
      </div>

      {question.passage && (
        <div className={styles.testPassage}>{question.passage}</div>
      )}

      <h3>{question.prompt}</h3>

      {question.type === "numeric" ? (
        <input
          className={styles.numericInputLarge}
          type="text"
          inputMode="decimal"
          placeholder="Type your answer"
          value={answer ?? ""}
          onChange={(e) => onSelect(e.target.value)}
        />
      ) : (
        <div className={styles.testChoices}>
          {question.choices?.map((choice, index) => (
            <button
              key={choice}
              className={`${styles.testChoice} ${
                answer === String(index) ? styles.testChoiceSelected : ""
              }`}
              onClick={() => onSelect(String(index))}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{choice}</strong>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ModuleComplete({
  module,
  score,
  total,
  onContinue,
  isLastModule,
  onFinish,
}: {
  module: number;
  score: number;
  total: number;
  onContinue: () => void;
  isLastModule: boolean;
  onFinish: () => void;
}) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className={styles.completeScreen}>
      <div className={styles.completeIcon}>✓</div>

      <span className={styles.kicker}>MODULE COMPLETE</span>

      <h2>Module {module} finished.</h2>

      <p>
        You answered <strong>{score}</strong> of <strong>{total}</strong>{" "}
        questions correctly.
      </p>

      <div className={styles.scoreCircle}>
        <strong>{percentage}%</strong>
        <span>accuracy</span>
      </div>

      <div className={styles.completeActions}>
        {isLastModule ? (
          <button className={styles.primaryButton} onClick={onFinish}>
            View final result <span>→</span>
          </button>
        ) : (
          <button className={styles.primaryButton} onClick={onContinue}>
            Continue to Module 2 <span>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

function FinalResult({
  scores,
  totalQuestions,
  onRestart,
}: {
  scores: number[];
  totalQuestions: number;
  onRestart: () => void;
}) {
  const totalCorrect = scores.reduce((a, b) => a + b, 0);
  const percentage = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <div className={styles.completeScreen}>
      <div className={styles.completeIcon}>★</div>

      <span className={styles.kicker}>TEST COMPLETE</span>

      <h2>Your mini test is complete.</h2>

      <p>
        This is a practice score for this PrepNest mini test, not an official
        SAT score.
      </p>

      <div className={styles.finalScore}>
        <strong>{percentage}%</strong>
        <span>overall accuracy</span>
      </div>

      <div className={styles.moduleResults}>
        {scores.map((score, index) => (
          <div key={index}>
            <span>Module {index + 1}</span>
            <strong>{score}/5</strong>
          </div>
        ))}
      </div>

      <div className={styles.completeActions}>
        <button className={styles.primaryButton} onClick={onRestart}>
          Retake mini test ↻
        </button>
      </div>
    </div>
  );
}
