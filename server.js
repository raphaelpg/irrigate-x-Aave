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



async function test() {

}

test()

//Timeout function for batch management
cron.schedule('1 0 1,15 * *', async () => {
	//get new batch name
	newBatchName = await causesFunctions.getNewBatchName()
	//create new batch
	await causesFunctions.createNewBatch(newBatchName)

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