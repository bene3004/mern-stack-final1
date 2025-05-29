import { createContext, useContext, useEffect, useState } from "react";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";

const THEME_STORAGE_KEY = "chakra-ui-color-mode";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

const ThemeContext = createContext();

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

export const useTheme = () => useContext(ThemeContext);