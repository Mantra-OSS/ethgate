import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const width = searchParams.get('width') ? parseInt(searchParams.get('width') as string) : 300;
  const height = searchParams.get('height') ? parseInt(searchParams.get('height') as string) : 300;
  return new ImageResponse(
    (
      <div>
        <h1>Social Share Post</h1>
      </div>
    ),
    {
      width: width,
      height: height,
    },
  );
}
