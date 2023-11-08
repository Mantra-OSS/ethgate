import { AppBreadcrumbs } from '@/app/client/breadcrumbs';
import { Container, Typography } from '@mui/material';
import Image from 'next/image';

import EthgateLogo from '../EthgateLogo';
import ExplorerLayout from '../ExplorerLayout';

export default function AboutPage() {
  fetch('/image').then((res) => {
    console.log(res);
  });
  return (
    <ExplorerLayout nav={<AppBreadcrumbs />}>
      <Container maxWidth="xl">
        <div>
          <div>
            <Typography variant="h3" padding={1} textAlign="center">
              {' '}
              About ETHgate{' '}
            </Typography>
          </div>
          <div>
            <EthgateLogo width={100} height={100} color="red" isLoading />
          </div>
          <div>
            <Typography variant="h5" padding={1} textAlign="center">
              {' '}
              ETHgate is your one-stop block explorer for everything Ethereum, designed to make
              complex blockchain data easy to access and understand. We take the complexity out of
              exploring different blockchains by offering a unified platform that is intuitive to
              use.{' '}
            </Typography>
          </div>
          <div>
            <Typography variant="h5" padding={1} textAlign="center">
              {' '}
              Our core aim is to democratize data access across EVM-compatible networks. Owing to
              its flexible and modular nature, ETHgate works simply and seamlessly: no servers, no
              hassle, just straight-up data at your fingertips.{' '}
            </Typography>{' '}
          </div>
          <div>
            <Typography variant="h5" padding={1} textAlign="center">
              {' '}
              Ethgate was born out of our commitment to give users a straightforward tool for diving
              into blockchain data. Whether you are a newcomer or a seasoned expert, Ethgate puts
              the power of blockchain exploration right in your hands, all with just a few clicks.{' '}
            </Typography>
          </div>
          <div>
            <Image src="/qr" width={128} height={128} alt="QR code for ethgate.io" />
            {/* <Image src="/image" width={1200} height={630} alt="ethgate.io" /> */}
          </div>
        </div>
      </Container>
    </ExplorerLayout>
  );
}
