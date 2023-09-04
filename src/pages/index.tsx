import abi from '@/sway/out/debug/sway-abi.json';
import { getFunctionsFromAbi } from '@/utils';
import { JsonAbi } from 'fuels';

const onFunctionSendClick = (
  func: ReturnType<typeof getFunctionsFromAbi>[0]
) => {
  console.log(func);
};

const FunctionCard = ({
  func,
}: {
  func: ReturnType<typeof getFunctionsFromAbi>[0];
}) => {
  return (
    <div className='flex flex-col items-center justify-center w-72 p-4 m-4 border-2 border-gray-300 rounded-md'>
      <h1 className='text-xl font-bold'>{func.name}</h1>
      <hr />
      <span>Inputs:</span>
      {func.inputs.map((input) => {
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
            />
            <button
              className='btn btn-primary'
              onClick={() => onFunctionSendClick(func)}
            >
              Send
            </button>
          </div>
        );
      })}
      <hr />
      <span>Output:</span>
      <div className='flex flex-col items-center justify-center w-full p-4 m-4 border-2 border-gray-300 rounded-md'>
        <h1 className='text-xl font-bold'>{func.output.type}</h1>
      </div>
    </div>
  );
};

const ContractCard = ({
  contractId,
  abi,
}: {
  contractId: string;
  abi: JsonAbi;
}) => {
  return (
    <div className='flex flex-col items-center justify-center p-4 m-4 border-2 border-gray-300 rounded-md'>
      <h1 className='text-xl font-bold'>{contractId}</h1>
      <hr />
      <span>Functions:</span>
      {/* show all the fn cards */}
      {getFunctionsFromAbi(abi).map((func) => {
        return <FunctionCard key={func.name} func={func} />;
      })}
    </div>
  );
};

export default function Home() {
  console.log(getFunctionsFromAbi(abi));

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-4xl font-bold text-center'>Scaffold Fuel</h1>
      <ContractCard contractId='0x1234' abi={abi} />
    </main>
  );
}
