import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./index.css";
import "./i18n";
import ReduxProvider from "./store/ReduxProvider";

export default function App() {
  return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <ReduxProvider>
            <Outlet />
            <ScrollRestoration />
            <LiveReload />
            <Scripts />
          </ReduxProvider>
        </body>
      </html>
  );
}
