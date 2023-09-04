import { JsonAbi } from 'fuels';

export const getFunctionsFromAbi = (abi: JsonAbi) => {
  return replaceTypeIdsWithTypes(abi);
};

const getTypeFromTypeId = (typeId: number, abi: JsonAbi) => {
  return abi.types[typeId];
};

const replaceTypeIdsWithTypes = (abi: JsonAbi) => {
  return abi.functions.map((func) => {
    return {
      ...func,
      inputs: func.inputs.map((input) => {
        return {
          ...input,
          type: getTypeFromTypeId(input.type, abi),
        };
      }),
      output: getTypeFromTypeId(func.output.type, abi),
    };
  });
};
