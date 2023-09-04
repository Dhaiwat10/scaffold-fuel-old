/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.55.0
  Forc version: 0.44.0
  Fuel-Core version: 0.20.4
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

interface SwayAbiInterface extends Interface {
  functions: {
    get_count: FunctionFragment;
    increment_count: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'get_count', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'increment_count', values: [BigNumberish]): Uint8Array;

  decodeFunctionData(functionFragment: 'get_count', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'increment_count', data: BytesLike): DecodedValue;
}

export class SwayAbi extends Contract {
  interface: SwayAbiInterface;
  functions: {
    get_count: InvokeFunction<[], BN>;
    increment_count: InvokeFunction<[amount: BigNumberish], BN>;
  };
}
