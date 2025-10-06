"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useSurvey } from "@/store/store";
import { IntelligenceCode } from "@/types/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { selectedChoicesCount } from "../../utils/utils";

const survey: {
  question: string;
  options: { label: string; value: IntelligenceCode }[];
}[] = [
  {
    question: "Quand je suis libre, j’aime surtout…",
    options: [
      {
        label: "Faire des expériences, résoudre des casse-têtes",
        value: "A",
      },
      { label: "Lire, écrire, parler, écouter des histoires", value: "B" },
      { label: "Dessiner, bricoler, imaginer des espaces", value: "C" },
      { label: "Bouger, danser, jouer avec mon corps", value: "D" },
      {
        label: "Écouter de la musique, chanter, jouer d’un instrument",
        value: "E",
      },
      { label: "Être avec les autres, discuter, aider", value: "F" },
      { label: "Être seul·e pour réfléchir ou rêver", value: "G" },
      { label: "Me promener dehors, observer la nature", value: "H" },
    ],
  },
  {
    question: "Quand je suis libre, j’aime surtout…",
    options: [
      {
        label: "Faire des expériences, résoudre des casse-têtes",
        value: "A",
      },
      { label: "Lire, écrire, parler, écouter des histoires", value: "B" },
      { label: "Dessiner, bricoler, imaginer des espaces", value: "C" },
      { label: "Bouger, danser, jouer avec mon corps", value: "D" },
      {
        label: "Écouter de la musique, chanter, jouer d’un instrument",
        value: "E",
      },
      { label: "Être avec les autres, discuter, aider", value: "F" },
      { label: "Être seul·e pour réfléchir ou rêver", value: "G" },
      { label: "Me promener dehors, observer la nature", value: "H" },
    ],
  },
  {
    question: "Quand je suis libre, j’aime surtout…",
    options: [
      {
        label: "Faire des expériences, résoudre des casse-têtes",
        value: "A",
      },
      { label: "Lire, écrire, parler, écouter des histoires", value: "B" },
      { label: "Dessiner, bricoler, imaginer des espaces", value: "C" },
      { label: "Bouger, danser, jouer avec mon corps", value: "D" },
      {
        label: "Écouter de la musique, chanter, jouer d’un instrument",
        value: "E",
      },
      { label: "Être avec les autres, discuter, aider", value: "F" },
      { label: "Être seul·e pour réfléchir ou rêver", value: "G" },
      { label: "Me promener dehors, observer la nature", value: "H" },
    ],
  },
];

function QuestionCard({
  id,
  question,
  options,
  toggleChoice,
  choices,
  hasError,
}: {
  id: number;
  question: string;
  options: { label: string; value: IntelligenceCode }[];
  toggleChoice: (value: IntelligenceCode, checked: boolean) => void;
  choices?: Record<IntelligenceCode, boolean | undefined>;
  hasError?: boolean;
}) {
  const rootId = `opt-${id}`;
  return (
    <div className="flex m-auto basis-full">
      <div className="items-center justify-center">
        <div>
          <h2 className="mb-8 text-xl">{question}</h2>
        </div>
        <div>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-4">
              <Checkbox
                value={option.value}
                id={`${rootId}-${option.value}`}
                checked={choices?.[option.value]}
                onCheckedChange={(checked) => {
                  toggleChoice(option.value, checked === true);
                }}
              />
              <Label htmlFor={`${rootId}-${option.value}`}>
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        <p
          className={`mt-4 text-sm text-muted-foreground text-center ${
            hasError ? "text-red-500" : ""
          }`}
        >
          Choisissez une à trois réponses
        </p>
      </div>
    </div>
  );
}

export default function Survey() {
  const canScrollNext = useRef(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { setAnswer, answers } = useSurvey();

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.canScrollNext = () => canScrollNext.current;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const questionsCount = count - 1; // last slide is the end screen
  const showProgress = current <= questionsCount;
  // const showProgress = false;
  const currentQuestionSelectedAnswer = selectedChoicesCount(
    answers[current - 1]
  );
  const currentQuestionAnswered =
    currentQuestionSelectedAnswer > 0 && currentQuestionSelectedAnswer <= 3;
  const hasError = currentQuestionSelectedAnswer > 3;

  useEffect(() => {
    if (currentQuestionAnswered) {
      canScrollNext.current = true;
    } else {
      canScrollNext.current = false;
    }
  }, [currentQuestionAnswered]);

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{ watchDrag: false }} // disable drag to force user to answer
        preventNext={!currentQuestionAnswered} // disable next if current question not answered
      >
        {showProgress && (
          <div className="w-full mb-4">
            <Progress value={(current / questionsCount) * 100} />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>
                question {current} / {questionsCount}
              </span>
            </div>
          </div>
        )}
        <CarouselContent className="m-0">
          {survey.map((item, index) => (
            <CarouselItem key={index} className="p-0">
              <div className="w-full">
                <QuestionCard
                  id={index}
                  question={item.question}
                  options={item.options}
                  toggleChoice={(code: IntelligenceCode, value: boolean) =>
                    setAnswer(index, code, value)
                  }
                  choices={answers[index]}
                  hasError={hasError}
                />
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className="p-0">
            <div className="flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="text-xl mb-4">
                Vous avez terminé le questionnaire !
              </div>
              <Link href="/result">
                <Button className="mt-4">Voir mes résultats</Button>
              </Link>
            </div>
          </CarouselItem>
        </CarouselContent>
        {showProgress && (
          <div className="w-full">
            <div className="flex justify-between mt-4 mb-2">
              <Button
                variant="secondary"
                disabled={current === 1}
                onClick={() => api?.scrollPrev()}
              >
                Précédent
              </Button>
              <Button
                variant="default"
                disabled={!currentQuestionAnswered}
                onClick={() => api?.scrollNext()}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
      </Carousel>
    </div>
  );
}
