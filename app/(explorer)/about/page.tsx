import Image from 'next/image';

export default function AboutPage() {
  return (
    <div>
      About ethgate.io
      <Image src="/qr" width={128} height={128} alt="QR code for ethgate.io" />
    </div>
  );
}
