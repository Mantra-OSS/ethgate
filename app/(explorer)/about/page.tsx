'use client';
import { useSolver } from '@/app/client/backend';
import { AppBreadcrumbs } from '@/app/client/breadcrumbs';
import { useNode } from '@/app/helpers/hooks';
import type { Block, Chain, Log, Transaction } from '@/lib-solver';
import type { Chain as MantraOSSChain } from '@mantra-oss/chains';
import { chains } from '@mantra-oss/chains';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Paper,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import EthgateLogo from '../EthgateLogo';
import ExplorerLayout from '../ExplorerLayout';

export default function AboutPage() {
  const chainsArray = Object.values(chains);
  /*   const solver = useSolver();
  const node = useNode<Chain>('Chain:1');
  console.log(node);
  const edgeType = solver.solver.graph.getEdgeType(node.type);
  console.log(edgeType); */
  return (
    <ExplorerLayout nav={<AppBreadcrumbs />}>
      <AboutSection title="What Is EthGate.io?">
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Box>
            <EthgateLogo width={300} height={300} />
          </Box>
          <Typography variant="body1" padding={1} textAlign="center">
            ethgate.io is your one-stop multichain block explorer. Flexible and modular in nature,
            ethgate.io works simply and seamlessly: no servers, no hassle, just straight-up data at
            your fingertips.
          </Typography>
        </Stack>
      </AboutSection>
      <AboutSection title="We Support Multiple Chains">
        <Typography variant="body1" padding={1} textAlign="center">
          ethgate.io supports multiple blockchains, including Ethereum, Polygon, Binance Smart
          Chain, and more. We are constantly adding support for more chains, so stay tuned!
        </Typography>
        <Container maxWidth="sm">
          <Stack direction="row" justifyContent="space-between">
            {chainsArray.map((chain: MantraOSSChain) => {
              return (
                <Avatar
                  key={chain.chainId}
                  alt={chain.meta.name}
                  src={`/statics/${chain.chainId}.svg`}
                >
                  {chain.meta.name
                    .split(' ')
                    .map((word: string) => word[0])
                    .join('')}
                </Avatar>
              );
            })}
          </Stack>
        </Container>
      </AboutSection>
      <AboutSection title="Realtime">
        <Typography variant="body1" padding={1} textAlign="center">
          ethgate.io updates in realtime, so you can always stay up to date with the latest
          transactions and blocks.
        </Typography>
        <RealtimeSection />
      </AboutSection>
      <AboutSection title="Responsive">
        <Typography variant="body1" padding={1} textAlign="center">
          ethgate.io is responsive, so you can use it on any device, from your phone to your
          desktop.
        </Typography>
      </AboutSection>
      <AboutSection title="Private/Serverless">
        <Typography variant="body1" padding={1} textAlign="center">
          ethgate.io is private and serverless, so you can use it without worrying about your data
          being tracked or sold.
        </Typography>
      </AboutSection>
      <AboutSection title="Extensible">
        <Typography variant="body1" padding={1} textAlign="center">
          ethgate.io is extensible, so you can add your own custom modules and features.
        </Typography>
      </AboutSection>
      <AboutSection title="Contact us">
        <Typography variant="body1" padding={1} textAlign="center">
          You can contact us on Twitter, GitHub, or Telegram. You can also fill out the form on our
          website.
        </Typography>

        <Box component="form" noValidate autoComplete="off" margin={2}>
          <Stack direction="column" spacing={2}>
            <TextField id="name" label="Name" variant="outlined" fullWidth />
            <TextField id="mail" label="Mail" variant="outlined" fullWidth />
            <TextField
              id="message"
              label="Message"
              multiline
              rows={4}
              placeholder="Your Message..."
              fullWidth
            />
            <Button variant="outlined" color="primary" fullWidth>
              Submit
            </Button>
          </Stack>
        </Box>

        <Image src="/qr" width={128} height={128} alt="QR code for ethgate.io" />
      </AboutSection>
    </ExplorerLayout>
  );
}

function AboutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: '1rem',
      }}
    >
      <Paper>
        <Typography variant="h3" fontWeight={700} padding={1} textAlign="center">
          {title}
        </Typography>
        <Divider />
        {children}
      </Paper>
    </Container>
  );
}

function RealtimeSection() {
  const [expanded, setExpanded] = useState<string | false>('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionList = [
    {
      tag: 'chains-infinite-list',
      title: 'Chains Infinite List',
      subTitle: 'Lists the subchains of the specified chain.',
      description: 'This is the description for the chains infinite list.',
      children: <Paper variant="elevation">Chains Infinite List</Paper>,
    },
    {
      tag: 'blocks-infinite-list',
      title: 'Blocks Infinite List',
      subTitle: 'Lists the blocks of the specified chain.',
      description: 'This is the description for the blocks infinite list.',
      children: <Paper variant="elevation">Blocks Infinite List</Paper>,
    },
    {
      tag: 'transactions-infinite-list',
      title: 'Transactions Infinite List',
      subTitle: 'Lists the transactions of the specified block.',
      description: 'This is the description for the transactions infinite list.',
      children: <Paper variant="elevation">Transactions Infinite List</Paper>,
    },
    {
      tag: 'logs-infinite-list',
      title: 'Logs Infinite List',
      subTitle: 'Lists the logs of the specified block or transactions.',
      description: 'This is the description for the logs infinite list.',
      children: <Paper variant="elevation">Logs Infinite List</Paper>,
    },
  ];

  return (
    <Paper
      style={{
        marginLeft: '2rem',
        marginRight: '2rem',
      }}
    >
      {accordionList.map((accordion) => {
        return (
          <AccordionSection
            key={accordion.tag}
            expanded={expanded}
            handleChange={handleChange}
            tag={accordion.tag}
            title={accordion.title}
            subTitle={accordion.subTitle}
            description={accordion.description}
          >
            {accordion.children}
          </AccordionSection>
        );
      })}
    </Paper>
  );
}

function AccordionSection({
  expanded,
  handleChange,
  tag,
  title,
  subTitle,
  description,
  children,
}: {
  expanded: string | false;
  handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  tag: string;
  title: string;
  subTitle: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion expanded={expanded === tag} onChange={handleChange(tag)} variant="outlined">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${tag}-content`}
        id={`${tag}-header`}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{title}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{subTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Typography flex={1}>{description}</Typography>
          <Box flex={1}>{children}</Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
