import { ImageResponse } from 'next/og';

import EthgateLogo from './(explorer)/EthgateLogo';

export const runtime = 'edge';

export const alt = 'ethgate.io | Ethereum & L2 explorer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#00052A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 30,
          color: 'white',
        }}
      >
        <EthgateLogo width={400} height={400} color="#FFC107" />
        <p>ethgate.io</p>
      </div>
    ),
    {
      ...size,
    },
  );
}
