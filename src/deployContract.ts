import { Wallet } from 'fuels';
import { SwayAbi__factory } from './sway-types';
import bytecode from './sway-types/SwayAbi.hex';
import storageSlots from './sway/out/debug/sway-storage_slots.json';

export const deployContract = async () => {
  console.log({
    bytecode,
  });
  const wallet = Wallet.fromPrivateKey('0x01');
  const contract = await SwayAbi__factory.deployContract(bytecode, wallet, {
    storageSlots,
  });
  console.log({
    contract,
  });
};
