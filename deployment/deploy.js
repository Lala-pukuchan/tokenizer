async function main() {
    // MetaMaskからアカウントを取得
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log('accounts', accounts)
    const deployer = accounts[0];

    console.log("Deploying contracts with the account:", deployer);

    // 残高の確認
    const balance = await web3.eth.getBalance(deployer);
    console.log("Account balance:", web3.utils.fromWei(balance, "ether"), "ETH");

    if (parseFloat(web3.utils.fromWei(balance, "ether")) === 0) {
        console.error("Error: Insufficient ETH balance for deployment.");
        return;
    }

    // Token42コントラクトのABIとバイトコードを設定
    const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "allowance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientAllowance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientBalance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "approver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidApprover",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidReceiver",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSpender",
            "type": "error"
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
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
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
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
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
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
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
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
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
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
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
    ] // Remixのコンパイル結果から取得したABI
    const contractBytecode = "608060405234801561000f575f80fd5b50336040518060400160405280600781526020017f546f6b656e3432000000000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f544b343200000000000000000000000000000000000000000000000000000000815250816003908161008c91906106d9565b50806004908161009c91906106d9565b5050505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361010f575f6040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161010691906107e7565b60405180910390fd5b61011e8161013e60201b60201c565b506101393369d3c21bcecceda100000061020160201b60201c565b6108bd565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160055f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610271575f6040517fec442f0500000000000000000000000000000000000000000000000000000000815260040161026891906107e7565b60405180910390fd5b6102825f838361028660201b60201c565b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036102d6578060025f8282546102ca919061082d565b925050819055506103a4565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205490508181101561035f578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016103569392919061086f565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036103eb578060025f8282540392505081905550610435565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161049291906108a4565b60405180910390a3505050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061051a57607f821691505b60208210810361052d5761052c6104d6565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261058f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610554565b6105998683610554565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f6105dd6105d86105d3846105b1565b6105ba565b6105b1565b9050919050565b5f819050919050565b6105f6836105c3565b61060a610602826105e4565b848454610560565b825550505050565b5f90565b61061e610612565b6106298184846105ed565b505050565b5b8181101561064c576106415f82610616565b60018101905061062f565b5050565b601f8211156106915761066281610533565b61066b84610545565b8101602085101561067a578190505b61068e61068685610545565b83018261062e565b50505b505050565b5f82821c905092915050565b5f6106b15f1984600802610696565b1980831691505092915050565b5f6106c983836106a2565b9150826002028217905092915050565b6106e28261049f565b67ffffffffffffffff8111156106fb576106fa6104a9565b5b6107058254610503565b610710828285610650565b5f60209050601f831160018114610741575f841561072f578287015190505b61073985826106be565b8655506107a0565b601f19841661074f86610533565b5f5b8281101561077657848901518255600182019150602085019450602081019050610751565b86831015610793578489015161078f601f8916826106a2565b8355505b6001600288020188555050505b505050505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6107d1826107a8565b9050919050565b6107e1816107c7565b82525050565b5f6020820190506107fa5f8301846107d8565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610837826105b1565b9150610842836105b1565b925082820190508082111561085a57610859610800565b5b92915050565b610869816105b1565b82525050565b5f6060820190506108825f8301866107d8565b61088f6020830185610860565b61089c6040830184610860565b949350505050565b5f6020820190506108b75f830184610860565b92915050565b611211806108ca5f395ff3fe608060405234801561000f575f80fd5b50600436106100e8575f3560e01c806370a082311161008a57806395d89b411161006457806395d89b4114610236578063a9059cbb14610254578063dd62ed3e14610284578063f2fde38b146102b4576100e8565b806370a08231146101de578063715018a61461020e5780638da5cb5b14610218576100e8565b806323b872dd116100c657806323b872dd14610158578063313ce5671461018857806340c10f19146101a657806342966c68146101c2576100e8565b806306fdde03146100ec578063095ea7b31461010a57806318160ddd1461013a575b5f80fd5b6100f46102d0565b6040516101019190610e5f565b60405180910390f35b610124600480360381019061011f9190610f10565b610360565b6040516101319190610f68565b60405180910390f35b610142610382565b60405161014f9190610f90565b60405180910390f35b610172600480360381019061016d9190610fa9565b61038b565b60405161017f9190610f68565b60405180910390f35b6101906103b9565b60405161019d9190611014565b60405180910390f35b6101c060048036038101906101bb9190610f10565b6103c1565b005b6101dc60048036038101906101d7919061102d565b6103d7565b005b6101f860048036038101906101f39190611058565b6103ec565b6040516102059190610f90565b60405180910390f35b610216610431565b005b610220610444565b60405161022d9190611092565b60405180910390f35b61023e61046c565b60405161024b9190610e5f565b60405180910390f35b61026e60048036038101906102699190610f10565b6104fc565b60405161027b9190610f68565b60405180910390f35b61029e600480360381019061029991906110ab565b61051e565b6040516102ab9190610f90565b60405180910390f35b6102ce60048036038101906102c99190611058565b6105a0565b005b6060600380546102df90611116565b80601f016020809104026020016040519081016040528092919081815260200182805461030b90611116565b80156103565780601f1061032d57610100808354040283529160200191610356565b820191905f5260205f20905b81548152906001019060200180831161033957829003601f168201915b5050505050905090565b5f8061036a610624565b905061037781858561062b565b600191505092915050565b5f600254905090565b5f80610395610624565b90506103a285828561063d565b6103ad8585856106cf565b60019150509392505050565b5f6012905090565b6103c96107bf565b6103d38282610846565b5050565b6103df6107bf565b6103e933826108c5565b50565b5f805f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b6104396107bf565b6104425f610944565b565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461047b90611116565b80601f01602080910402602001604051908101604052809291908181526020018280546104a790611116565b80156104f25780601f106104c9576101008083540402835291602001916104f2565b820191905f5260205f20905b8154815290600101906020018083116104d557829003601f168201915b5050505050905090565b5f80610506610624565b90506105138185856106cf565b600191505092915050565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b6105a86107bf565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610618575f6040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161060f9190611092565b60405180910390fd5b61062181610944565b50565b5f33905090565b6106388383836001610a07565b505050565b5f610648848461051e565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146106c957818110156106ba578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016106b193929190611146565b60405180910390fd5b6106c884848484035f610a07565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361073f575f6040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016107369190611092565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107af575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016107a69190611092565b60405180910390fd5b6107ba838383610bd6565b505050565b6107c7610624565b73ffffffffffffffffffffffffffffffffffffffff166107e5610444565b73ffffffffffffffffffffffffffffffffffffffff161461084457610808610624565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161083b9190611092565b60405180910390fd5b565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108b6575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016108ad9190611092565b60405180910390fd5b6108c15f8383610bd6565b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610935575f6040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260040161092c9190611092565b60405180910390fd5b610940825f83610bd6565b5050565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160055f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610a77575f6040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610a6e9190611092565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610ae7575f6040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610ade9190611092565b60405180910390fd5b8160015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508015610bd0578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610bc79190610f90565b60405180910390a35b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610c26578060025f828254610c1a91906111a8565b92505081905550610cf4565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905081811015610caf578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610ca693929190611146565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610d3b578060025f8282540392505081905550610d85565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610de29190610f90565b60405180910390a3505050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610e3182610def565b610e3b8185610df9565b9350610e4b818560208601610e09565b610e5481610e17565b840191505092915050565b5f6020820190508181035f830152610e778184610e27565b905092915050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610eac82610e83565b9050919050565b610ebc81610ea2565b8114610ec6575f80fd5b50565b5f81359050610ed781610eb3565b92915050565b5f819050919050565b610eef81610edd565b8114610ef9575f80fd5b50565b5f81359050610f0a81610ee6565b92915050565b5f8060408385031215610f2657610f25610e7f565b5b5f610f3385828601610ec9565b9250506020610f4485828601610efc565b9150509250929050565b5f8115159050919050565b610f6281610f4e565b82525050565b5f602082019050610f7b5f830184610f59565b92915050565b610f8a81610edd565b82525050565b5f602082019050610fa35f830184610f81565b92915050565b5f805f60608486031215610fc057610fbf610e7f565b5b5f610fcd86828701610ec9565b9350506020610fde86828701610ec9565b9250506040610fef86828701610efc565b9150509250925092565b5f60ff82169050919050565b61100e81610ff9565b82525050565b5f6020820190506110275f830184611005565b92915050565b5f6020828403121561104257611041610e7f565b5b5f61104f84828501610efc565b91505092915050565b5f6020828403121561106d5761106c610e7f565b5b5f61107a84828501610ec9565b91505092915050565b61108c81610ea2565b82525050565b5f6020820190506110a55f830184611083565b92915050565b5f80604083850312156110c1576110c0610e7f565b5b5f6110ce85828601610ec9565b92505060206110df85828601610ec9565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061112d57607f821691505b6020821081036111405761113f6110e9565b5b50919050565b5f6060820190506111595f830186611083565b6111666020830185610f81565b6111736040830184610f81565b949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6111b282610edd565b91506111bd83610edd565b92508282019050808211156111d5576111d461117b565b5b9291505056fea26469706673582212202073a8781379f16d57b0732e77aff95e309e68bc0a0b1cd73b001300d9877f6c64736f6c634300081a0033" // Remixのコンパイル結果から取得したバイトコード

    // ethers.jsのContractFactoryを利用してコントラクトをデプロイ
    const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
    const Token42 = new ethers.ContractFactory(contractABI, contractBytecode, signer);

    console.log("Deploying Token42 contract...");
    const token42 = await Token42.deploy({ gasLimit: 3000000 });
    await token42.deployed();

    console.log("Token42 deployed to:", token42.address);
}

// エラーハンドリングを含むスクリプト実行
main().catch((error) => {
    console.error("Error during deployment:", error);
});
