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

const mathDomains: Domain[] = [
  {
    name: "Algebra",
    short: "Linear equations and functions",
    description:
      "Build fluency with linear equations, functions, systems, and inequalities.",
    topics: [
      "Linear equations",
      "Linear functions",
      "Systems",
      "Inequalities",
    ],
    icon: "ƒ",
  },
  {
    name: "Advanced Math",
    short: "Nonlinear relationships",
    description:
      "Work with quadratic, exponential, polynomial, rational, and other nonlinear relationships.",
    topics: [
      "Quadratics",
      "Exponential functions",
      "Polynomials",
      "Nonlinear equations",
    ],
    icon: "x²",
  },
  {
    name: "Problem-Solving & Data Analysis",
    short: "Data, ratios and probability",
    description:
      "Interpret data and solve problems involving percentages, probability, statistics, and proportional relationships.",
    topics: [
      "Percentages",
      "Statistics",
      "Probability",
      "Data models",
    ],
    icon: "∑",
  },
  {
    name: "Geometry & Trigonometry",
    short: "Geometry, circles and trig",
    description:
      "Apply geometric relationships, area and volume formulas, right-triangle reasoning, and trigonometry.",
    topics: [
      "Triangles",
      "Circles",
      "Area & volume",
      "Trigonometry",
    ],
    icon: "△",
  },
];

const rwDomains: Domain[] = [
  {
    name: "Information & Ideas",
    short: "Comprehension and evidence",
    description:
      "Understand central ideas, make inferences, and evaluate evidence from texts and data.",
    topics: [
      "Central ideas",
      "Inferences",
      "Command of evidence",
      "Quantitative evidence",
    ],
    icon: "◉",
  },
  {
    name: "Craft & Structure",
    short: "Language and text structure",
    description:
      "Analyze vocabulary in context, structure, purpose, and connections between texts.",
    topics: [
      "Words in context",
      "Text structure",
      "Author's purpose",
      "Cross-text connections",
    ],
    icon: "Aa",
  },
  {
    name: "Expression of Ideas",
    short: "Revision and organization",
    description:
      "Improve organization, transitions, rhetorical effectiveness, and synthesis of information.",
    topics: [
      "Rhetorical synthesis",
      "Transitions",
      "Logical flow",
      "Revision",
    ],
    icon: "↗",
  },
  {
    name: "Standard English Conventions",
    short: "Grammar and punctuation",
    description:
      "Edit sentences for punctuation, sentence boundaries, usage, structure, and agreement.",
    topics: [
      "Boundaries",
      "Punctuation",
      "Verb forms",
      "Agreement",
    ],
    icon: "✓",
  },
];

