import { Wallet } from 'fuels';
import { SwayAbi__factory } from './sway-types';
import bytecode from './sway-types/SwayAbi.hex';

export const deployContract = async () => {
  const wallet = Wallet.fromPrivateKey('0x01');
  const contract = await SwayAbi__factory.deployContract(bytecode, wallet);
  console.log({
    contract,
  });
};