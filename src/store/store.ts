import { IntelligenceCode } from "@/types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Answer = Record<IntelligenceCode, boolean | undefined>;

interface QuestionnaireState {
  answers: Answer[];
  clearAnswers: () => void;
  setAnswer: (
    question: number,
    answerCode: IntelligenceCode,
    answerValue: boolean
  ) => void;
}

export const useQuestionnaire = create<QuestionnaireState>()(
  persist(
    (set) => ({
      answers: [],
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
    }),
    {
      name: "questionnaire-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
