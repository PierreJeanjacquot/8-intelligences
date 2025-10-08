import { IntelligenceCode } from "@/types/types";
import { questionnaire } from "@/utils/questionnaire";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Answer = Record<IntelligenceCode, boolean | undefined>;

interface QuestionnaireState {
  answers: Answer[];
  setAnswer: (
    question: number,
    answerCode: IntelligenceCode,
    answerValue: boolean
  ) => void;
  clearAnswers: () => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (question: number) => void;
  clearCurrentQuestionIndex: () => void;
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

const isValidQuestionIndex = (number: unknown) => {
  return (
    typeof number === "number" &&
    Number.isInteger(number) &&
    number >= 0 &&
    number <= questionnaire.length // last valid question is length (for results page)
  );
};

const isValidQuestionnaireState = (state: unknown) => {
  if (!state || typeof state !== "object") return false;
  const s = state as QuestionnaireState;
  return (
    Array.isArray(s.answers) &&
    s.answers.every((answer) => isValidAnswer(answer)) &&
    isValidQuestionIndex(s.currentQuestionIndex)
  );
};

export const useQuestionnaire = create<QuestionnaireState>()(
  persist(
    (set) => ({
      answers: [],
      currentQuestionIndex: 0,
      setAnswer: (question, answerCode, answerValue) =>
        set((state) => {
          const answers = [...state.answers];
          answers[question] = {
            ...answers[question],
            [answerCode]: answerValue,
          };
          return { answers };
        }),
      clearAnswers: () => set({ answers: [] }),
      setCurrentQuestionIndex: (question) =>
        set({ currentQuestionIndex: question }),
      clearCurrentQuestionIndex: () => set({ currentQuestionIndex: 0 }),
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
