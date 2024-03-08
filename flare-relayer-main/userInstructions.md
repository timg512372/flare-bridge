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

