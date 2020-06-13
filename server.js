const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cron = require('node-cron')
require('dotenv').config()

const app = express()
const routes = require('./routes/api')
const userRoutes = require('./routes/user')
const donationsRoutes = require('./routes/donations')

const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const seed = process.env.SEED
const ropstenProvider = process.env.INFPROVIDER
const provider = new HDWalletProvider(seed, ropstenProvider)
const web3 = new Web3(provider)
const irrigateAddress = '0xC1f1B00Ca70bB54a4d2BC95d07f2647889E2331a'

const mockDaiContractAbi = require('./contracts/MockDAI.json')
const mockDaiContractAddress = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108'
const mockDaiContractInstance = new web3.eth.Contract(mockDaiContractAbi, mockDaiContractAddress)
const LendingPoolAddressesProviderABI = require ('./contracts/LendingPoolAddressesProvider.json')
const LendingPoolABI = require ('./contracts/LendingPool.json')






//Database connection
const PORT = process.env.PORT || 8080
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected')
})

//Data parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/ressources', express.static('ressources'))

//Routes logs in console
app.use(morgan('tiny'))
//Use router
app.use('/', routes)
app.use('/user', userRoutes)
app.use('/donations', donationsRoutes)

//Timeout function for batch management
// cron.schedule('* * 1,15 * *', () => {
cron.schedule('9 * * * *', async () => {
	//make a deposit to aave lending pool of all DAIs in app account
	console.log("make a deposit to aave lending pool of all DAIs in app account")
	const appMockDaiBalance = await mockDaiContractInstance.methods.balanceOf(irrigateAddress).call()
	const appMockDaiBalanceinWei = appMockDaiBalance.toString()
	console.log("appMockDaiBalanceinWei: ",appMockDaiBalanceinWei)
	const referralCode = '0'

	//Get the latest LendingPoolCore address
	console.log("Get the latest LendingPoolCore address")
	const lpAddressProviderAddress = '0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728' // mainnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
	const lpAddressProviderContract = new web3.eth.Contract(LendingPoolAddressesProviderABI, lpAddressProviderAddress)
	const lpCoreAddress = await lpAddressProviderContract.methods.getLendingPoolCore().call()
    .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`)
    })
  console.log("lpCoreAddress :",lpCoreAddress)
	console.log("lpCoreAddress from site: 0x4295ee704716950a4de7438086d6f0fbc0ba9472")

  //Approve the LendingPoolCore address with the DAI contract
  console.log("Approve the LendingPoolCore address with the DAI contract")
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
  console.log("Get the latest LendingPool contract address")
	const lpAddress = await lpAddressProviderContract.methods
    .getLendingPool()
    .call({from: irrigateAddress})
    .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`)
    })
  console.log("lpAddress :",lpAddress)
  console.log("lpAddress from site: 0x9e5c7835e4b13368fd628196c4f1c6cec89673fa")

  //Make the deposit transaction via LendingPool contract
  console.log("Make the deposit transaction via LendingPool contract")
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

	//repay all the aDAIs to aave and get the DAIs back
	//transfer the DAIs to corresponding causes
	//keep interests needed for the app
	//transfer remaining interests to the causes
	//create new batch and insert it to mongodb 
});


//Start server
app.listen(PORT, console.log(`Server listening on ${PORT}`))