import React, { useContext } from "react";
import { ColorModeContext } from "contexts";

import * as Icons from "components/Icons";

const ColorModeSwitch = () => {
  const [colorMode, setColorMode] = useContext(ColorModeContext);

  return (
    <button
      className="flex items-center rounded border-0 bg-glow"
      onClick={() =>
        setColorMode((colorMode) => (colorMode === "light" ? "dark" : "light"))
      }
    >
      <Icons.Eye
        strokeWidth={colorMode === "light" ? 3 : 5}
        state={colorMode === "light" ? "open" : null}
      />
    </button>
  );
};

export default ColorModeSwitch;
