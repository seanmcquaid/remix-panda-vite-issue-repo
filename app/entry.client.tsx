import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "./i18n/i18n.client";
import i18next from "./i18n/i18n.client";
import { I18nextProvider } from "react-i18next";

startTransition(() => {
  hydrateRoot(
    document,
    <I18nextProvider i18n={i18next}>
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    </I18nextProvider>
  );
});
