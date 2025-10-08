import { IntelligenceCode } from "@/types/types";
import { intelligenceCodeMap } from "./intelligences";
import { questionnaire } from "./questionnaire";

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

export function isQuestionnaireFinished(
  answers: (Record<IntelligenceCode, boolean | undefined> | undefined)[]
) {
  return answeredQuestionsCount(answers) >= questionnaire.length;
}

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
