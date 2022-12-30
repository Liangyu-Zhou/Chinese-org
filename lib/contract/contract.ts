import { Wallet } from 'ethers';
import { FSNChinese__factory } from '../contract/factories/FSNChinese__factory';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { FSNChinese } from './FSNChinese';

let chinese: FSNChinese;
if (
  process.env.NEXT_PUBLIC_TEST_ACCOUNT_7001_PRIVATEKEY &&
  process.env.NEXT_PUBLIC_TEST_FRC759_CHINESE_ADDR
) {
  // const provider = new Web3.providers.HttpProvider(
  //   'https://mainnet.fusionnetwork.io'
  // );
  const provider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.fusionnetwork.io'
  );
  const signer = new Wallet(
    process.env.NEXT_PUBLIC_TEST_ACCOUNT_7001_PRIVATEKEY,
    provider
  );

  chinese = FSNChinese__factory.connect(
    process.env.NEXT_PUBLIC_TEST_FRC759_CHINESE_ADDR,
    signer
  );
} else {
  throw new Error('Base account not found');
}
export const Chinese = chinese;
