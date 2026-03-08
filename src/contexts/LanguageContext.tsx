import { createContext, useContext, useState, ReactNode } from "react";
import en from "@/translations/en";
import pt from "@/translations/pt";

export type Language = "en" | "pt";

const translations: Record<Language, typeof en> = { en, pt: pt as unknown as typeof en } as const;

export type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem("the100s-language");
  if (stored === "en" || stored === "pt") return stored;
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("pt") ? "pt" : "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("the100s-language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
