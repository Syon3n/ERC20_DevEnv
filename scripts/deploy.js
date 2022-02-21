const main = async() => {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with this account:', deployer.address);

  const weiAmount = (await deployer.getBalance()).toString();
  console.log('Account balance:', (await ethers.utils.formatEther(weiAmount)));

  const Token = await ethers.getContractFactory('NameToken');
  const token = await Token.deploy();
  console.log('Token address:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });