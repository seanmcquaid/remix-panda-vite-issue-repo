import enCALocale from "./en-CA";
import enUSLocale from "./en-US";

const locales = {
  "en-US": { translation: enUSLocale },
  "en-CA": { translation: enCALocale },
} as const;

export default locales;
