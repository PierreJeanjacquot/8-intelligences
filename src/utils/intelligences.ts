import { IntelligenceCode } from "@/types/types";

export const intelligenceCodeMap: Record<
  IntelligenceCode,
  { label: string; description: string }
> = {
  A: {
    label: "Logico-mathématique",
    description: "Tu aimes réfléchir, résoudre, comprendre.",
  },
  B: {
    label: "Linguistique",
    description: "Tu es à l'aise avec les mots et les idées.",
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
