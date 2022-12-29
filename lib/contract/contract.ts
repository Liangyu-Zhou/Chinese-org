import { Wallet, Contract } from 'ethers';
import ChineseAbi from '../contract/FSN-Chinese.json';
import { ethers } from 'ethers';
var Web3 = require('web3');

let chinese;
if (
  process.env.NEXT_PUBLIC_TEST_ACCOUNT_7001_PRIVATEKEY &&
  process.env.NEXT_PUBLIC_TEST_FRC759_CHINESE_ADDR
) {
  const provider = new Web3.providers.HttpProvider(
    'https://mainnet.fusionnetwork.io'
  );
  let web3Provider = new ethers.providers.Web3Provider(provider);
  const signer = new Wallet(
    process.env.NEXT_PUBLIC_TEST_ACCOUNT_7001_PRIVATEKEY,
    web3Provider
  );
  chinese = new Contract(
    process.env.NEXT_PUBLIC_TEST_FRC759_CHINESE_ADDR,
    ChineseAbi.abi,
    signer
  );
} else {
  throw new Error('Base account not found');
}

export const Chinese = chinese;
