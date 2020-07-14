import React, { useContext } from "react";
import { ColorModeContext } from "contexts";

import * as Icons from "components/Icons";

const ColorModeSwitch = () => {
  const [colorMode, setColorMode] = useContext(ColorModeContext);

  return (
    <button
      onClick={() =>
        setColorMode((colorMode) => (colorMode === "light" ? "dark" : "light"))
      }
    >
      <Icons.Eye state={colorMode === "light" ? "open" : null} />
    </button>
  );
};

export default ColorModeSwitch;
