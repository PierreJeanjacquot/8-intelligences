import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faComment,
  faVrCardboard,
  faHand,
  faMusic,
  faPeopleArrows,
  faArrowsToCircle,
  faSeedling,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { IntelligenceCode } from "@/types/types";

const intelligenceIcons: Record<
  IntelligenceCode,
  { icon: IconDefinition; color: string; bgColor: string }
> = {
  A: {
    icon: faCalculator,
    color: "white",
    bgColor: "#0077B6",
  },
  B: {
    icon: faComment,
    color: "white",
    bgColor: "#F3722C",
  },
  C: {
    icon: faVrCardboard,
    color: "white",
    bgColor: "#8E6CB8",
  },
  D: {
    icon: faHand,
    color: "white",
    bgColor: "#66BFA1",
  },
  E: {
    icon: faMusic,
    color: "white",
    bgColor: "#FFC933",
  },
  F: {
    icon: faPeopleArrows,
    color: "white",
    bgColor: "#F68B68",
  },
  G: {
    icon: faArrowsToCircle,
    color: "white",
    bgColor: "#7A91A6",
  },
  H: {
    icon: faSeedling,
    color: "white",
    bgColor: "#A9D391",
  },
};

export function codeToIcon(code: IntelligenceCode) {
  const { icon, color, bgColor } = intelligenceIcons[code];
  return (
    <div
      className="rounded-full w-8 h-8 inline-flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <FontAwesomeIcon icon={icon} color={color} className="w-6 h-6" />
    </div>
  );
}

export function codeToColor(code: IntelligenceCode) {
  return intelligenceIcons[code].bgColor;
}
