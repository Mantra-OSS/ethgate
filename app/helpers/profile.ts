import type { Address, GetEnsNameReturnType } from 'viem';
import type { GetEnsAvatarReturnType, GetEnsTextReturnType } from 'viem/actions';
import { namehash, normalize } from 'viem/ens';

import { publicClient } from './clients';
import ensResolverABI from './ensResolverABI.json';

export const globalKeys = [
  'description',
  //'display',
  'email',
  //'keywords',
  //'mail',
  'notice',
  'location',
  //'phone',
  'url',
] as const;

export const serviceKeys = [
  'com.github',
  //'com.peepeth',
  'com.linkedin',
  'com.twitter',
  //'io.keybase',
  'org.telegram',
] as const;

export type GlobalKeys = (typeof globalKeys)[number];
export type ServiceKeys = (typeof serviceKeys)[number];

export type KeysObject = {
  [key in GlobalKeys | ServiceKeys]: string;
};

export class Profile {
  address: Address;
  name?: GetEnsNameReturnType;
  avatar?: GetEnsAvatarReturnType;
  keys?: KeysObject;

  constructor(address: Address) {
    this.address = address;
  }

  async initialize() {
    this.name = await this.getName();
    this.avatar = await this.getAvatar();
  }

  public async getName(): Promise<GetEnsNameReturnType> {
    const ensName = await publicClient.getEnsName({
      address: this.address,
    });
    return ensName;
  }

  public async getResolverAddress(): Promise<Address> {
    if (!this.name) {
      return '0x0';
    } else {
      const resolverAddress = await publicClient.getEnsResolver({
        name: normalize(this.name as string),
      });
      return resolverAddress;
    }
  }

  public async getAvatar(): Promise<GetEnsAvatarReturnType> {
    if (!this.name) {
      return null;
    } else {
      const ensAvatar = await publicClient.getEnsAvatar({
        name: this.name,
      });
      return ensAvatar;
    }
  }

  public async getText(key: GlobalKeys | ServiceKeys): Promise<GetEnsTextReturnType> {
    if (!this.name) {
      throw new Error('Name is not defined');
    }
    const ensText = await publicClient.getEnsText({
      name: normalize(this.name),
      key,
    });
    return ensText;
  }

  public async getAllTexts(): Promise<void> {
    const ensResolverAddress = await this.getResolverAddress();
    const ensNameNode = namehash(this.name as string);

    const keys = [...globalKeys, ...serviceKeys];

    const multicallArgs = keys.map((key) => {
      return {
        address: ensResolverAddress,
        abi: ensResolverABI,
        functionName: 'text',
        args: [ensNameNode, key],
      };
    });

    const [description, email, notice, location, url, github, linkedin, twitter, telegram] =
      await publicClient.multicall({
        contracts: [...multicallArgs],
      });

    this.keys = {
      description: description.result as string,
      email: email.result as string,
      notice: notice.result as string,
      location: location.result as string,
      url: url.result as string,
      'com.github': github.result as string,
      'com.linkedin': linkedin.result as string,
      'com.twitter': twitter.result as string,
      'org.telegram': telegram.result as string,
    };
  }
}
