// 'use client';
// import AboutView from './AboutView.mdx';

import { QRCodeSVG } from 'qrcode.react';

export default function AboutPage() {
  return (
    <div>
      About ethgate.io
      <QRCodeSVG value="https://twitter.com/ethgate_io" includeMargin />
    </div>
  );
  // return <AboutView />;
}
