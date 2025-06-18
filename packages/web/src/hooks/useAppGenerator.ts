import { useState } from "react";

interface AppGeneratorData {
  name: string;
  url: string;
  icon?: string;
}

export const useAppGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateApp = async (data: AppGeneratorData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la génération de l'application"
        );
      }

      // Récupérer le blob du fichier
      const blob = await response.blob();

      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.name}.dmg`;
      document.body.appendChild(a);
      a.click();

      // Nettoyer
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateApp,
    isLoading,
    error,
  };
};
