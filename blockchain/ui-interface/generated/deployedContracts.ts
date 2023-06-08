const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        Counter: {
          address: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
          abi: [
            { inputs: [], name: "increment", outputs: [], stateMutability: "nonpayable", type: "function" },
            {
              inputs: [],
              name: "number",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "newNumber", type: "uint256" }],
              name: "setNumber",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        Flipper: {
          address: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
          abi: [
            {
              inputs: [],
              name: "data",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "view",
              type: "function",
            },
            { inputs: [], name: "flip", outputs: [], stateMutability: "nonpayable", type: "function" },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
