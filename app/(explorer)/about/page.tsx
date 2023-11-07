import Image from 'next/image';

export default function AboutPage() {
  fetch('/image').then((res) => {
    console.log(res);
  });
  return (
    <div>
      About ethgate.io
      <Image src="/qr" width={128} height={128} alt="QR code for ethgate.io" />
      <Image src="/image" width={1200} height={630} alt="ethgate.io" />
    </div>
  );
}
