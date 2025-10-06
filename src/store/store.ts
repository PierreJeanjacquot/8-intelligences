import { IntelligenceCode } from "@/types/types";
import { create } from "zustand";

type SurveyAnswer = Record<IntelligenceCode, boolean | undefined>;

interface SurveyState {
  answers: SurveyAnswer[];
  clearAnswers: () => void;
  setAnswer: (
    question: number,
    answerCode: IntelligenceCode,
    answerValue: boolean
  ) => void;
}

export const useSurvey = create<SurveyState>()((set) => ({
  answers: [
    {
      A: true,
      B: undefined,
      C: undefined,
      D: undefined,
      E: undefined,
      F: undefined,
      G: undefined,
      H: undefined,
    },
    {
      A: undefined,
      B: true,
      C: undefined,
      D: undefined,
      E: undefined,
      F: undefined,
      G: undefined,
      H: undefined,
    },
    {
      A: undefined,
      B: undefined,
      C: true,
      D: undefined,
      E: undefined,
      F: undefined,
      G: undefined,
      H: undefined,
    },
  ],
  clearAnswers: () => set({ answers: [] }),
  setAnswer: (question, answerCode, answerValue) =>
    set((state) => {
      const answers = [...state.answers];
      answers[question] = {
        ...answers[question],
        [answerCode]: answerValue,
      };
      return { answers };
    }),
}));
