"use client";

import { Button } from "@/components/ui/button";
import { useQuestionnaire } from "@/store/store";
import { codeToColor, codeToIcon } from "@/utils/icons";
import { getResults } from "@/utils/utils";
import { ResponsiveBar as BarChart } from "@nivo/bar";
import Link from "next/link";

export default function Result() {
  const { answers } = useQuestionnaire();
  const results = getResults(answers).map((r) => ({
    ...r,
    icon: codeToIcon(r.code),
  }));

  return (
    <div className="">
      <h2 className="text-xl font-bold text-center mb-8">Tes résultats</h2>

      <div className="mb-8">
        <h3 className="mb-4 font-bold">Intelligences principales :</h3>
        <ul>
          {results.slice(0, 3).map((result) => (
            <li key={result.code}>
              <div className="font-bold flex items-center mb-2">
                <div className="mr-2">{result.icon}</div> {result.label} (
                {(result.ratio * 100).toFixed(0)}%)
              </div>
              <div className="pl-4 mb-4">{result.description}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 font-bold">Toutes les intelligences :</h3>

        <div className="h-48">
          <BarChart
            data={results
              .reverse()
              .map(({ ratio, label, code, description }) => ({
                label,
                ratio: Math.round(ratio * 100),
                code,
                description,
              }))}
            keys={["ratio"]}
            indexBy="label"
            margin={{ top: 0, right: 0, bottom: 0, left: 150 }}
            layout="horizontal"
            colors={({ data }) => codeToColor(data.code)}
          />
        </div>
      </div>

      <div className="mb-8 text-center">
        <Link href="/more">
          <Button>En savoir plus sur les 8 intelligences</Button>
        </Link>
      </div>

      <div className="mb-8 text-center">
        <Link href="/questionnaire">
          <Button>Retour au questionnaire</Button>
        </Link>
      </div>
    </div>
  );
}
