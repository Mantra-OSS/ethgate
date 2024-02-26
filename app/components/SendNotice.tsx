import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { namehash } from 'viem';

import { publicClient, walletClient } from '../helpers/clients';
import ensResolverABI from '../helpers/ensResolverABI.json';
import type { Profile } from '../helpers/profile';

export default function SendNotice({ profile }: { profile: Profile | null }) {
  const [notice, setNotice] = useState<string>('');

  async function sendButton() {
    if (notice && profile) {
      const resolverAddress = await profile.getResolverAddress();
      const userNamehash = namehash(profile.name as string);

      const { request } = await publicClient.simulateContract({
        account: profile.address,
        address: resolverAddress,
        abi: ensResolverABI,
        functionName: 'setText',
        args: [userNamehash, 'notice', notice],
      });

      const tx = await walletClient.writeContract(request);
      console.log(tx);
      const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log(receipt);
    }
  }
  return (
    <>
      <TextField
        id="standard-multiline-static"
        multiline
        rows={4}
        placeholder="Draw something here..."
        variant="filled"
        onChange={(e) => setNotice(e.target.value)}
        value={notice}
        fullWidth
      />
      <Button variant="text" onClick={sendButton} fullWidth>
        Send Notice
      </Button>
    </>
  );
}
