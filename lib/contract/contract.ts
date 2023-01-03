import { Wallet } from 'ethers';
import { FSNChinese__factory } from '../contract/factories/FSNChinese__factory';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { FSNChinese } from './FSNChinese';
import abi from './FSN-Chinese.json';

let chineseWithSigner: FSNChinese;
let chineseConfig: {};
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

  chineseWithSigner = FSNChinese__factory.connect(
    process.env.NEXT_PUBLIC_TEST_FRC759_CHINESE_ADDR,
    signer
  );

  chineseConfig = {
    address: '0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30',
    abi
  };
} else {
  throw new Error('Base account not found');
}
export const ChineseWithSigner = chineseWithSigner;
export const ChineseConfig = chineseConfig;
