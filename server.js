const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cron = require('node-cron')
const moment = require('moment')
require('dotenv').config()

const app = express()
const routes = require('./routes/api')
const userRoutes = require('./routes/user')
const donationsRoutes = require('./routes/donations')

const aaveFunctions = require('./functions/aaveFunctions')
const causesFunctions = require('./functions/causesFunctions')

// const Batch = require('./models/batch')

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

async function test() {

	// let batchToRetrieve = await causesFunctions.getBatchName()
	
	// //retrieve addresses and amounts
	// let batchCauses = await causesFunctions.retrieveBatchCauses(batchToRetrieve)

	// //total amount to redeem for this batch
	// let totalAmount = await causesFunctions.calculateBatchTotal(batchCauses)

	// console.log(totalAmount)
	// let batchToRetrieve = await causesFunctions.getBatchName();
	// let batchData = await causesFunctions.retrieveBatchData(batchToRetrieve)
	// aaveFunctions.depositToLP()
}

test()
//Timeout function for batch management
// cron.schedule('* * 1,15 * *', async () => {
cron.schedule('49 * * * *', async () => {
	//get corresponding causes and their amount
	let batchToRetrieve = await causesFunctions.getBatchName()
	
	//retrieve addresses and amounts
	let batchCauses = await causesFunctions.retrieveBatchCauses(batchToRetrieve)

	//total amount to redeem for this batch
	let totalAmount = await causesFunctions.calculateBatchTotal(batchCauses)

	//redeem all the aDAIs to aave and get the DAIs back
	await aaveFunctions.redeemADai(totalAmount)
			
	//transfer to each of them the correct amount
	await aaveFunctions.transferToCauses(batchCauses)

	//make a deposit to aave lending pool of all DAIs in app account	
	await aaveFunctions.depositToLP()
	

});

//each 1 of the month:
//deduct expenses from interests
//transfer rest of interests


//Start server
app.listen(PORT, console.log(`Server listening on ${PORT}`))