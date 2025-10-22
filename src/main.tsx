import { createRoot } from "react-dom/client";
import { StrictMode, Suspense, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./style/theme.mui.ts";

import Spinner from "./components/spinner/Spinner.tsx";
import App from "./App.tsx";

import "./index.css";

async function enableMocking() {
  // TODO: Remove, quick test
  return;

  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const queryClient = new QueryClient();

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Spinner />}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <Fragment>
                <CssBaseline />
                <App />
              </Fragment>
            </QueryClientProvider>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </StrictMode>
  );
});
