const express = require('express')
const path = require('path')
const multer = require('multer')
const mongoose = require('mongoose')

const router = express.Router()

const IrrigateCause = require('../models/irrigateCause')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './ressources/')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer ({ storage: storage }).single('file')

//Routes
router.get('/api', (req, res) => {
	let collection = mongoose.connection.collection('causes')

	collection.find({ }).toArray((err, data) => {
		if (err) throw err
		res.json(data)
	})
})

router.post('/save', function(req, res) {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}

		const newIrrigateCause = new IrrigateCause({
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			continent: req.body.continent,
			country: req.body.country,
			logoName : req.file.path,
		})

		let collection = mongoose.connection.collection('causes')
		collection.insertOne(newIrrigateCause, (error) => {
			if (error) {
				res.status(500).json({ msg: 'Internal server error'})
			}
			res.status(200).send(req.file)
		})
	})
})


module.exports = router