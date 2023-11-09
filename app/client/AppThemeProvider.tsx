'use client';
import type { ThemeOptions } from '@mui/material';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useMemo } from 'react';

import { createBaseThemeOptions } from '../components/theme';

const baseTheme = createTheme(createBaseThemeOptions());

export default function AppThemeProvider({
  themeOptions,
  children,
}: {
  themeOptions?: ThemeOptions;
  children: React.ReactNode;
}) {
  const customTheme = useMemo(
    () => themeOptions && createTheme(baseTheme, themeOptions),
    [themeOptions],
  );
  return (
    <ThemeProvider theme={customTheme ?? baseTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
