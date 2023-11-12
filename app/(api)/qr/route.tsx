import { ImageResponse } from 'next/og';
import { QRCodeSVG } from 'qrcode.react';

export const runtime = 'edge';

export async function GET() {
  const size = 200;
  return new ImageResponse(
    <QRCodeSVG value="https://twitter.com/ethgate_io" includeMargin size={size} />,
    {
      width: size,
      height: size,
    },
  );
}
