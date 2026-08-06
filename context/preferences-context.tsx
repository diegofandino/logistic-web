"use client"
import { createContext, useContext, useEffect, useState } from "react";

import { locale, type Copy, type Language } from "@/lib/locale";

const LANGUAGE_STORAGE_KEY = "language";

interface Preferences {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    language: Language;
    setLanguage: (language: Language) => void;
    toggleLanguage: () => void;
    t: Copy;
}

const PreferencesContext = createContext<Preferences | null>(null);

export const PreferencesProvider = ({ children }: { children: React.ReactNode }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const [language, setLanguage] = useState<Language>("es");

    useEffect(() => {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored === "en" || stored === "es") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLanguage(stored);
        }
    }, []);


    const toggleLanguage = () => {
        const newLang = language === "en" ? "es" : "en";
        setLanguage(newLang);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang)
    };

    const value: Preferences = {
        isDarkMode,
        setIsDarkMode,
        language,
        setLanguage,
        toggleLanguage,
        t: locale[language],
    };

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = () => {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error("usePreferences must be used within a PreferencesProvider");
    }
    return context;
};
