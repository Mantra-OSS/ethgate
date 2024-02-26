import { Alert, Avatar, Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { namehash } from 'viem';
import { useAccount } from 'wagmi';

import { publicClient, walletClient } from '../helpers/clients';
import { createMulticallData } from '../helpers/createMulticallData';
import ensResolverABI from '../helpers/ensResolverABI.json';
import type { KeysObject } from '../helpers/profile';
import { Profile } from '../helpers/profile';

export default function EditView() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [forms, setForms] = useState<KeysObject>({
    description: '',
    email: '',
    notice: '',
    location: '',
    url: '',
    'com.github': '',
    'com.linkedin': '',
    'com.twitter': '',
    'org.telegram': '',
  });
  const [message, setMessage] = useState<React.ReactNode>();

  function createMessage(type: string, error?: any): JSX.Element {
    switch (type) {
      case 'info':
        return <Alert severity="info">Pending wallet confirmation.</Alert>;
      case 'waiting':
        return <Alert severity="info">Waiting for transaction to be mined.</Alert>;
      case 'success':
        return <Alert severity="success">Transaction successful.</Alert>;
      case 'error':
        return <Alert severity="error">{error}</Alert>;
      default:
        return <></>;
    }
  }

  async function initializeProfile() {
    if (address) {
      const newProfile = new Profile(address);
      await newProfile.initialize();
      await newProfile.getAllTexts();
      setProfile(newProfile);
      if (newProfile.keys) {
        setForms(newProfile.keys);
      }
    }
  }

  async function saveButton() {
    if (profile && profile.keys) {
      const keys = Object.keys(profile.keys);
      const differentKeys = keys.filter((key) => {
        if (profile.keys) {
          return profile.keys[key as keyof KeysObject] !== forms[key as keyof KeysObject];
        }
      });
      if (differentKeys.length === 0) return;
      const resolverAddress = await profile.getResolverAddress();
      const userNamehash = namehash(profile.name as string);
      const multicallArgs = createMulticallData(
        ensResolverABI,
        'setText',
        userNamehash,
        differentKeys,
        differentKeys.map((key) => forms[key as keyof KeysObject]),
      );

      const { request } = await publicClient.simulateContract({
        account: profile.address,
        address: resolverAddress,
        abi: ensResolverABI,
        functionName: 'multicall',
        args: [multicallArgs],
      });
      setMessage(createMessage('info'));

      const tx = await walletClient.writeContract(request);
      setMessage(createMessage('waiting'));

      const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
      if (receipt.status === 'success') {
        setMessage(createMessage('success'));
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      } else {
        setMessage(createMessage('error', receipt));
      }
    }
  }

  useEffect(() => {
    initializeProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;
  if (!profile.keys) return <div>No keys</div>;

  return (
    <Paper>
      <Stack direction="column" justifyContent="center" padding={2} spacing={2}>
        <Typography variant="h5" textAlign="center">
          Edit
        </Typography>
        <Stack direction="row" justifyContent="center" gap={3}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 150, height: 150 }}
          >
            Upload
          </Avatar>
          <Stack direction="column" justifyContent="center" width="100%" gap={1}>
            <TextField
              id="filled-basic"
              label="Url"
              variant="outlined"
              value={forms.url ? forms.url : ''}
              onChange={(e) => setForms({ ...forms, url: e.target.value })}
              focused={profile.keys.url !== forms.url}
              fullWidth
            />
            <TextField
              id="filled-basic"
              label="Location"
              variant="outlined"
              value={forms.location ? forms.location : ''}
              onChange={(e) => setForms({ ...forms, location: e.target.value })}
              focused={profile.keys.location !== forms.location}
              fullWidth
            />
            <TextField
              id="filled-basic"
              label="Email"
              variant="outlined"
              value={forms.email ? forms.email : ''}
              onChange={(e) => setForms({ ...forms, email: e.target.value })}
              focused={profile.keys.email !== forms.email}
              fullWidth
            />
          </Stack>
        </Stack>
        <TextField
          id="filled-basic"
          label="Description"
          variant="outlined"
          value={forms.description ? forms.description : ''}
          onChange={(e) => setForms({ ...forms, description: e.target.value })}
          focused={profile.keys.description !== forms.description}
          fullWidth
        />
        <Divider />
        <Typography variant="h5" textAlign="center">
          Social
        </Typography>
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <TextField
            id="filled-basic"
            label="Github"
            variant="outlined"
            value={forms['com.github'] ? forms['com.github'] : ''}
            onChange={(e) => setForms({ ...forms, 'com.github': e.target.value })}
            focused={profile.keys['com.github'] !== forms['com.github']}
          />
          <TextField
            id="filled-basic"
            label="LinkedIn"
            variant="outlined"
            value={forms['com.linkedin'] ? forms['com.linkedin'] : ''}
            onChange={(e) => setForms({ ...forms, 'com.linkedin': e.target.value })}
            focused={profile.keys['com.linkedin'] !== forms['com.linkedin']}
          />
          <TextField
            id="filled-basic"
            label="Twitter"
            variant="outlined"
            value={forms['com.twitter'] ? forms['com.twitter'] : ''}
            onChange={(e) => setForms({ ...forms, 'com.twitter': e.target.value })}
            focused={profile.keys['com.twitter'] !== forms['com.twitter']}
          />
          <TextField
            id="filled-basic"
            label="Telegram"
            variant="outlined"
            value={forms['org.telegram'] ? forms['org.telegram'] : ''}
            onChange={(e) => setForms({ ...forms, 'org.telegram': e.target.value })}
            focused={profile.keys['org.telegram'] !== forms['org.telegram']}
          />
        </Stack>
        <Button variant="outlined" onClick={saveButton}>
          Save
        </Button>
      </Stack>
      {message}
    </Paper>
  );
}
