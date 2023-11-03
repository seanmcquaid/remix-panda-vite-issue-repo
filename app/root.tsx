import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./i18n";
import ReduxProvider from "./store/ReduxProvider";
import { ThemeProvider } from "styled-components";

export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <ThemeProvider theme={{
          colors: {
            primary: "#ff0000",
            secondary: "#00ff00",
            tertiary: "#0000ff",
          },
        }}>
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
