'use client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { createBaseThemeOptions } from '../components/theme';

const baseTheme = createTheme(createBaseThemeOptions());

export default function BaseThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
