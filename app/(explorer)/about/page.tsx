import Image from 'next/image';

import EthgateLogo from '../EthgateLogo';

export default function AboutPage() {
  fetch('/image').then((res) => {
    console.log(res);
  });
  return (
    <div>
      About ethgate.io
      <Image src="/qr" width={128} height={128} alt="QR code for ethgate.io" />
      {/* <Image src="/image" width={1200} height={630} alt="ethgate.io" /> */}
      <div>
        <EthgateLogo width={100} height={100} color="red" isLoading />
      </div>
    </div>
  );
}
