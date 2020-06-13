const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const seed = process.env.SEED
const ropstenProvider = process.env.INFPROVIDER
const provider = new HDWalletProvider(seed, ropstenProvider)
const web3 = new Web3(provider)

const irrigateAddress = '0xC1f1B00Ca70bB54a4d2BC95d07f2647889E2331a'

const mockDaiContractAbi = require('../contracts/MockDAI.json')
const mockDaiContractAddress = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108'
const mockDaiContractInstance = new web3.eth.Contract(mockDaiContractAbi, mockDaiContractAddress)

const LendingPoolAddressesProviderABI = require ('../contracts/LendingPoolAddressesProvider.json')
const lpAddressProviderAddress = '0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728'
const lpAddressProviderContract = new web3.eth.Contract(LendingPoolAddressesProviderABI, lpAddressProviderAddress)

const LendingPoolABI = require ('../contracts/LendingPool.json')

const ADaiTokenABI = require('../contracts/ADaiToken.json')
const aDaiToken = '0xcB1Fe6F440c49E9290c3eb7f158534c2dC374201'
const aDaiContract = new web3.eth.Contract(ADaiTokenABI, aDaiToken)

module.exports = {

	depositToLP: async function () {
		console.log("depositToLP started")
		//make a deposit to aave lending pool of all DAIs in app account
		const appMockDaiBalance = await mockDaiContractInstance.methods.balanceOf(irrigateAddress).call()
		const appMockDaiBalanceinWei = appMockDaiBalance.toString()
		const referralCode = '0'

		//Get the latest LendingPoolCore address
		const lpCoreAddress = await lpAddressProviderContract.methods.getLendingPoolCore().call()
	    .catch((e) => {
	        throw Error(`Error getting lendingPool address: ${e.message}`)
	    })

	  //Approve the LendingPoolCore address with the DAI contract
		await mockDaiContractInstance.methods
	    .approve(
	        lpCoreAddress,
	        appMockDaiBalanceinWei
	    )
	    .send({from: irrigateAddress})
	    .catch((e) => {
	        throw Error(`Error approving DAI allowance: ${e.message}`)
	    })

	  //Get the latest LendingPool contract address
		const lpAddress = await lpAddressProviderContract.methods
	    .getLendingPool()
	    .call({from: irrigateAddress})
	    .catch((e) => {
	        throw Error(`Error getting lendingPool address: ${e.message}`)
	    })

	  //Make the deposit transaction via LendingPool contract
		const lpContract = new web3.eth.Contract(LendingPoolABI, lpAddress)
		await lpContract.methods
	    .deposit(
	        mockDaiContractAddress,
	        appMockDaiBalanceinWei,
	        referralCode
	    )
	    .send({from: irrigateAddress})
	    .catch((e) => {
	        throw Error(`Error depositing to the LendingPool contract: ${e.message}`)
	    })
	  console.log("deposit successful")
	},

	redeemADai: async function(amoutToRedeem) {
		console.log("redeemADai function started")
		const amountInWei = web3.utils.toWei(amoutToRedeem, "ether").toString()

		await aDaiContract.methods
	    .redeem(amountInWei)
	    .send({from: irrigateAddress})
	    .catch((e) => {
	        throw Error(`Error redeeming aDai: ${e.message}`)
	    })
	  const daiBalance = await mockDaiContractInstance.methods.balanceOf(irrigateAddress).call()
	  console.log("redeem successful")
	}, 

	transferToCauses: async function(addressesArray) {
		console.log("Transfer to causes started")
		for (address in addressesArray) {
			const addressAmount = web3.utils.toWei(addressesArray[address], "ether").toString()
		  console.log("Transfer ",addressAmount, "DAI to ", address)
		  await mockDaiContractInstance.methods.transfer(address, addressAmount).send({from: irrigateAddress})
		}
		console.log("All transfers to causes ended")
	}

}