import { AppBreadcrumbs } from '@/app/client/breadcrumbs';
import { getSolver } from '@/app/server/backend';
import type { ThemeOptions } from '@mui/material';
import { notFound } from 'next/navigation';

import type { SolverNode } from '../../../../solver/graph';
import ExplorerLayout from '../../ExplorerLayout';

export type Params = { path: string[] };
export type Props = { params: Params; searchParams: object };

// export async function generateStaticParams(): Promise<Params[]> {
//   return Object.values(chains).flatMap((chain) => [
//     { path: [chain.chainId] },
//     { path: [chain.meta.slug] },
//   ]);
// }

const createNodeThemeOptions = (node: SolverNode): ThemeOptions => {
  switch (node.meta.chainId) {
    case 'Chain:1': {
      return {
        palette: {
          primary: {
            main: '#cec0ce',
          },
          background: {
            paper: '#201320',
            default: '#9f939f',
          },
        },
      };
    }
    case 'Chain:10': {
      return {
        palette: {
          primary: {
            light: '#ff364c',
            main: '#ff0420',
            dark: '#b20216',
          },
          background: {
            default: '#87787a',
            paper: '#371f22',
          },
        },
      };
    }
    case 'Chain:324': {
      return {
        palette: {
          primary: {
            main: '#1e69ff',
          },
          background: {
            default: '#242d40',
            paper: '#0e1118',
          },
        },
      };
    }
    // https://github.com/base-org/brand-kit
    case 'Chain:8453': {
      return {
        palette: {
          primary: {
            main: '#bfbfbf',
          },
          background: {
            paper: '#121212',
            default: '#303030',
          },
        },
      };
    }
    case 'Chain:42161': {
      return {
        palette: {
          primary: {
            main: '#1e69ff',
          },
          background: {
            default: '#242d40',
            paper: '#0e1118',
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
            paper: '#1a0c00',
            default: '#ffc999',
          },
        },
      };
    }
    case 'Chain:534352': {
      return {
        palette: {
          primary: {
            light: '#d0a36d',
            main: '#c58d49',
            dark: '#896233',
            contrastText: '#1d1710',
          },
          background: {
            default: '#544e46',
            paper: '#1d1710',
          },
        },
      };
    }
    default: {
      return {};
    }
  }
};

export default async function Layout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const solver = await getSolver();
  const resolved = await solver.solver.resolvePath(['chains', ...params.path]);
  if (!resolved) notFound();
  switch (resolved[0]) {
    case 'node': {
      const [, node] = resolved;
      const themeOptions = createNodeThemeOptions(node);
      return <ExplorerLayout themeOptions={themeOptions}>{children}</ExplorerLayout>;
    }
    case 'connection': {
      const [, tail, edgeType] = resolved;
      const themeOptions = createNodeThemeOptions(tail);
      return <ExplorerLayout themeOptions={themeOptions}>{children}</ExplorerLayout>;
    }
  }
}
