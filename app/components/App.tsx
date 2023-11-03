"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { mapValues } from "lodash";
import { IntlProvider } from "react-intl";
import { RecoilRoot } from "recoil";

import tr from "../lang/tr.json";
import { ViewerProvider, useViewer } from "../viewer";

import { theme } from "./theme";

function AppIntlProvider({ children }: { children: React.ReactNode }) {
  const viewer = useViewer();

  const messages =
    viewer.locale === "tr"
      ? // TODO: Load lazily
        mapValues(tr, (value) => value.defaultMessage)
      : {};

  return (
    <IntlProvider locale={viewer.locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RecoilRoot>
        <ViewerProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <AppIntlProvider>{children}</AppIntlProvider>
          </ThemeProvider>
        </ViewerProvider>
      </RecoilRoot>
    </>
  );
}
