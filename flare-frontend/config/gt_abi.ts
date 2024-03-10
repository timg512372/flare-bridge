export const gt_abi =  [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "relayer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "coin",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "TokensBridged",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "coinContract",
        "outputs": [
          {
            "internalType": "contract IERC20Bridge",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "bytes32[]",
                "name": "merkleProof",
                "type": "bytes32[]"
              },
              {
                "components": [
                  {
                    "internalType": "bytes32",
                    "name": "attestationType",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "sourceId",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint64",
                    "name": "votingRound",
                    "type": "uint64"
                  },
                  {
                    "internalType": "uint64",
                    "name": "lowestUsedTimestamp",
                    "type": "uint64"
                  },
                  {
                    "components": [
                      {
                        "internalType": "bytes32",
                        "name": "transactionHash",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "uint16",
                        "name": "requiredConfirmations",
                        "type": "uint16"
                      },
                      {
                        "internalType": "bool",
                        "name": "provideInput",
                        "type": "bool"
                      },
                      {
                        "internalType": "bool",
                        "name": "listEvents",
                        "type": "bool"
                      },
                      {
                        "internalType": "uint32[]",
                        "name": "logIndices",
                        "type": "uint32[]"
                      }
                    ],
                    "internalType": "struct EVMTransaction.RequestBody",
                    "name": "requestBody",
                    "type": "tuple"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint64",
                        "name": "blockNumber",
                        "type": "uint64"
                      },
                      {
                        "internalType": "uint64",
                        "name": "timestamp",
                        "type": "uint64"
                      },
                      {
                        "internalType": "address",
                        "name": "sourceAddress",
                        "type": "address"
                      },
                      {
                        "internalType": "bool",
                        "name": "isDeployment",
                        "type": "bool"
                      },
                      {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                      },
                      {
                        "internalType": "bytes",
                        "name": "input",
                        "type": "bytes"
                      },
                      {
                        "internalType": "uint8",
                        "name": "status",
                        "type": "uint8"
                      },
                      {
                        "components": [
                          {
                            "internalType": "uint32",
                            "name": "logIndex",
                            "type": "uint32"
                          },
                          {
                            "internalType": "address",
                            "name": "emitterAddress",
                            "type": "address"
                          },
                          {
                            "internalType": "bytes32[]",
                            "name": "topics",
                            "type": "bytes32[]"
                          },
                          {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                          },
                          {
                            "internalType": "bool",
                            "name": "removed",
                            "type": "bool"
                          }
                        ],
                        "internalType": "struct EVMTransaction.Event[]",
                        "name": "events",
                        "type": "tuple[]"
                      }
                    ],
                    "internalType": "struct EVMTransaction.ResponseBody",
                    "name": "responseBody",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct EVMTransaction.Response",
                "name": "data",
                "type": "tuple"
              }
            ],
            "internalType": "struct EVMTransaction.Proof",
            "name": "transaction",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "tokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "isBurnProofValid",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "bytes32[]",
                "name": "merkleProof",
                "type": "bytes32[]"
              },
              {
                "components": [
                  {
                    "internalType": "bytes32",
                    "name": "attestationType",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "sourceId",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint64",
                    "name": "votingRound",
                    "type": "uint64"
                  },
                  {
                    "internalType": "uint64",
                    "name": "lowestUsedTimestamp",
                    "type": "uint64"
                  },
                  {
                    "components": [
                      {
                        "internalType": "bytes32",
                        "name": "transactionHash",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "uint16",
                        "name": "requiredConfirmations",
                        "type": "uint16"
                      },
                      {
                        "internalType": "bool",
                        "name": "provideInput",
                        "type": "bool"
                      },
                      {
                        "internalType": "bool",
                        "name": "listEvents",
                        "type": "bool"
                      },
                      {
                        "internalType": "uint32[]",
                        "name": "logIndices",
                        "type": "uint32[]"
                      }
                    ],
                    "internalType": "struct EVMTransaction.RequestBody",
                    "name": "requestBody",
                    "type": "tuple"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint64",
                        "name": "blockNumber",
                        "type": "uint64"
                      },
                      {
                        "internalType": "uint64",
                        "name": "timestamp",
                        "type": "uint64"
                      },
                      {
                        "internalType": "address",
                        "name": "sourceAddress",
                        "type": "address"
                      },
                      {
                        "internalType": "bool",
                        "name": "isDeployment",
                        "type": "bool"
                      },
                      {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                      },
                      {
                        "internalType": "bytes",
                        "name": "input",
                        "type": "bytes"
                      },
                      {
                        "internalType": "uint8",
                        "name": "status",
                        "type": "uint8"
                      },
                      {
                        "components": [
                          {
                            "internalType": "uint32",
                            "name": "logIndex",
                            "type": "uint32"
                          },
                          {
                            "internalType": "address",
                            "name": "emitterAddress",
                            "type": "address"
                          },
                          {
                            "internalType": "bytes32[]",
                            "name": "topics",
                            "type": "bytes32[]"
                          },
                          {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                          },
                          {
                            "internalType": "bool",
                            "name": "removed",
                            "type": "bool"
                          }
                        ],
                        "internalType": "struct EVMTransaction.Event[]",
                        "name": "events",
                        "type": "tuple[]"
                      }
                    ],
                    "internalType": "struct EVMTransaction.ResponseBody",
                    "name": "responseBody",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct EVMTransaction.Response",
                "name": "data",
                "type": "tuple"
              }
            ],
            "internalType": "struct EVMTransaction.Proof",
            "name": "transaction",
            "type": "tuple"
          }
        ],
        "name": "isEVMTransactionProofValid",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "bytes32[]",
                "name": "merkleProof",
                "type": "bytes32[]"
              },
              {
                "components": [
                  {
                    "internalType": "bytes32",
                    "name": "attestationType",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "sourceId",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint64",
                    "name": "votingRound",
                    "type": "uint64"
                  },
                  {
                    "internalType": "uint64",
                    "name": "lowestUsedTimestamp",
                    "type": "uint64"
                  },
                  {
                    "components": [
                      {
                        "internalType": "bytes32",
                        "name": "transactionHash",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "uint16",
                        "name": "requiredConfirmations",
                        "type": "uint16"
                      },
                      {
                        "internalType": "bool",
                        "name": "provideInput",
                        "type": "bool"
                      },
                      {
                        "internalType": "bool",
                        "name": "listEvents",
                        "type": "bool"
                      },
                      {
                        "internalType": "uint32[]",
                        "name": "logIndices",
                        "type": "uint32[]"
                      }
                    ],
                    "internalType": "struct EVMTransaction.RequestBody",
                    "name": "requestBody",
                    "type": "tuple"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint64",
                        "name": "blockNumber",
                        "type": "uint64"
                      },
                      {
                        "internalType": "uint64",
                        "name": "timestamp",
                        "type": "uint64"
                      },
                      {
                        "internalType": "address",
                        "name": "sourceAddress",
                        "type": "address"
                      },
                      {
                        "internalType": "bool",
                        "name": "isDeployment",
                        "type": "bool"
                      },
                      {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                      },
                      {
                        "internalType": "bytes",
                        "name": "input",
                        "type": "bytes"
                      },
                      {
                        "internalType": "uint8",
                        "name": "status",
                        "type": "uint8"
                      },
                      {
                        "components": [
                          {
                            "internalType": "uint32",
                            "name": "logIndex",
                            "type": "uint32"
                          },
                          {
                            "internalType": "address",
                            "name": "emitterAddress",
                            "type": "address"
                          },
                          {
                            "internalType": "bytes32[]",
                            "name": "topics",
                            "type": "bytes32[]"
                          },
                          {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                          },
                          {
                            "internalType": "bool",
                            "name": "removed",
                            "type": "bool"
                          }
                        ],
                        "internalType": "struct EVMTransaction.Event[]",
                        "name": "events",
                        "type": "tuple[]"
                      }
                    ],
                    "internalType": "struct EVMTransaction.ResponseBody",
                    "name": "responseBody",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct EVMTransaction.Response",
                "name": "data",
                "type": "tuple"
              }
            ],
            "internalType": "struct EVMTransaction.Proof",
            "name": "transaction",
            "type": "tuple"
          }
        ],
        "name": "receiveToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "relayerContract",
        "outputs": [
          {
            "internalType": "contract IRelayer",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "sendToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_bridgedContract",
            "type": "address"
          }
        ],
        "name": "setBridgedCoinContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_target",
            "type": "address"
          }
        ],
        "name": "setRelay",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ] as const;