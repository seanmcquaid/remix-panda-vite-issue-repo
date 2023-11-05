import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: { mode: "development" | "production" }) => {
  return defineConfig({
    plugins: [remix(), tsconfigPaths()],
    ssr: {
      noExternal:
        mode === "production"
          ? ["remix-i18next", "redux-persist", "@reduxjs/toolkit"]
          : ["remix-i18next"],
    },
  });
};
