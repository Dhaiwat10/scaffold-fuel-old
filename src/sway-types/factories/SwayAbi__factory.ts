/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.55.0
  Forc version: 0.44.0
  Fuel-Core version: 0.20.4
*/

import { Interface, Contract, ContractFactory } from "fuels";
import type { Provider, Account, AbstractAddress, BytesLike, DeployContractOptions } from "fuels";
import type { SwayAbi, SwayAbiInterface } from "../SwayAbi";

const _abi = {
  "types": [
    {
      "typeId": 0,
      "type": "bool",
      "components": null,
      "typeParameters": null
    }
  ],
  "functions": [
    {
      "inputs": [],
      "name": "test_function",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": null
    }
  ],
  "loggedTypes": [],
  "messagesTypes": [],
  "configurables": []
}

export class SwayAbi__factory {
  static readonly abi = _abi
  static createInterface(): SwayAbiInterface {
    return new Interface(_abi) as unknown as SwayAbiInterface
  }
  static connect(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider
  ): SwayAbi {
    return new Contract(id, _abi, accountOrProvider) as unknown as SwayAbi
  }
  static async deployContract(
    bytecode: BytesLike,
    wallet: Account,
    options: DeployContractOptions = {}
  ): Promise<SwayAbi> {
    const factory = new ContractFactory(bytecode, _abi, wallet);
    const contract = await factory.deployContract(options);
    return contract as unknown as SwayAbi;
  }
}