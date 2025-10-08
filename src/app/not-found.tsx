"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Page non trouvée</h2>
        <p>Redirection vers la page d&apos;accueil...</p>
      </div>
    </div>
  );
}
