import type { ThemeOptions } from '@mui/material';
import type { LinkProps } from '@mui/material/Link';
import type { Route } from 'next';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { forwardRef } from 'react';

import type { Chain } from '../../solver/graph';

export const createChainThemeOptions = (chain: Chain): ThemeOptions => {
  switch (chain.id) {
    case 'Chain:1': {
      return {
        palette: {
          primary: {
            main: '#c0c0c0',
          },
          background: {
            paper: '#080808',
            default: '#1f1f1f',
          },
        },
      };
    }
    case 'Chain:10': {
      return {
        palette: {
          primary: {
            main: '#ff0420',
          },
          background: {
            paper: '#080808',
            default: '#1f1f1f',
          },
        },
      };
    }
    case 'Chain:324': {
      return {
        palette: {
          primary: {
            main: '#9896f0',
          },
          background: {
            paper: '#080808',
            default: '#1f1f1f',
          },
        },
      };
    }
    // https://github.com/base-org/brand-kit
    case 'Chain:8453': {
      return {
        palette: {
          primary: {
            main: '#0051ff',
          },
          background: {
            paper: '#080808',
            default: '#1f1f1f',
          },
        },
      };
    }
    case 'Chain:42161': {
      return {
        palette: {
          primary: {
            main: '#4ca2ed',
          },
          background: {
            paper: '#080808',
            default: '#1f1f1f',
          },
          text: {
            primary: '#ffffff',
          },
        },
      };
    }
    case 'Chain:42170': {
      return {
        palette: {
          primary: {
            main: '#ff7701',
          },
          background: {
            paper: '#080808',
            default: '#1f1f1f',
          },
        },
      };
    }
    case 'Chain:534352': {
      return {
        palette: {
          primary: {
            main: '#e8d1b6',
          },
          background: {
            paper: '#080808',
            default: '#1f1f1f',
          },
        },
      };
    }
    default: {
      return {};
    }
  }
};

// https://zenoo.github.io/mui-theme-creator/
export const createBaseThemeOptions = (): ThemeOptions => ({
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
      paper: '#080808',
      default: '#1f1f1f',
    },
    primary: {
      main: '#cffbf6',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));',
        },
      },
    },
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

const LinkWrapper = forwardRef<HTMLAnchorElement, NextLinkProps<Route>>(
  function LinkWrapper(props, ref) {
    const { ...other } = props;
    return <NextLink ref={ref} {...other} />;
  },
);
