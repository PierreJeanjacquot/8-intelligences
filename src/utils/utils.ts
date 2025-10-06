import { IntelligenceCode } from "@/types/types";

export function selectedChoicesCount(
  choices: Record<IntelligenceCode, boolean | undefined> | undefined
) {
  if (!choices) {
    return 0;
  }
  return Object.values(choices).filter((v) => v).length;
}

export function answeredQuestionsCount(
  answers: (Record<IntelligenceCode, boolean | undefined> | undefined)[]
) {
  return answers.filter((a) => a && Object.values(a).some((v) => v)).length;
}

const intelligenceCodeMap: Record<
  IntelligenceCode,
  { label: string; description: string }
> = {
  A: {
    label: "Logico-mathématique",
    description: "Tu aimes réfléchir, résoudre, comprendre.",
  },
  B: {
    label: "Linguistique",
    description: "Tu es à l’aise avec les mots et les idées.",
  },
  C: {
    label: "Visuo-spatiale",
    description: "Tu penses en images et aimes créer visuellement.",
  },
  D: {
    label: "Kinesthésique",
    description: "Tu apprends en bougeant, en touchant.",
  },
  E: {
    label: "Musicale",
    description: "Tu ressens les sons, les rythmes, les mélodies.",
  },
  F: {
    label: "Interpersonnelle",
    description: "Tu comprends et aimes les autres.",
  },
  G: {
    label: "Intrapersonnelle",
    description: "Tu te connais bien et aimes réfléchir sur toi.",
  },
  H: {
    label: "Naturaliste",
    description: "Tu observes et comprends le vivant, la nature.",
  },
};

export function codeToLabel(code: IntelligenceCode) {
  return intelligenceCodeMap[code].label;
}

export function codeToDescription(code: IntelligenceCode) {
  return intelligenceCodeMap[code].description;
}

export function getResults(
  answers: (Record<IntelligenceCode, boolean | undefined> | undefined)[]
): {
  code: IntelligenceCode;
  count: number;
  ratio: number;
  label: string;
  description: string;
}[] {
  const answeredCount = answeredQuestionsCount(answers);
  const results = answers.reduce(
    (acc, answer) => {
      for (const [key, value] of Object.entries(answer || {})) {
        if (value) {
          acc[key as IntelligenceCode]++;
        }
      }
      return acc;
    },
    {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      G: 0,
      H: 0,
    } as Record<IntelligenceCode, number>
  );
  const finalResults = Object.entries(results)
    .map(([key, value]) => {
      return {
        code: key as IntelligenceCode,
        label: codeToLabel(key as IntelligenceCode),
        description: codeToDescription(key as IntelligenceCode),
        count: value,
        ratio: value / answeredCount,
      };
    })
    .sort((a, b) => b.count - a.count);
  return finalResults;
}
