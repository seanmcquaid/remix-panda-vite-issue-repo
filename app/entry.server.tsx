import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { createInstance } from "i18next";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import i18next from "./i18n/i18n.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import config from "./i18n/config"; // your i18n configuration file
import { resolve } from "node:path";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  (globalThis as any).Request = request.constructor;

  if(request.url.includes('.ca')){
    request.headers.set('accept-language', 'en-CA')
  }

  const instance = createInstance();
  const lng = await i18next.getLocale(request);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...config, // spread the configuration
      lng, // The locale we detected above
      backend: { loadPath: resolve("./app/locales/{{lng}}.ts") },
    });

  const sheet = new ServerStyleSheet();

  let markup = renderToString(
    sheet.collectStyles(
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>
    )
  );

  const styles = sheet.getStyleTags();

  markup = markup.replace("__STYLES__", styles);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
