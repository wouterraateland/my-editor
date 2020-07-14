import useLocallyStoredState from "./useLocallyStoredState";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const useColorMode = () =>
  useLocallyStoredState({
    key: "color-mode",
    initialValue: prefersDark ? "dark" : "light",
  });

export default useColorMode;