/* PrepNest Original content. These are not copied College Board questions. */
const mathQuestions: Question[] = [
  {
    id: "m1-01",
    section: "math",
    module: 1,
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "Easy",
    type: "choice",
    prompt:
      "A linear function f is defined by f(x) = 4x + b. If f(3) = 17, what is the value of b?",
    choices: ["3", "5", "8", "12"],
    answer: "1",
    explanation:
      "Substitute x = 3: 17 = 4(3) + b = 12 + b. Therefore b = 5.",
  },
  {
    id: "m1-02",
    section: "math",
    module: 1,
    domain: "Problem-Solving & Data Analysis",
    skill: "Percentages",
    difficulty: "Easy",
    type: "choice",
    prompt:
      "A school has 800 students. If 35% of the students participate in at least one after-school activity, how many students participate?",
    choices: ["240", "260", "280", "320"],
    answer: "2",
    explanation: "35% of 800 is 0.35 × 800 = 280.",
  },
  {
    id: "m1-03",
    section: "math",
    module: 1,
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "If x² − 9x + 20 = 0, what is the sum of the two solutions?",
    choices: ["4", "5", "9", "20"],
    answer: "2",
    explanation:
      "For x² − 9x + 20 = 0, the sum of the roots is −b/a = 9.",
  },
  {
    id: "m1-04",
    section: "math",
    module: 1,
    domain: "Geometry & Trigonometry",
    skill: "Right triangles",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "A right triangle has one leg of length 9 and a hypotenuse of length 15. What is the length of the other leg?",
    choices: ["6", "9", "12", "18"],
    answer: "2",
    explanation:
      "By the Pythagorean theorem, x² + 9² = 15². Thus x² = 144, so x = 12.",
  },
  {
    id: "m1-05",
    section: "math",
    module: 1,
    domain: "Algebra",
    skill: "Systems of equations",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "The system 3x + 2y = 19 and x − y = 3 has solution (x, y). What is the value of x + y?",
    choices: ["5", "7", "9", "11"],
    answer: "1",
    explanation:
      "From x − y = 3, x = y + 3. Then 3(y + 3) + 2y = 19, so y = 2 and x = 5. Therefore x + y = 7.",
  },
  {
    id: "m2-high-01",
    section: "math",
    module: 2,
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "For x ≠ 3, which expression is equivalent to (x² − 9)/(x − 3)?",
    choices: ["x − 3", "x + 3", "x² + 3", "x² − 3"],
    answer: "1",
    explanation:
      "Factor x² − 9 as (x − 3)(x + 3). Since x ≠ 3, the expression simplifies to x + 3.",
  },
  {
    id: "m2-high-02",
    section: "math",
    module: 2,
    domain: "Problem-Solving & Data Analysis",
    skill: "Two-variable data",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "A scatterplot shows a strong positive linear association between x and y. A line of best fit has slope 2.4. Which statement is most consistent with this model?",
    choices: [
      "For every increase of 1 in x, y decreases by about 2.4.",
      "For every increase of 1 in x, y increases by about 2.4.",
      "For every increase of 2.4 in x, y remains unchanged.",
      "The correlation between x and y must be exactly 0.",
    ],
    answer: "1",
    explanation:
      "A positive slope of 2.4 means the model predicts that y increases by about 2.4 for each 1-unit increase in x.",
  },
  {
    id: "m2-high-03",
    section: "math",
    module: 2,
    domain: "Geometry & Trigonometry",
    skill: "Circles",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "A circle has equation (x − 4)² + (y + 1)² = 49. A point on the circle is located directly above the center. What is the y-coordinate of this point?",
    choices: ["−8", "−1", "6", "8"],
    answer: "2",
    explanation:
      "The center is (4, −1) and the radius is 7. Directly above the center gives y = −1 + 7 = 6.",
  },
  {
    id: "m2-high-04",
    section: "math",
    module: 2,
    domain: "Advanced Math",
    skill: "Exponential functions",
    difficulty: "Hard",
    type: "numeric",
    prompt:
      "A quantity is modeled by P(t) = 600(1.05)^t. What is P(2) to the nearest whole number?",
    answer: "662",
    explanation:
      "P(2) = 600(1.05)² = 600(1.1025) = 661.5, which rounds to 662.",
  },
  {
    id: "m2-high-05",
    section: "math",
    module: 2,
    domain: "Algebra",
    skill: "Linear inequalities",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "A company charges a fixed fee of $18 plus $7 for each unit produced. If the company can spend at most $130, which inequality represents the possible number x of units?",
    choices: [
      "18x + 7 ≤ 130",
      "18 + 7x ≤ 130",
      "18 + 7x ≥ 130",
      "7 − 18x ≤ 130",
    ],
    answer: "1",
    explanation:
      "The fixed fee is 18 and the variable cost is 7x. At most 130 means 18 + 7x ≤ 130.",
  },
  {
    id: "m2-low-01",
    section: "math",
    module: 2,
    domain: "Algebra",
    skill: "Linear equations",
    difficulty: "Easy",
    type: "choice",
    prompt: "If 5x − 8 = 27, what is the value of x?",
    choices: ["5", "6", "7", "8"],
    answer: "2",
    explanation:
      "Add 8 to both sides: 5x = 35. Divide by 5: x = 7.",
  },
  {
    id: "m2-low-02",
    section: "math",
    module: 2,
    domain: "Problem-Solving & Data Analysis",
    skill: "Ratios and rates",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "A car travels 180 miles in 3 hours at a constant speed. At this speed, how far will it travel in 5 hours?",
    choices: ["240", "270", "300", "360"],
    answer: "2",
    explanation:
      "The speed is 180 ÷ 3 = 60 miles per hour. In 5 hours, the car travels 60 × 5 = 300 miles.",
  },
  {
    id: "m2-low-03",
    section: "math",
    module: 2,
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Medium",
    type: "choice",
    prompt: "Which value of x satisfies x² − 6x + 8 = 0?",
    choices: ["1", "2", "5", "7"],
    answer: "1",
    explanation:
      "Factor as (x − 2)(x − 4) = 0. Among the choices, x = 2 works.",
  },
  {
    id: "m2-low-04",
    section: "math",
    module: 2,
    domain: "Geometry & Trigonometry",
    skill: "Area",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "A rectangle has length 14 and width 9. What is its area?",
    choices: ["23", "46", "126", "252"],
    answer: "2",
    explanation: "Area = length × width = 14 × 9 = 126.",
  },
  {
    id: "m2-low-05",
    section: "math",
    module: 2,
    domain: "Problem-Solving & Data Analysis",
    skill: "Measures of center",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "The mean of 4, 8, 10, and x is 9. What is x?",
    choices: ["12", "13", "14", "15"],
    answer: "2",
    explanation:
      "The total must be 4 × 9 = 36. Therefore x = 36 − 4 − 8 − 10 = 14.",
  },
];

