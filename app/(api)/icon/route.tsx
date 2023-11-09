import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import EthgateLogo from '../../(explorer)/EthgateLogo';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const width = searchParams.get('width') ? parseInt(searchParams.get('width') as string) : 300;
  const height = searchParams.get('height') ? parseInt(searchParams.get('height') as string) : 300;
  return new ImageResponse(
    (
      <EthgateLogo
        width={width}
        height={height}
        color={searchParams.get('color') ? `#${searchParams.get('color')}` : '#FFC107'}
      />
    ),
    {
      width: height,
      height: height,
    },
  );
}
