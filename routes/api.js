const express = require('express')
const path = require('path')
const multer = require('multer')

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
	IrrigateCause.find({ })
		.then((data) => {
			console.log("get data: ", data)
			res.json(data)
		})
		.catch((error) => {
			console.log(error)
		})
})

router.post('/save', function(req, res) {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}

		// const data = req.body
		// console.log("data: ", data)
		// const newIrrigateCause = new IrrigateCause(data)
		// console.log("newIrrigateCause: ", newIrrigateCause)

		const newIrrigateCause = new IrrigateCause({
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			continent: req.body.continent,
			country: req.body.country,
			logoName : req.file.path,
		})
		console.log("newIrrigateCause: ", newIrrigateCause)

		newIrrigateCause.save((error) => {
			if (error) {
				res.status(500).json({ msg: 'Internal server error'})
			}
			res.status(200).send(req.file)
		})
	})
})


module.exports = router