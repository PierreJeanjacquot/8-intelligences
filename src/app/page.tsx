import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <Link href="/survey">
          <Button>Decouvre tes intelligences</Button>
        </Link>
      </div>
      <div>Avec</div>
    </div>
  );
}
