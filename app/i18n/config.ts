import { InitOptions } from "i18next";
import locales from "./locales";

export default {
  debug: true,
  fallbackLng: "en-US",
  supportedLngs: ["en-US"],
  load: "currentOnly",
  keySeparator: ".",
  saveMissing: true,
  resources: locales,
  missingKeyHandler: (lng, ns, key, fallbackValue) => {
    console.warn("Missing Translation Key", lng, ns, key, fallbackValue);
  },
  missingInterpolationHandler: (text, value) => {
    console.warn("Missing Interpolation", text, value);
  },
  react: { useSuspense: false },
} satisfies InitOptions;
