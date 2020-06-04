const express = require('express')

const router = express.Router()

const IrrigateCause = require('../models/irrigateCause')

//Routes
router.get('/api', (req, res) => {
	IrrigateCause.find({ })
		.then((data) => {
			console.log(data)
			res.json(data)
		})
		.catch((error) => {
			console.log(error)
		})
})

router.post('/save', (req, res) => {
	console.log('Body: ', req.body)
	const data = req.body

	const newIrrigateCause = new IrrigateCause(data)

	newIrrigateCause.save((error) => {
		if (error) {
			res.status(500).json({ msg: 'Internal server error'})
			return
		}
		return res.json({
			msg: 'Your data has been saved'
		})
	})

})

//Saving data
// const data = {
// 	name: "La Croix Rouge",
// 	description: "ONG",
// 	category: "Hunger",
// 	continent: "All",
// 	country: "All",
// }

// const newIrrigateCause = new IrrigateCause(data)

// newIrrigateCause.save((error) => {
// 	if (error) {
// 		console.log('Save error')
// 	} else {
// 		console.log('New cause saved into database')
// 	}
// })


module.exports = router