# Relayer Project Instructions
This project is a blockchain relayer between Coston and Sepolia networks.
The addresses of the relayer contracts are the following:
```
COSTON_RELAY=0x2f48135AdF44c99999cA0d6d21bD49466AaD74Fd
SEPOLIA_RELAY=0x7b4d5e9388dBdB0161186D605379dafA3dc22100
```
## About
Flare demo relayer is a connection between Ethereum(sepolia) & Flare(coston) blockchain that allows the transfer calldata data and/or tokens from one chain to another.

This is a trusted relay currently using only one bot to relay the information and should only be used as a backbone for hackathon bridge.
Each gateway contract contains a list of supported tokens that con be transferred (if you need them, come visit us at the booth, and we will give you a generous amount of tokens to play with).
Calldata can be transferred and executed on the other chain without any need for tokens.

## Instructions
Relay is initiated by calling the **requestRelay** function on the relayer contract of the source network. The function needs to be called with the following arguments:

- **_relayTarget** is the address of the contract, that we want to interact with.
This target contract is on the second network and will receive the amount of tokens that are sent to the relayer on the first network and is also the recipient of call with the provided calldata (if any).
- **_additionalCalldata** the abi encoded call that contains the function signature and the arguments of the function we want to call on the target contract.
If empty, the function will only transfer tokens to the target contract.
- **_sourceToken** is the address of the token that we send to the relayer contract on the first network.
The relayer contract will calculate the corresponding token pair (which is on the second network) of this token, that will be sent to the target network.
To transfer tokens, you must first approve the relayer contract to transfer the tokens on your behalf (see the script for more details).
- **_amount** is an amount of source tokens to send.
The same amount will be received by the relay target contract on the second network (to simplify calculations and work, there is currently no fee for the relayer service).
If the amount is zero, the function will only execute the call on the target contract (if any).

When this call to the relayer contract on the first network is made, the contract calculates the token pair of the source token. If the source token is not supported, the function throws an exception and reverts the transaction. The contract then transfers the specified amount of source tokens from the transaction sender to the owner of the relayer contract. Finally the contract emits a **RelayRequested** event.

This event is then caught by us (the relayer) and we call the **executeRelay** function on the relayer contract of the second network with correct arguments. 

The results of this call are:
- The *relay target* contract (on the second network) receives *amount* of tokens, that are the token pair of the *source token (on the first network)*.
- The function on the *relay target* that was encoded inside *additional calldata* is also executed.


## Example of the working token transfer call (in python)
An example script with a token transfer is in the *```relay/management/commands/request_relay.py```* file.

The example is encoded as a django management command, but the main logic can easily be copied and provided as a standalone script.
Remember, to execute something on sepolia side you need to provide a request on coston side and vice versa.

## Example of the working calldata call (in python)
An example script with a calldata is in the *```relay/management/commands/request_with_data.py```* file.


# Relayer project
The projects consists of a blockchain relayer between Coston and Sepolia networks. 

The addresses of the relayer contracts are the following:
```
COSTON_RELAY=0x2f48135AdF44c99999cA0d6d21bD49466AaD74Fd
SEPOLIA_RELAY=0x7b4d5e9388dBdB0161186D605379dafA3dc22100
```

## What happens
To enact the relayer call from one network to another, the **requestRelay** function is called on the relayer contract on the first network (*relay/management/commands/request_with_data.py*). This will emit a **RelayRequested** event, that is detected by the main script (*relay/management/commands/start_relay.py*). With the information collected from the logs of the emitted event, the **executeRelay** function is then called on the relayer contract on the second network. This function also executes a call that is written inside the **additionalCalldata** field of the initial event, if there is one. The relayer call is also saved as a Django database object.

## Example of the transactions that are made (start network is coston)
Relayer call (Request Relay method) transaction hash:
```
tx_hash = 0x3cf4d2b401024d1d6c26908aa67f3622ab5cc2d0dbc36c84c4c7a7b93d4d0612
```
This transaction is made from *us* to the *COSTON_RELAY* contract.

We then make the transaction (Execute Relay mothed) on the *SEPOLIA_RELAY* contract. The transaction has is:
```
# sepolia address
tx_hash = 0xde40ff2e5d926903a9569fc94f00d49b4d889bbd3971628929ea44d1ae94d206
```

Both of these transaction include some token transfers, so that all the contracts have enough tokens that they can execute their calls. The Execute Relay methos transaction also enacts the call that is encoded in the *additionalCalldata* argument of the method. This function is called on the contract with the *relayTarget* address (another argument of the method).

## More detailed look
The goal of a relayer script is to enable sending information (calling functions) to another network. This example connects coston and sepolia networks. 

There are several things that happen when a relayer call is enacted. Below is the description of such a call on the coston relayer.

First, to enact the relayer, we need to call the **requestRelay** function on the address of the coston relayer contract. The arguments of this call are the address of the contract on the other network that we want to call functions on (*_relayTarget*), the encoded data that contains such a call on the target contract (*_additionalCalldata*), the address of a token on this network that we can transfer tokens from (*_sourceToken*) and the amount of tokens that we want to transfer to the token pair on the other network (*_amount*). \
With these, we call the the **requestRelay** function. The contract then calculates the token pair on the other network and emits a **RelayRequested** event.

With the main relay script (*start_relay* management command) we can catch this event. After catching it, we read its data and call the **executeRelay** function on the address of the sepolia relayer contract with it. Before the call, this data (RelayData) must be expanded with an *executionResult* and a *relayDatahash* fields. We simply add zero values at these fields and then call the function on the sepolia relayer contract. \
In the execution of the function, the relayer contract first transfers the calculated target tokens to the *_relayTarget* and then, if the *_additionalCalldata* is non-empty and therefore contains call instructions, also executes these instructions on the *_relayTarget* contract. After these calls, the contract emits a **RelayExecuted** event.
