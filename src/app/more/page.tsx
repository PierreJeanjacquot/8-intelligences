"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IntelligenceCode } from "@/types/types";
import { codeToIcon } from "@/utils/icons";
import { intelligenceCodeMap } from "@/utils/intelligences";
import { useQuestionnaire } from "@/store/store";
import { isQuestionnaireFinished } from "@/utils/utils";

export default function More() {
  const { answers } = useQuestionnaire();
  const isFinished = isQuestionnaireFinished(answers);

  return (
    <div className="">
      <div className="mb-8">
        <p className="mb-4">
          <a
            className="underline"
            href="https://fr.wikipedia.org/wiki/Howard_Gardner"
            target="_blank"
            rel="noreferrer"
          >
            Howard GARDNER
          </a>
          , psychologue américain, père de la{" "}
          <a
            className="underline"
            href="https://fr.wikipedia.org/wiki/Th%C3%A9orie_des_intelligences_multiples"
            target="_blank"
            rel="noreferrer"
          >
            théorie des intelligences multiples
          </a>
          , à catégorisé les intelligences humaines en 8 types distincts.
        </p>
        <p className="mb-4">
          Voici une courte description de chacune d&apos;entre elles :
        </p>
        <ul>
          {Object.entries(intelligenceCodeMap).map(
            ([code, { label, description }]) => (
              <li key={code}>
                <div className="font-bold flex items-center mb-2">
                  <div className="mr-2">
                    {codeToIcon(code as IntelligenceCode)}
                  </div>{" "}
                  {label}
                </div>
                <div className="pl-4 mb-4">{description}</div>
              </li>
            )
          )}
        </ul>
      </div>

      {isFinished ? (
        <div className="mb-8 text-center">
          <Link href="/result">
            <Button>Retour à mes résultats</Button>
          </Link>
        </div>
      ) : null}

      <div className="mb-8 text-center">
        <Link href="/">
          <Button variant={isFinished ? "secondary" : "default"}>
            Retour à l&apos;accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
