# ERC20 - DevEnv(Alchemy, Hardhat, and Rinkeby test network)
## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

  - [Step1: Create Alchemy Apps](#step1-create-alchemy-apps)
  - [Step2: Preparing MetaMask](#step2-preparing-metamask)
  - [Step3: Get the ETH of the Rinkeby network](#step3-get-the-eth-of-the-rinkeby-network)
  - [Step4: Create a Hardhat project](#step4-create-a-hardhat-project)
  - [Step5: Set up the .env](#step5-set-up-the-env)
  - [Step6: Setup scripts and contracts to create ERC20](#step6-setup-scripts-and-contracts-to-create-erc20)
  - [Step7: Deploy the token](#step7-deploy-the-token)
  - [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Step1: Create Alchemy Apps
#### Create an account in [Alchemy](https://www.alchemy.com/) and click "Create App".
```
1. Enter any value for "NAME" and "DESCRIPTION"
2. Select the following elements
- "Development" for ENVIRONMENT
- "Ethereum" for CHAIN
- "Rinkeby" for NETWORK
3. Press "CREATE APP" to create the project.
```


## Step2: Preparing MetaMask
#### Create a wallet address in [MetaMask](https://metamask.io/), go to Settings and turn on Show test networks.



## Step3: Get the ETH of the Rinkeby network
#### [Request testnet LINK](https://faucets.chain.link/rinkeby) to get ETH.
```
- Network is "Ethereum Rinkeby"
- "Your MetaMask wallet address" in the Testnet account address field.
- Check "ETH" for Request type.

Enter the above information and click "Send request".
```
Your request will be added to the queue, and you should see the ETH being transferred to your MetaMask for testing the environment build.



## Step4: Create a Hardhat project
#### Create a folder of your choice and type the following command
```
mkdir [NAME OF YOUR HARDHAT PROJECT]
cd [NAME OF YOUR HARDHAT PROJECT]
npm init -y
npm install dotenv
npm install --save-dev hardhat
npx hardhat
```
##### Answer some of the following questions
```
What do you want to do?
 - Select "Create a basic sample project"

Hardhat project root:
 - ...

Do you want to install this [NAME OF YOUR HARDHAT PROJECT] dependencies with npm(hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers)?
 - Select "Y"
```

##### After the installation is complete, your project should contain the following

```
Folders:
- scripts
- contracts
- test
- node_modules

Files:
- .gitignore
- package.json
- package-lock.json
- hardhat.config.js
- README.md
```
Then remove sample-script.js from the /scripts directory and Greeter.sol from the /contracts directory. (Not the whole directory, Delete only the files in the directories.)

After deleting Open the hardhat.config.js file, delete its contents completely, and copy/paste the following into it. (About solidity supported version[^1])
```
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: "[Supported versions]",
  networks: {
    rinkeby: {
      url: `${process.env.ALCHEMY_RINKEBY_URL}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
    },
  },
};
```
[^1]:https://hardhat.org/reference/solidity-support.html



## Step5: Set up the .env
#### In the root folder of your project
```
touch .env
```
##### Open the .env file and copy-paste the following into it.
```
ALCHEMY_RINKEBY_URL=
RINKEBY_PRIVATE_KEY=
ETHERSCAN_KEY=
SOME_OTHER_VARIABLE=
```
 1. Press "VIEW DETAILS" of the application you "CREATE APP" in Step1, press "VIEW KEY", and copy the URL in the "HTTP" field.
 2. Paste that Alchemy HTTP Endpoint into the "ALCHEMY_RINKEBY_URL" variable above.
 3. Then paste the MetaMask private key you created in Step2 into "RINKEBY_PRIVATE_KEY".

     - For "ALCHEMY_RINKEBY_URL" and "RINKEBY_PRIVATE_KEY", do not include ```"``` or ```;```, just paste the value directly after the ```=``` with no spaces.


This will make ```require('dotenv').config();``` statement will automatically load all variables in the root ```.env``` file.
Then ```hardhat.config.js``` will work and correctly read the ```.env``` variables and values!



## Step6: Setup scripts and contracts to create ERC20
#### For step 6, the @openzeppelin/contracts package is required, so execute the following command
```
npm install @openzeppelin/contracts
```
Now, it is time to name the token!
Create a contract file, but you need to match the name of the smart contract file with the name of the token.

##### Execute the following command
```
cd contracts
touch [your token's name].sol
```
##### Then, open the newly created .sol file and copy-paste the following into it
```
//SPDX-License-Identifier: Unlicense
pragma solidity ^[Supported versions];

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YourTokensName is ERC20 {
  uint constant _initial_supply = [Any_initial_supply];
  constructor() ERC20("your token's name", "token's symbol") {
    _mint(msg.sender, _initial_supply);
  }
}
```

Then save and close the [your token's name].sol file.
Now that we have the entire contracts setup, let's create a deployment script for it.

```
cd .. && cd scripts
touch deploy.js
```
##### Run the above command, open the newly created file, and copy-paste the following into it
```
const main = async() => {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with this account:', deployer.address);

  const weiAmount = (await deployer.getBalance()).toString();
  console.log('Account balance:', (await ethers.utils.formatEther(weiAmount)));

  const Token = await ethers.getContractFactory('[your token's name]');
  const token = await Token.deploy();
  console.log('Token address:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
```
##### Save the file and Return to the project root directory
```
cd ..
```


## Step7: Deploy the token
#### This will compile your contract and deploy it to the Rinkeby network
##### Execute the following command
```
npx hardhat run scripts/deploy.js --network rinkeby
```

##### After compiling and deploying, you should see something like this in the terminal output.
```
Deploying with this account: [your wallet address]
Account balance: ...
Token address: ...
```
Go to [Etherscan](https://rinkeby.etherscan.io/) and enter the address of the output token to see the ERC-20 contract deployed on Rinkeby

**You have now finished building your environment and can deploy your own ERC-20 token to Rinkeby using the OpenZeppelin ERC20 standard.**
**Now it's time to put it into practice by writing Hardhat scripts to send the token, airdrop, etc.**

## References
>[Hardhat Guide: How to Deploy Your Own ERC-20 Token](https://www.chainshot.com/article/deploy-your-own-token)