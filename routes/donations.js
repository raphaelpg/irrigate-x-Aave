const express = require('express')
const path = require('path')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const upload = multer ({  }).single('file')
const checkAuth = require('../middleware/check-auth')
const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
require('dotenv').config()

const seed = process.env.SEED
const ropstenProvider = process.env.INFPROVIDER
const provider = new HDWalletProvider(seed, ropstenProvider)
const web3 = new Web3(provider)
const irrigateAddress = '0xC1f1B00Ca70bB54a4d2BC95d07f2647889E2331a'
const mockDaiContractAbi = require('../contracts/MockDAI.json')
const mockDaiContractAddress = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108'
const mockDaiContractInstance = new web3.eth.Contract(mockDaiContractAbi, mockDaiContractAddress)

router.post('/donateOnce', (req, res, next) => {
	upload(req, res, async function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		const receivedAmount = req.body.amount
		const causeAddress = req.body.causeAddress
		await mockDaiContractInstance.methods.transfer(causeAddress, receivedAmount).send({from: irrigateAddress})
		.then(() => {
			console.log("transfered to cause")
			return res.status(200).json({
				message: 'transfered to cause',
			})
		})
		.catch(error => {
			console.log("transfer to cause failed", error)
			return res.status(401).json({
				message: 'transder to cause failed'
			})
		})
	})
})

module.exports = router