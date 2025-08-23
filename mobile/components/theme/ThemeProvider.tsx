import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./theme";

const ThemeContext = createContext(lightTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
