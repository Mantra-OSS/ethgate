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
      <Container maxWidth="sm">
        <Typography variant="h3" padding={1} textAlign="center">
          About ethgate.io
        </Typography>
        <Typography variant="body1" padding={1} textAlign="center">
          ethgate.io is your one-stop multichain block explorer. Flexible and modular in nature,
          ethgate.io works simply and seamlessly: no servers, no hassle, just straight-up data at
          your fingertips.
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h3" padding={1} textAlign="center">
          Multichain
        </Typography>
        <Typography variant="body1" padding={1} textAlign="center">
          chainlist here
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h3" padding={1} textAlign="center">
          Realtime
        </Typography>
        <Typography variant="body1" padding={1} textAlign="center">
          realtime stuff
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h3" padding={1} textAlign="center">
          Responsive
        </Typography>
        <Typography variant="body1" padding={1} textAlign="center">
          navigation stuff
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h3" padding={1} textAlign="center">
          Private/Serverless
        </Typography>
        <Typography variant="body1" padding={1} textAlign="center">
          navigation stuff
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h3" padding={1} textAlign="center">
          Extensible
        </Typography>
        <Typography variant="body1" padding={1} textAlign="center">
          twitter github
          <Image src="/qr" width={128} height={128} alt="QR code for ethgate.io" />
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Typography variant="h3" padding={1} textAlign="center">
          Contact us
        </Typography>
        <Typography variant="body1" padding={1} textAlign="center">
          twitter github form on the websitre telegram
          <Image src="/qr" width={128} height={128} alt="QR code for ethgate.io" />
          <EthgateLogo width={100} height={100} color="red" isLoading />
        </Typography>
      </Container>
    </ExplorerLayout>
  );
}