const rwQuestions: Question[] = [
  {
    id: "r1-01",
    section: "rw",
    module: 1,
    domain: "Information & Ideas",
    skill: "Central Ideas and Details",
    difficulty: "Easy",
    type: "choice",
    passage:
      "Researchers studying rooftop gardens in several cities found that the gardens can lower temperatures on building roofs during hot weather. The researchers also noted that the effect varied depending on the amount of vegetation and the materials used beneath it.",
    prompt:
      "Which choice best states the main idea of the text?",
    choices: [
      "Rooftop gardens are identical in every city.",
      "Rooftop gardens can reduce roof temperatures, although their effects vary.",
      "Researchers have stopped studying rooftop gardens.",
      "Building materials have no effect on rooftop temperatures.",
    ],
    answer: "1",
    explanation:
      "The passage presents a general benefit of rooftop gardens while noting that the size of the effect varies.",
  },
  {
    id: "r1-02",
    section: "rw",
    module: 1,
    domain: "Craft & Structure",
    skill: "Words in Context",
    difficulty: "Medium",
    type: "choice",
    passage:
      "Although the first results appeared promising, the researchers remained cautious, noting that the evidence was preliminary and required further investigation.",
    prompt:
      "As used in the text, what does “preliminary” most nearly mean?",
    choices: [
      "Definitive",
      "Initial",
      "Irrelevant",
      "Contradictory",
    ],
    answer: "1",
    explanation:
      "The evidence requires further investigation, indicating that it is initial rather than definitive.",
  },
  {
    id: "r1-03",
    section: "rw",
    module: 1,
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    type: "choice",
    passage:
      "The first design required several specialized materials. ______, the revised design can be manufactured using materials already available at most facilities.",
    prompt:
      "Which choice completes the text with the most logical transition?",
    choices: [
      "In contrast",
      "For example",
      "Similarly",
      "As a result",
    ],
    answer: "0",
    explanation:
      "The second sentence contrasts the material requirements of the first design with those of the revised design.",
  },
  {
    id: "r1-04",
    section: "rw",
    module: 1,
    domain: "Standard English Conventions",
    skill: "Sentence boundaries",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "The new telescope can detect extremely faint objects___its improved sensor is substantially more sensitive than earlier models.",
    choices: [", and", "; its", ", its", ": its"],
    answer: "0",
    explanation:
      "The comma and coordinating conjunction “and” correctly join the two independent clauses.",
  },
  {
    id: "r1-05",
    section: "rw",
    module: 1,
    domain: "Information & Ideas",
    skill: "Inference",
    difficulty: "Hard",
    type: "choice",
    passage:
      "In a study of note-taking methods, students who organized information by concept performed better on questions requiring them to connect ideas from different parts of a lecture. The researchers did not observe the same advantage on questions asking students to recall isolated facts.",
    prompt:
      "Which inference is best supported by the text?",
    choices: [
      "Conceptual organization may be particularly useful for connecting related ideas.",
      "Students should never record individual facts.",
      "All students prefer organizing information by concept.",
      "Recall questions are more difficult than connection questions.",
    ],
    answer: "0",
    explanation:
      "The advantage appeared specifically on questions requiring connections among ideas.",
  },
  {
    id: "r2-high-01",
    section: "rw",
    module: 2,
    domain: "Craft & Structure",
    skill: "Cross-Text Connections",
    difficulty: "Hard",
    type: "choice",
    passage:
      "Text 1: A historian argues that the expansion of railways primarily accelerated the movement of goods between regional markets.\n\nText 2: Another historian emphasizes that railways also changed where businesses chose to locate, because companies could reach distant customers more efficiently.",
    prompt:
      "Based on the texts, how would the authors most likely agree?",
    choices: [
      "Railways affected only agricultural production.",
      "Railways influenced economic activity beyond transportation itself.",
      "Railways caused businesses to become less connected.",
      "Railways had no meaningful effect on regional markets.",
    ],
    answer: "1",
    explanation:
      "Both texts identify economic effects of railways beyond simply describing railway construction.",
  },
  {
    id: "r2-high-02",
    section: "rw",
    module: 2,
    domain: "Information & Ideas",
    skill: "Command of Evidence",
    difficulty: "Hard",
    type: "choice",
    passage:
      "A researcher claims that a particular bird species has adapted its nesting behavior to urban environments. The researcher notes that the birds increasingly build nests on artificial structures in areas where natural nesting sites are scarce.",
    prompt:
      "Which finding would most directly support the researcher's claim?",
    choices: [
      "The birds migrate seasonally to rural areas.",
      "The birds use artificial structures more frequently in cities than in nearby rural areas.",
      "The birds consume several types of seeds.",
      "The birds are active during both morning and evening.",
    ],
    answer: "1",
    explanation:
      "The claim concerns adaptation of nesting behavior to urban environments, so an urban-rural comparison is most direct.",
  },
  {
    id: "r2-high-03",
    section: "rw",
    module: 2,
    domain: "Standard English Conventions",
    skill: "Subject-verb agreement",
    difficulty: "Hard",
    type: "choice",
    prompt:
      "The collection of photographs from several remote expeditions ___ displayed in the museum's west gallery.",
    choices: ["are", "were", "is", "have been"],
    answer: "2",
    explanation:
      "The subject is “collection,” which is singular. The phrase “of photographs” does not change the subject.",
  },
  {
    id: "r2-high-04",
    section: "rw",
    module: 2,
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Hard",
    type: "choice",
    passage:
      "A student has taken these notes:\n\n• Some coral species can tolerate short periods of unusually warm water.\n• Longer periods of warming can damage coral tissue.\n• Researchers are studying whether heat-tolerant coral populations can recover more quickly.",
    prompt:
      "The student wants to emphasize the researchers' goal. Which choice best accomplishes this goal?",
    choices: [
      "Some coral species tolerate short periods of unusually warm water.",
      "Long periods of warming can damage coral tissue.",
      "Researchers are studying whether heat-tolerant coral populations recover more quickly after warming.",
      "Coral populations can experience different water temperatures.",
    ],
    answer: "2",
    explanation:
      "Choice C directly states what the researchers are investigating, which is the requested rhetorical goal.",
  },
  {
    id: "r2-high-05",
    section: "rw",
    module: 2,
    domain: "Craft & Structure",
    skill: "Text Structure and Purpose",
    difficulty: "Hard",
    type: "choice",
    passage:
      "For many years, scholars interpreted the painting as an isolated experiment by the artist. A recently discovered letter, however, describes several similar works produced during the same period. The discovery has prompted scholars to reconsider whether the painting was actually part of a broader period of experimentation.",
    prompt:
      "What is the primary purpose of the text?",
    choices: [
      "To describe how letters are preserved",
      "To introduce evidence that has changed an interpretation of an artwork",
      "To argue that the artist produced only one experimental painting",
      "To compare the artist with other painters",
    ],
    answer: "1",
    explanation:
      "The passage contrasts an earlier interpretation with new evidence that led scholars to reconsider it.",
  },
  {
    id: "r2-low-01",
    section: "rw",
    module: 2,
    domain: "Information & Ideas",
    skill: "Central Ideas and Details",
    difficulty: "Easy",
    type: "choice",
    passage:
      "A small study found that students who took short breaks during a long study session reported feeling less fatigued than students who studied continuously.",
    prompt:
      "Which choice best states the main idea?",
    choices: [
      "Short study breaks may reduce feelings of fatigue.",
      "Students should study continuously.",
      "All students prefer long study sessions.",
      "The study measured academic achievement over several years.",
    ],
    answer: "0",
    explanation:
      "The finding described is that students taking short breaks reported less fatigue.",
  },
  {
    id: "r2-low-02",
    section: "rw",
    module: 2,
    domain: "Craft & Structure",
    skill: "Words in Context",
    difficulty: "Medium",
    type: "choice",
    passage:
      "The curator selected a modest display because the museum wanted to emphasize the paintings rather than overwhelm visitors with decorative elements.",
    prompt:
      "As used in the text, what does “modest” most nearly mean?",
    choices: [
      "Elaborate",
      "Limited",
      "Expensive",
      "Temporary",
    ],
    answer: "1",
    explanation:
      "The contrast with an overwhelming display indicates that “modest” means limited or restrained.",
  },
  {
    id: "r2-low-03",
    section: "rw",
    module: 2,
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    type: "choice",
    passage:
      "The researchers initially expected the material to become weaker as its temperature increased. ______, the material became slightly stronger within the tested temperature range.",
    prompt:
      "Which choice completes the text with the most logical transition?",
    choices: [
      "Nevertheless",
      "For instance",
      "Likewise",
      "In addition",
    ],
    answer: "0",
    explanation:
      "The second sentence presents a result that contrasts with the researchers' expectation.",
  },
  {
    id: "r2-low-04",
    section: "rw",
    module: 2,
    domain: "Standard English Conventions",
    skill: "Punctuation",
    difficulty: "Medium",
    type: "choice",
    prompt:
      "The researchers tested three materials___glass, aluminum, and carbon fiber.",
    choices: [",", ";", ":", "and"],
    answer: "2",
    explanation:
      "A colon correctly introduces the list that identifies the three materials.",
  },
  {
    id: "r2-low-05",
    section: "rw",
    module: 2,
    domain: "Information & Ideas",
    skill: "Inference",
    difficulty: "Medium",
    type: "choice",
    passage:
      "The library extended its evening hours during exam week, and attendance increased substantially after 7 p.m. compared with the same period during ordinary weeks.",
    prompt:
      "Which inference is best supported by the text?",
    choices: [
      "The library was closed during the day.",
      "Some students may have benefited from later access to the library.",
      "Exam week always lasts seven days.",
      "Attendance was lower before 7 p.m.",
    ],
    answer: "1",
    explanation:
      "The increase in evening attendance after the hours were extended supports the inference that later access benefited some students.",
  },
];

