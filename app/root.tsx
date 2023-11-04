import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./i18n/i18n.client";
import ReduxProvider from "./store/ReduxProvider";
import { ThemeProvider } from "styled-components";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import i18next from "./i18n/i18n.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";

export async function loader({ request }: LoaderFunctionArgs) {
  let locale = await i18next.getLocale(request);
  return json({ locale });
}

export default function App() {
  // Get the locale from the loader
  const { locale } = useLoaderData<typeof loader>();

  const { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <ThemeProvider
          theme={{
            colors: {
              primary: "#ff0000",
              secondary: "#00ff00",
              tertiary: "#0000ff",
            },
          }}
        >
          <ReduxProvider>
            <Outlet />
          </ReduxProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
