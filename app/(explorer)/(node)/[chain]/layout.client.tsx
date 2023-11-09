'use client';
import { createBaseThemeOptions } from '@/app/components/theme';
import type { ThemeOptions } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import { useMemo } from 'react';

const baseTheme = createTheme(createBaseThemeOptions());

export default function ChainThemeProvider({
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
  return <ThemeProvider theme={customTheme ?? baseTheme}>{children}</ThemeProvider>;
}
