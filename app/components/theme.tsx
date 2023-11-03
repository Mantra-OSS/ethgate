import { createTheme } from '@mui/material';
import type { LinkProps } from '@mui/material/Link';
import { forwardRef } from 'react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import type { Route } from 'next';
// import type { LinkProps as RouterLinkProps } from 'react-router-dom';
// import { Link as RouterLink } from 'react-router-dom';

export const LinkWrapper = forwardRef<HTMLAnchorElement, NextLinkProps<Route>>(
  function LinkWrapper(props, ref) {
    const { ...other } = props;
    return <NextLink ref={ref} {...other} />;
  },
);

// https://zenoo.github.io/mui-theme-creator/
export const theme = createTheme({
  // https://mui.com/material-ui/customization/breakpoints/
  // https://m2.material.io/design/layout/responsive-layout-grid.html#breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  // https://mui.com/material-ui/customization/spacing/
  // https://m2.material.io/design/layout/understanding-layout.html#material-measurements
  spacing: 8,
  // https://mui.com/material-ui/customization/palette/
  // https://m2.material.io/design/color/the-color-system.html
  // https://m2.material.io/inline-tools/color/
  palette: {
    mode: 'dark',
    background: {
      default: '#382F3A',
      // paper: '#2A232C',
    },
    primary: {
      main: '#FFC107',
    },
  },
  // https://mui.com/material-ui/customization/typography/
  // https://m2.material.io/design/typography/the-type-system.html
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    body1: {
      fontSize: '0.8rem',
    },
    body2: {
      fontSize: '0.7rem',
    },
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.75rem',
    },
    h3: {
      fontSize: '1.50rem',
    },
    h4: {
      fontSize: '1.25rem',
    },
    h5: {
      fontSize: '1rem',
    },
    h6: {
      fontSize: '0.9rem',
    },
  },
  // https://mui.com/material-ui/customization/theme-components/
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkWrapper,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkWrapper,
      },
    },
  },
});
