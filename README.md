# ERC20 - DevEnv(Alchemy, Hardhat, and Rinkeby test network)

### Step1: Create Alchemy Apps
#### Create an account in [Alchemy](https://www.alchemy.com/) and click "Create App".
```
1. Enter any value for "NAME" and "DESCRIPTION"
2. Select the following elements
- "Development" for ENVIRONMENT
- "Ethereum" for CHAIN
- "Rinkeby" for NETWORK
3. Press "CREATE APP" to create the project.
```


### Step2: Preparing MetaMask
#### Create a wallet address in [MetaMask](https://metamask.io/), go to Settings and turn on Show test networks.



### Step3: Get the ETH of the Rinkeby network
#### Request testnet LINK to get ETH.
```
- Network is "Ethereum Rinkeby"
- "Your MetaMask wallet address" in the Testnet account address field.
- Check "ETH" for Request type.

Enter the above information and click "Send request".
```
Your request will be added to the queue, and you should see the ETH being transferred to your MetaMask for testing the environment build.



### Step4: Create a Hardhat project
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

Do you want to install this [NAME OF YOUR HARDHAT PROJECT] dependencies with npm(hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers)?
 - Select "Y"
```

##### After the installation is complete, your project should contain the following

```
Folders:
- scripts
- contracts

Files:
- node_modules
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



### Step5: Set up the .env
#### In the root folder of your project
```
cd ~
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



### Step6: Setup scripts and contracts to create ERC20
#### For step 6, the @openzeppelin/contracts package is required, so execute the following command
```
npm install @openzeppelin/contracts
```
Now, it is time to name the token!
Create a contract file, but you need to match the name of the smart contract file with the name of the token.

##### Execute the following command
```
cd ./contracts
touch [your token's name].sol
```
##### Then, open the newly created .sol file and copy-paste the following into it
```
//SPDX-License-Identifier: Unlicense
pragma solidity ^[Supported versions];

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YourTokensName is ERC20 {
  uint constant _initial_supply = [Any initial supply];
  constructor() ERC20("your token's name", "token's symbol") {
    _mint(msg.sender, _initial_supply);
  };
};
```

Then save and close the [your token's name].sol file.
Now that we have the entire contracts setup, let's create a deployment script for it.

```
cd ./scripts
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
cd ~
```


### Step7: Deploy the token
#### This will compile your contract and deploy it to the Rinkeby network
##### Execute the following command
```
npx hardhat run scripts/deploy.js --network rinkeby
```

##### After compiling and deploying, you should see something like this in the terminal output.