import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'black',
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        Blah Blah Blahaaa
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
