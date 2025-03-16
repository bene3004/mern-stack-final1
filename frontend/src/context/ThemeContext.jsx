import { createContext, useContext, useEffect, useState } from "react";
import { ChakraProvider, extendTheme, ColorModeScript, useColorMode } from "@chakra-ui/react";

// Lokale Speicherung für das Theme
const THEME_STORAGE_KEY = "chakra-ui-color-mode";

// Theme-Definition mit Chakra UI
const theme = extendTheme({
  config: {
    initialColorMode: "light",  // Standardmäßig "light"
    useSystemColorMode: false,  // Deaktiviert System-Einstellung
  },
});

// Erstelle ThemeContext
const ThemeContext = createContext();

// ThemeProvider Komponente
export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem(THEME_STORAGE_KEY) || "light");

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};

// Custom Hook für den ThemeContext
export const useTheme = () => useContext(ThemeContext);