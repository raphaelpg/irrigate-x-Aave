const mongoose = require('mongoose')
const Batch = require('../models/batch')

module.exports = {

	// depositToLP: async function () {
	getBatchName:	async function () {
		console.log('getBatchName started')
		let currentDate = new Date()
		let currentYear = currentDate.getFullYear()
		let currentMonth = currentDate.getMonth()
		let currentDay = currentDate.getDate()
		if (currentDay < 15) {
			let batchName = currentYear + '_' + (currentMonth-1) + '_B'
			console.log("batchName: ", batchName)
			return batchName
		} else {
			let batchName = currentYear + '_' + (currentMonth) + '_A'
			console.log("batchName: ", batchName)
			return batchName
		}
	},

	retrieveBatchCauses: async function (batchName) {
		console.log("retrieveBatchCauses started")
		const batchData = await Batch.find({ batch: batchName	})
		return batchData[0].causes
	},

	calculateBatchTotal: async function (batchCauses) {
		console.log("retrieveBatchTotal started")
		let totalAmount = 0  
		for (address in batchCauses) {
			totalAmount = totalAmount + parseInt(batchCauses[address])
		}
		return totalAmount.toString()
	}

}