import React, { useEffect } from "react";
import { ColorModeContext } from "contexts";
import useColorMode from "hooks/useColorMode";

const ColorModeProvider = ({ children }) => {
  const value = useColorMode();

  useEffect(() => {
    document.body.classList.toggle("light", value[0] === "light");
    document.body.classList.toggle("dark", value[0] === "dark");
  }, [value]);

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
