# ERC20_DevEnv

### Step1: Create Alchemy Apps.
#### Create an account in [Alchemy](https://www.alchemy.com/) and click "Create App".
```
1. Enter any value for "NAME" and "DESCRIPTION"
2. Select the following elements
- "Development" for ENVIRONMENT
- "Ethereum" for CHAIN
- "Rinkeby" for NETWORK
3. Press "CREATE APP" to create the project.
```


### Step2: Preparing MetaMask.
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
Create a folder of your choice and type the following command
```
mkdir [NAME OF YOUR HARDHAT PROJECT]
cd [NAME OF YOUR HARDHAT PROJECT]
npm init -y
npm install detenv
npm install --save-dev hardhat
npx hardhat
```
Then you'll see What do you want to do?
- Select "Create a basic sample project".

Next, Do you want to install this [NAME OF YOUR HARDHAT PROJECT] dependencies with npm(hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers)?
- Select "Y".

```
After the installation is complete, your project should contain the following
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
Then remove sample-script.js from the /scripts directory and Greeter.sol from the /contracts directory. (Not the whole directory. Delete only the files in the directories)