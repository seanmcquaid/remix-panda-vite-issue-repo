import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import config from "./config";
import i18next from "i18next";
import { getInitialNamespaces } from "remix-i18next";
import Backend from "i18next-http-backend";

const i18n = async () => i18next
.use(initReactI18next) // Tell i18next to use the react-i18next plugin
.use(LanguageDetector) // Setup a client-side language detector
.use(Backend) // Setup your backend
.init({
  ...config, // spread the configuration
  // This function detects the namespaces your routes rendered while SSR use
  ns: getInitialNamespaces(),
  backend: { loadPath: "./locales/{{lng}}.ts" },
  detection: {
    // Here only enable htmlTag detection, we'll detect the language only
    // server-side with remix-i18next, by using the `<html lang>` attribute
    // we can communicate to the client the language detected server-side
    order: ["htmlTag"],
    // Because we only use htmlTag, there's no reason to cache the language
    // on the browser, so we disable it
    caches: [],
  },
})

export default i18n;
