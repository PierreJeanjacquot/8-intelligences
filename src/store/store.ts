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

const isValidAnswer = (answer: unknown) => {
  if (!answer || typeof answer !== "object") return false;
  const validCodes: IntelligenceCode[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
  ];
  return Object.entries(answer).every(
    ([key, value]) =>
      validCodes.includes(key as IntelligenceCode) &&
      (value === true || value === false || value === undefined)
  );
};

const isValidQuestionnaireState = (state: unknown) => {
  if (!state || typeof state !== "object") return false;
  const s = state as QuestionnaireState;
  return (
    Array.isArray(s.answers) &&
    s.answers.every((answer) => isValidAnswer(answer))
  );
};

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
      // Merge strategy with validation
      merge: (persistedState, currentState) => {
        if (!isValidQuestionnaireState(persistedState)) {
          console.warn("Invalid persisted state, using default state");
          return currentState;
        }
        return {
          ...currentState,
          ...(persistedState as QuestionnaireState),
        };
      },
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Failed to rehydrate storage:", error);
        }
      },
    }
  )
);
