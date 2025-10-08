import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-full min-h-[60vh]">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Link href="/questionnaire">
            <Button>Decouvre tes intelligences</Button>
          </Link>
        </div>
      </div>
      <div className="mb-4">Avec</div>
    </div>
  );
}
