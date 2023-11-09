// import { getSolver } from '@/app/server/backend';
// import { unixfs } from '@helia/unixfs';
// import { createHelia } from 'helia';
// import { CID } from 'multiformats/cid';
import { NextResponse } from 'next/server';

type Params = { cid: string; path?: string[] };
type Props = { params: Params; searchParams: object };

const { INFURA_IPFS_KEY, INFURA_IPFS_SECRET } = process.env;

export async function GET(request: Request, { params }: Props) {
  console.log('hey');
  // const auth = 'Basic ' + Buffer.from(INFURA_IPFS_KEY + ':' + INFURA_IPFS_SECRET).toString('base64');
  // const result = await fetch(`https://ipfs.infura.io:5001/ipfs/${params.cid}`, {
  //   method: 'POST',
  //   headers: {
  //     Authorization: auth,
  //   },
  // }).then((res) => res.blob());
  const result = await fetch(`https://ethgate-io.infura-ipfs.io/ipfs/${params.cid}`, {}).then(
    (res) => res.text(),
  );

  return NextResponse.json(result);
  // const helia = await createHelia();
  // const fs = unixfs(helia);
  // const cat = fs.cat(CID.parse('QmaxRoHpxZd8PqccAynherrMznMufG6sdmHZLihkECXmZv'));
  // const chunks = [];
  // for await (const chunk of cat) {
  //   chunks.push(chunk);
  // }
  // const buf = Buffer.concat(chunks);
  // return NextResponse.json(buf);
}
