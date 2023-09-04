import { deployContract } from '@/deployContract';
import abi from '@/sway/out/debug/sway-abi.json';
import { getFunctionsFromAbi } from '@/utils';
import { Address, BN, Contract, JsonAbi, Provider, Wallet } from 'fuels';
import { useEffect, useState } from 'react';

const onFunctionSendClick = async ({
  func,
  inputValues,
  contract,
}: {
  func: ReturnType<typeof getFunctionsFromAbi>[number];
  inputValues: any[];
  contract: Contract;
}) => {
  console.log({
    func,
    inputValues,
    contract,
  });
  const tx = await contract.functions[func.name](inputValues).call();
  console.log((tx.value as BN).toNumber());
};

const FunctionCard = ({
  func,
  contract,
}: {
  func: ReturnType<typeof getFunctionsFromAbi>[0];
  contract: Contract;
}) => {
  const [inputs, setInputs] = useState<any[]>(new Array(func.inputs.length));

  return (
    <div className='flex flex-col items-center justify-center w-72 p-4 m-4 border-2 border-gray-300 rounded-md'>
      <h1 className='text-xl font-bold'>{func.name}</h1>
      <hr />
      <span>Inputs:</span>
      {func.inputs.map((input, idx) => {
        return (
          <div
            key={input.type.typeId}
            className='flex flex-col items-center justify-center w-full p-4 m-4 border-2 border-gray-300 rounded-md'
          >
            <h1 className='text-xl font-bold'>{input.name}</h1>
            <h1 className='text-xl font-bold'>{input.type.type}</h1>
            <input
              type='text'
              className='input input-bordered'
              placeholder='Enter input here'
              onChange={(e) => {
                const newInputs = [...inputs];
                newInputs[idx] = e.target.value;
                setInputs(newInputs);
              }}
              value={inputs[idx]}
            />
          </div>
        );
      })}
      <hr />
      <span>Output:</span>
      <div className='flex flex-col items-center justify-center w-full p-4 m-4 border-2 border-gray-300 rounded-md'>
        <h1 className='text-xl font-bold'>{func.output.type}</h1>
      </div>

      <button
        className='btn btn-primary'
        onClick={() =>
          onFunctionSendClick({
            func,
            inputValues: inputs,
            contract,
          })
        }
      >
        Send
      </button>
    </div>
  );
};

const ContractCard = ({ contract }: { contract: Contract }) => {
  return (
    <div className='flex flex-col items-center justify-center p-4 m-4 border-2 border-gray-300 rounded-md'>
      <h1 className='text-xl font-bold'>{contract.id.toB256()}</h1>
      <hr />
      <span>Functions:</span>
      {/* show all the fn cards */}
      {getFunctionsFromAbi(contract.interface.jsonAbi).map((func) => {
        return <FunctionCard key={func.name} func={func} contract={contract} />;
      })}
    </div>
  );
};

export default function Home() {
  const [contract, setContract] = useState<Contract>();

  const contractId = new Address(
    'fuel1lf5ljwjwsyc4taxkvcjvzuqdxcqa647cjc8gs7pux908g920njuqz06u3f'
  ).toB256();

  useEffect(() => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = Wallet.fromPrivateKey('0x01');
    const contract = new Contract(contractId, abi, wallet);
    setContract(contract);
  }, [contractId]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-4xl font-bold text-center'>Scaffold Fuel</h1>

      <button className='btn btn-primary' onClick={deployContract}>
        Deploy Contract
      </button>

      {contract && <ContractCard contract={contract} />}
    </main>
  );
}