const allQuestions = [...mathQuestions, ...rwQuestions];

function isCorrect(question: Question, answer?: string) {
  if (!answer || answer.trim() === "") return false;

  return question.type === "numeric"
    ? answer.trim() === question.answer
    : answer === question.answer;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const remaining = (seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remaining}`;
}

function getQuestionPath(
  questions: Question[],
  answers: Record<string, string>
): "higher" | "foundation" {
  const moduleOne = questions.filter((q) => q.module === 1);

  const score = moduleOne.reduce(
    (total, q) =>
      total + (isCorrect(q, answers[q.id]) ? 1 : 0),
    0
  );

  return score >= 4 ? "higher" : "foundation";
}

export default function SATPage() {
  const [section, setSection] = useState<Section>("math");
  const [mode, setMode] = useState<Mode>("learn");

  const [practiceDomain, setPracticeDomain] = useState("All");

  const [practiceDifficulty, setPracticeDifficulty] =
    useState<"All" | Difficulty>("All");

  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceChecked, setPracticeChecked] = useState(false);

  const [testModule, setTestModule] = useState<1 | 2>(1);
  const [testIndex, setTestIndex] = useState(0);

  const [testAnswers, setTestAnswers] =
    useState<Record<string, string>>({});

  const [moduleScores, setModuleScores] = useState<number[]>([]);
  const [moduleOneScore, setModuleOneScore] = useState(0);

  const [testFinishedModule, setTestFinishedModule] =
    useState(false);

  const [testFinished, setTestFinished] = useState(false);

  const [testPath, setTestPath] =
    useState<"higher" | "foundation" | null>(null);

  const [secondsLeft, setSecondsLeft] = useState(600);

  const domains = section === "math"
    ? mathDomains
    : rwDomains;

  const questions = section === "math"
    ? mathQuestions
    : rwQuestions;

  const filteredPractice = useMemo(
    () =>
      allQuestions.filter(
        (q) =>
          q.section === section &&
          (practiceDomain === "All" ||
            q.domain === practiceDomain) &&
          (practiceDifficulty === "All" ||
            q.difficulty === practiceDifficulty)
      ),
    [section, practiceDomain, practiceDifficulty]
  );

  const currentPracticeQuestion =
    filteredPractice[practiceIndex];

  const testQuestions = useMemo(() => {
    if (testModule === 1) {
      return questions.filter((q) => q.module === 1);
    }

    const prefix =
      section === "math" ? "m2-" : "r2-";

    const target =
      `${prefix}${
        (testPath ?? "foundation") === "higher"
          ? "high"
          : "low"
      }`;

    return questions.filter(
      (q) =>
        q.module === 2 &&
        q.id.startsWith(target)
    );
  }, [
    questions,
    testModule,
    testPath,
    section,
  ]);

  const currentTestQuestion =
    testQuestions[testIndex];

  const answeredCount = testQuestions.filter(
    (q) => Boolean(testAnswers[q.id])
  ).length;

  const allAnswered =
    testQuestions.length > 0 &&
    answeredCount === testQuestions.length;

  useEffect(() => {
    if (
      mode !== "test" ||
      testFinished ||
      testFinishedModule
    ) {
      return;
    }

    if (secondsLeft <= 0) {
      if (allAnswered) {
        if (testModule === 1) {
          finishModuleOne();
        } else {
          finishModuleTwo();
        }
      }

      return;
    }

    const timer = window.setTimeout(
      () =>
        setSecondsLeft(
          (value) => value - 1
        ),
      1000
    );

    return () =>
      window.clearTimeout(timer);
  }, [
    mode,
    secondsLeft,
    testFinished,
    testFinishedModule,
    allAnswered,
    testModule,
  ]);

  function resetPractice() {
    setPracticeIndex(0);
    setPracticeAnswer("");
    setPracticeChecked(false);
  }

  function resetTest() {
    setTestModule(1);
    setTestIndex(0);
    setTestAnswers({});
    setModuleScores([]);
    setModuleOneScore(0);
    setTestFinishedModule(false);
    setTestFinished(false);
    setTestPath(null);
    setSecondsLeft(600);
  }

  function changeSection(next: Section) {
    setSection(next);
    setMode("learn");
    setPracticeDomain("All");
    setPracticeDifficulty("All");
    resetPractice();
    resetTest();
  }

  function openMode(nextMode: Mode) {
    setMode(nextMode);

    if (nextMode === "practice") {
      resetPractice();
    }

    if (nextMode === "test") {
      resetTest();
    }
  }

  function startTest() {
    resetTest();
    setMode("test");
  }

  function checkPractice() {
    if (practiceAnswer) {
      setPracticeChecked(true);
    }
  }

  function nextPractice() {
    if (!filteredPractice.length) {
      return;
    }

    setPracticeIndex(
      (value) =>
        (value + 1) %
        filteredPractice.length
    );

    setPracticeAnswer("");
    setPracticeChecked(false);
  }

  function selectTestAnswer(answer: string) {
    if (!currentTestQuestion) {
      return;
    }

    setTestAnswers((current) => ({
      ...current,
      [currentTestQuestion.id]: answer,
    }));
  }

  function calculateCurrentModuleScore() {
    return testQuestions.reduce(
      (total, q) =>
        total +
        (isCorrect(
          q,
          testAnswers[q.id]
        )
          ? 1
          : 0),
      0
    );
  }

  function finishModuleOne() {
    if (!allAnswered) {
      return;
    }

    const score =
      calculateCurrentModuleScore();

    setModuleOneScore(score);

    setTestPath(
      getQuestionPath(
        questions,
        testAnswers
      )
    );

    setModuleScores([score]);
    setTestFinishedModule(true);
  }

  function continueToModuleTwo() {
    setTestModule(2);
    setTestIndex(0);
    setTestFinishedModule(false);
    setSecondsLeft(600);
  }

  function finishModuleTwo() {
    if (!allAnswered) {
      return;
    }

    const score =
      calculateCurrentModuleScore();

    setModuleScores((current) => [
      ...current,
      score,
    ]);

    setTestFinished(true);
    setTestFinishedModule(false);
  }

  const totalCorrect = moduleScores.reduce(
    (sum, score) => sum + score,
    0
  );

  const totalQuestions =
    moduleScores.length * 5;

  const overallPercentage =
    totalQuestions > 0
      ? Math.round(
          (totalCorrect / totalQuestions) *
            100
        )
      : 0;

  const currentLocation =
    mode === "learn"
      ? section === "math"
        ? "Math Learning"
        : "Reading & Writing Learning"
      : mode === "practice"
        ? section === "math"
          ? "Math Practice"
          : "Reading & Writing Practice"
        : section === "math"
          ? `Math Mini Test · Module ${testModule}`
          : `Reading & Writing Mini Test · Module ${testModule}`;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className={styles.heroInner}>
          <div className={styles.breadcrumb}>
            <span>SAT</span>
            <span>/</span>
            <strong>{currentLocation}</strong>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>
                PREPNEST SAT
              </span>

              <h1>
                {mode === "learn" && (
                  <>
                    Learn the SAT.
                    <br />
                    <em>
                      Build the foundation.
                    </em>
                  </>
                )}

                {mode === "practice" && (
                  <>
                    Practice smarter.
                    <br />
                    <em>
                      Target your skills.
                    </em>
                  </>
                )}

                {mode === "test" && (
                  <>
                    Test your skills.
                    <br />
                    <em>
                      Think like the SAT.
                    </em>
                  </>
                )}
              </h1>

              <p>
                {mode === "learn" &&
                  `Structured ${
                    section === "math"
                      ? "Math"
                      : "Reading & Writing"
                  } preparation based on the current SAT content domains.`}

                {mode === "practice" &&
                  `Focused ${
                    section === "math"
                      ? "Math"
                      : "Reading & Writing"
                  } practice with original PrepNest questions and explanations.`}

                {mode === "test" &&
                  `A ${
                    section === "math"
                      ? "Math"
                      : "Reading & Writing"
                  } mini practice test with two modules and an adaptive-path simulation.`}
              </p>

              <div className={styles.heroActions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={
                    mode === "test"
                      ? startTest
                      : () => openMode(mode)
                  }
                >
                  {mode === "learn" &&
                    "Continue Learning"}

                  {mode === "practice" &&
                    "Continue Practice"}

                  {mode === "test" &&
                    "Restart Mini Test"}

                  <span>→</span>
                </button>

                {mode !== "test" && (
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={startTest}
                  >
                    Take Mini Test
                  </button>
                )}
              </div>
            </div>

            <div className={styles.heroPanel}>
              <div className={styles.heroPanelTop}>
                <span>Current section</span>

                <span
                  className={styles.liveBadge}
                >
                  {section === "math"
                    ? "MATH"
                    : "R&W"}
                </span>
              </div>

              <strong>
                {section === "math"
                  ? "Math"
                  : "Reading & Writing"}
              </strong>

              <p>
                {mode === "learn" &&
                  "Explore the four content domains."}

                {mode === "practice" &&
                  "Choose a domain and difficulty."}

                {mode === "test" &&
                  `Module ${testModule} · ${answeredCount}/${testQuestions.length} answered`}
              </p>

              <div
                className={
                  styles.heroProgress
                }
              >
                <span
                  style={{
                    width:
                      mode === "test"
                        ? `${
                            testQuestions.length
                              ? (answeredCount /
                                  testQuestions.length) *
                                100
                              : 0
                          }%`
                        : "100%",
                  }}
                />
              </div>

              <small>
                {mode === "test"
                  ? `${formatTime(
                      secondsLeft
                    )} remaining`
                  : "PrepNest Original"}
              </small>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.sectionSwitcher}>
          <button
            type="button"
            className={`${styles.sectionCard} ${
              section === "math"
                ? styles.sectionActive
                : ""
            }`}
            onClick={() =>
              changeSection("math")
            }
          >
            <span
              className={styles.sectionIcon}
            >
              ∑
            </span>

            <span>
              <small>SAT SECTION</small>

              <strong>Math</strong>

              <em>
                Algebra, advanced math, data
                analysis, geometry & trigonometry
              </em>
            </span>

            <b>→</b>
          </button>

          <button
            type="button"
            className={`${styles.sectionCard} ${
              section === "rw"
                ? styles.sectionActive
                : ""
            }`}
            onClick={() =>
              changeSection("rw")
            }
          >
            <span
              className={`${styles.sectionIcon} ${styles.rwIcon}`}
            >
              Aa
            </span>

            <span>
              <small>SAT SECTION</small>

              <strong>
                Reading & Writing
              </strong>

              <em>
                Information, craft, expression
                and conventions
              </em>
            </span>

            <b>→</b>
          </button>
        </div>

        <section className={styles.workspace}>
          <div className={styles.workspaceTop}>
            <div>
              <span className={styles.kicker}>
                {section === "math"
                  ? "MATH"
                  : "READING & WRITING"}
              </span>

              <h2>
                {mode === "learn" &&
                  "Learn"}

                {mode === "practice" &&
                  "Practice"}

                {mode === "test" &&
                  "Mini Practice Test"}
              </h2>
            </div>

            <div
              className={styles.modeTabs}
            >
              <button
                type="button"
                className={
                  mode === "learn"
                    ? styles.tabActive
                    : ""
                }
                onClick={() =>
                  openMode("learn")
                }
              >
                Learn
              </button>

              <button
                type="button"
                className={
                  mode === "practice"
                    ? styles.tabActive
                    : ""
                }
                onClick={() =>
                  openMode("practice")
                }
              >
                Practice
              </button>

              <button
                type="button"
                className={
                  mode === "test"
                    ? styles.tabActive
                    : ""
                }
                onClick={startTest}
              >
                Mini Test
              </button>
            </div>
          </div>

          {mode === "learn" && (
            <div className={styles.learnArea}>
              <div
                className={
                  styles.domainHeader
                }
              >
                <div>
                  <span
                    className={styles.kicker}
                  >
                    {section === "math"
                      ? "MATH DOMAINS"
                      : "R&W DOMAINS"}
                  </span>

                  <h3>
                    Choose a skill area.
                  </h3>

                  <p>
                    Start with a domain, learn
                    the core concepts, then move
                    directly into targeted practice.
                  </p>
                </div>

                <div
                  className={
                    styles.domainCount
                  }
                >
                  <strong>04</strong>
                  <span>domains</span>
                </div>
              </div>

              <div
                className={
                  styles.domainGrid
                }
              >
                {domains.map(
                  (domain, index) => (
                    <article
                      key={domain.name}
                      className={
                        styles.domainCard
                      }
                    >
                      <div
                        className={
                          styles.domainTop
                        }
                      >
                        <span>
                          0{index + 1}
                        </span>

                        <b>
                          {domain.icon}
                        </b>
                      </div>

                      <h3>
                        {domain.name}
                      </h3>

                      <strong>
                        {domain.short}
                      </strong>

                      <p>
                        {domain.description}
                      </p>

                      <div
                        className={
                          styles.topicList
                        }
                      >
                        {domain.topics.map(
                          (topic) => (
                            <span
                              key={topic}
                            >
                              {topic}
                            </span>
                          )
                        )}
                      </div>

                      <button
                        type="button"
                        className={
                          styles.domainButton
                        }
                        onClick={() => {
                          setPracticeDomain(
                            domain.name
                          );

                          setPracticeDifficulty(
                            "All"
                          );

                          resetPractice();

                          setMode("practice");
                        }}
                      >
                        Practice this domain
                        <span>→</span>
                      </button>
                    </article>
                  )
                )}
              </div>
            </div>
          )}

          {mode === "practice" && (
            <div
              className={
                styles.practiceArea
              }
            >
              <div
                className={
                  styles.practiceToolbar
                }
              >
                <div>
                  <span
                    className={
                      styles.kicker
                    }
                  >
                    TARGETED PRACTICE
                  </span>

                  <h3>
                    Work on exactly what
                    you need.
                  </h3>
                </div>

                <div
                  className={styles.filters}
                >
                  <label>
                    Domain

                    <select
                      value={
                        practiceDomain
                      }
                      onChange={(event) => {
                        setPracticeDomain(
                          event.target.value
                        );
                        resetPractice();
                      }}
                    >
                      <option value="All">
                        All domains
                      </option>

                      {domains.map(
                        (domain) => (
                          <option
                            key={domain.name}
                            value={
                              domain.name
                            }
                          >
                            {domain.name}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  <label>
                    Difficulty

                    <select
                      value={
                        practiceDifficulty
                      }
                      onChange={(event) => {
                        setPracticeDifficulty(
                          event.target
                            .value as
                            | "All"
                            | Difficulty
                        );

                        resetPractice();
                      }}
                    >
                      <option value="All">
                        All levels
                      </option>

                      <option value="Easy">
                        Easy
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="Hard">
                        Hard
                      </option>
                    </select>
                  </label>
                </div>
              </div>

              {currentPracticeQuestion ? (
                <PracticeCard
                  question={
                    currentPracticeQuestion
                  }
                  answer={practiceAnswer}
                  checked={
                    practiceChecked
                  }
                  onSelect={
                    setPracticeAnswer
                  }
                  onCheck={
                    checkPractice
                  }
                  onNext={
                    nextPractice
                  }
                />
              ) : (
                <div
                  className={
                    styles.emptyState
                  }
                >
                  <span>∅</span>
                  <h3>
                    No matching questions.
                  </h3>
                  <p>
                    Try a different filter.
                  </p>
                </div>
              )}
            </div>
          )}

          {mode === "test" && (
            <div
              className={
                styles.testArea
              }
            >
              {!testFinished &&
                !testFinishedModule &&
                currentTestQuestion && (
                  <>
                    <div
                      className={
                        styles.testHeader
                      }
                    >
                      <div>
                        <span
                          className={
                            styles.kicker
                          }
                        >
                          {section ===
                          "math"
                            ? "MATH"
                            : "READING & WRITING"}
                        </span>

                        <h3>
                          Module{" "}
                          {testModule}
                        </h3>

                        {testModule ===
                          2 &&
                          testPath && (
                            <span
                              className={
                                styles.pathBadge
                              }
                            >
                              {testPath ===
                              "higher"
                                ? "Higher-difficulty path"
                                : "Foundation path"}
                            </span>
                          )}
                      </div>

                      <div
                        className={
                          styles.testStats
                        }
                      >
                        <span>
                          {answeredCount}/
                          {
                            testQuestions.length
                          }{" "}
                          answered
                        </span>

                        <strong>
                          {formatTime(
                            secondsLeft
                          )}
                        </strong>
                      </div>
                    </div>

                    <div
                      className={
                        styles.questionProgress
                      }
                    >
                      {testQuestions.map(
                        (
                          question,
                          index
                        ) => (
                          <span
                            key={
                              question.id
                            }
                            className={
                              index ===
                              testIndex
                                ? styles.current
                                : testAnswers[
                                      question.id
                                    ]
                                  ? styles.done
                                  : ""
                            }
                          />
                        )
                      )}
                    </div>

                    <TestCard
                      question={
                        currentTestQuestion
                      }
                      answer={
                        testAnswers[
                          currentTestQuestion
                            .id
                        ]
                      }
                      onSelect={
                        selectTestAnswer
                      }
                    />

                    <div
                      className={
                        styles.testNavigation
                      }
                    >
                      <div>
                        <span>
                          {
                            currentTestQuestion.domain
                          }
                        </span>

                        <span>
                          {
                            currentTestQuestion.skill
                          }
                        </span>
                      </div>

                      {testIndex <
                      testQuestions.length -
                        1 ? (
                        <button
                          type="button"
                          className={
                            styles.primaryButton
                          }
                          onClick={() =>
                            setTestIndex(
                              (value) =>
                                value + 1
                            )
                          }
                        >
                          Next question{" "}
                          <span>
                            →
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={
                            styles.finishButton
                          }
                          disabled={
                            !allAnswered
                          }
                          onClick={() =>
                            testModule ===
                            1
                              ? finishModuleOne()
                              : finishModuleTwo()
                          }
                        >
                          Finish Module{" "}
                          {testModule}{" "}
                          <span>
                            ✓
                          </span>
                        </button>
                      )}
                    </div>

                    {!allAnswered &&
                      testIndex ===
                        testQuestions.length -
                          1 && (
                        <p
                          className={
                            styles.warning
                          }
                        >
                          Answer every
                          question before
                          finishing the
                          module.
                        </p>
                      )}
                  </>
                )}

              {testFinishedModule &&
                !testFinished && (
                  <ModuleComplete
                    module={1}
                    score={
                      moduleOneScore
                    }
                    path={testPath}
                    onContinue={
                      continueToModuleTwo
                    }
                  />
                )}

              {testFinished && (
                <FinalResult
                  scores={moduleScores}
                  percentage={
                    overallPercentage
                  }
                  onRestart={startTest}
                />
              )}
            </div>
          )}
        </section>

        <section
          className={styles.resources}
        >
          <div>
            <span
              className={styles.kicker}
            >
              OFFICIAL RESOURCES
            </span>

            <h2>
              PrepNest practice. Official SAT
              practice.
            </h2>

            <p>
              PrepNest questions are
              original. Use official College
              Board resources for official SAT
              questions and full-length adaptive
              practice.
            </p>
          </div>

          <div
            className={
              styles.resourceGrid
            }
          >
            <a
              href="https://satsuite.collegeboard.org/sat/practice"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                College Board
              </span>

              <strong>
                Official SAT practice ↗
              </strong>
            </a>

            <a
              href="https://www.khanacademy.org/test-prep/sat"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                Khan Academy
              </span>

              <strong>
                Official SAT preparation ↗
              </strong>
            </a>

            <a
              href="https://satsuite.collegeboard.org/practice/student-question-bank"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                Student Question Bank
              </span>

              <strong>
                Official question bank ↗
              </strong>
            </a>
          </div>

          <div
            className={styles.source}
          >
            <span />

            <strong>
              PrepNest Original
            </strong>

            <em>
              Original practice content
              aligned with current SAT
              domains and skills.
            </em>
          </div>
        </section>
      </div>
    </main>
  );
}

function PracticeCard({
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
  const correct = isCorrect(
    question,
    answer
  );

  return (
    <article
      className={
        styles.practiceCard
      }
    >
      <div
        className={
          styles.questionTop
        }
      >
        <div>
          <span
            className={
              styles.questionLabel
            }
          >
            PREPNEST ORIGINAL
          </span>

          <h3>
            {question.skill}
          </h3>
        </div>

        <span
          className={
            question.difficulty ===
            "Hard"
              ? styles.hard
              : question.difficulty ===
                  "Medium"
                ? styles.medium
                : styles.easy
          }
        >
          {question.difficulty}
        </span>
      </div>

      {question.passage && (
        <div
          className={
            styles.passage
          }
        >
          {question.passage}
        </div>
      )}

      <p
        className={
          styles.questionPrompt
        }
      >
        {question.prompt}
      </p>

      {question.type ===
      "numeric" ? (
        <input
          className={
            styles.answerInput
          }
          value={answer}
          inputMode="decimal"
          placeholder="Enter your answer"
          onChange={(event) =>
            onSelect(
              event.target.value
            )
          }
        />
      ) : (
        <div
          className={styles.choices}
        >
          {question.choices?.map(
            (choice, index) => {
              const value =
                String(index);

              const selected =
                answer === value;

              const isAnswer =
                question.answer ===
                value;

              return (
                <button
                  type="button"
                  key={choice}
                  className={`${styles.choice} ${
                    selected
                      ? styles.choiceSelected
                      : ""
                  } ${
                    checked &&
                    isAnswer
                      ? styles.choiceCorrect
                      : ""
                  } ${
                    checked &&
                    selected &&
                    !isAnswer
                      ? styles.choiceWrong
                      : ""
                  }`}
                  onClick={() =>
                    onSelect(value)
                  }
                >
                  <span>
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  <strong>
                    {choice}
                  </strong>
                </button>
              );
            }
          )}
        </div>
      )}

      {checked && (
        <div
          className={
            correct
              ? styles.correctBox
              : styles.incorrectBox
          }
        >
          <strong>
            {correct
              ? "Correct"
              : "Review this one"}
          </strong>

          {!correct && (
            <p>
              Correct answer:{" "}
              {question.type ===
              "numeric"
                ? question.answer
                : question.choices?.[
                    Number(
                      question.answer
                    )
                  ]}
            </p>
          )}

          <small>
            {question.explanation}
          </small>
        </div>
      )}

      <div
        className={styles.cardAction}
      >
        {!checked ? (
          <button
            type="button"
            className={
              styles.primaryButton
            }
            disabled={!answer}
            onClick={
              onCheck
            }
          >
            Check answer{" "}
            <span>✓</span>
          </button>
        ) : (
          <button
            type="button"
            className={
              styles.primaryButton
            }
            onClick={
              onNext
            }
          >
            Next question{" "}
            <span>→</span>
          </button>
        )}
      </div>
    </article>
  );
}

function TestCard({
  question,
  answer,
  onSelect,
}: {
  question: Question;
  answer?: string;
  onSelect: (answer: string) => void;
}) {
  return (
    <article
      className={styles.testCard}
    >
      <div
        className={
          styles.testQuestionMeta
        }
      >
        <span>
          {question.domain}
        </span>

        <span>
          {question.skill}
        </span>
      </div>

      {question.passage && (
        <div
          className={
            styles.testPassage
          }
        >
          {question.passage}
        </div>
      )}

      <h3>
        {question.prompt}
      </h3>

      {question.type ===
      "numeric" ? (
        <input
          className={
            styles.answerInputLarge
          }
          value={answer ?? ""}
          inputMode="decimal"
          placeholder="Enter your answer"
          onChange={(event) =>
            onSelect(
              event.target.value
            )
          }
        />
      ) : (
        <div
          className={
            styles.testChoices
          }
        >
          {question.choices?.map(
            (choice, index) => {
              const value =
                String(index);

              return (
                <button
                  type="button"
                  key={choice}
                  className={`${styles.testChoice} ${
                    answer === value
                      ? styles.testChoiceSelected
                      : ""
                  }`}
                  onClick={() =>
                    onSelect(value)
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
    </article>
  );
}

function ModuleComplete({
  module,
  score,
  path,
  onContinue,
}: {
  module: number;
  score: number;
  path:
    | "higher"
    | "foundation"
    | null;
  onContinue: () => void;
}) {
  const percentage = Math.round(
    (score / 5) * 100
  );

  return (
    <div
      className={
        styles.resultScreen
      }
    >
      <ProgressCircle
        percentage={percentage}
      />

      <span
        className={
          styles.kicker
        }
      >
        MODULE {module} COMPLETE
      </span>

      <h2>
        Nice work. Module {module} is
        finished.
      </h2>

      <p>
        You answered{" "}
        <strong>
          {score}/5
        </strong>{" "}
        questions correctly.
      </p>

      {path && (
        <div
          className={
            styles.adaptiveNotice
          }
        >
          <span>
            MODULE 2 PATH
          </span>

          <strong>
            {path === "higher"
              ? "Higher difficulty"
              : "Foundation"}
          </strong>

          <small>
            {path === "higher"
              ? "Your Module 1 performance qualifies you for the higher-difficulty practice path."
              : "Module 2 will continue with a foundation-focused practice path."}
          </small>
        </div>
      )}

      <button
        type="button"
        className={
          styles.primaryButton
        }
        onClick={
          onContinue
        }
      >
        Continue to Module 2{" "}
        <span>→</span>
      </button>
    </div>
  );
}

function FinalResult({
  scores,
  percentage,
  onRestart,
}: {
  scores: number[];
  percentage: number;
  onRestart: () => void;
}) {
  const total = scores.reduce(
    (sum, score) =>
      sum + score,
    0
  );

  return (
    <div
      className={
        styles.resultScreen
      }
    >
      <ProgressCircle
        percentage={
          percentage
        }
      />

      <span
        className={
          styles.kicker
        }
      >
        MINI TEST COMPLETE
      </span>

      <h2>
        Your practice result
      </h2>

      <p>
        You answered{" "}
        <strong>
          {total}/10
        </strong>{" "}
        correctly.
      </p>

      <div
        className={
          styles.resultCards
        }
      >
        {scores.map(
          (score, index) => (
            <div
              key={index}
            >
              <span>
                Module{" "}
                {index + 1}
              </span>

              <strong>
                {score}/5
              </strong>
            </div>
          )
        )}
      </div>

      <small
        className={
          styles.resultNote
        }
      >
        This is PrepNest accuracy,
        not an official SAT score.
      </small>

      <button
        type="button"
        className={
          styles.primaryButton
        }
        onClick={
          onRestart
        }
      >
        Retake mini test{" "}
        <span>↻</span>
      </button>
    </div>
  );
}

function ProgressCircle({
  percentage,
}: {
  percentage: number;
}) {
  const safePercentage =
    Math.min(
      100,
      Math.max(
        0,
        percentage
      )
    );

  const degrees =
    safePercentage * 3.6;

  return (
    <div
      className={
        styles.progressCircle
      }
      style={{
        background: `conic-gradient(#7461ed ${degrees}deg, #e9e6ff ${degrees}deg)`,
      }}
    >
      <div>
        <strong>
          {safePercentage}%
        </strong>

        <span>
          accuracy
        </span>
      </div>
    </div>
  );
}
