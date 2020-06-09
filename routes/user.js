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
require('dotenv').config()

router.post('/signup', (req, res, next) => {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		User.find({ email: req.body.email })
			.exec()
			.then(user => {
				if (user.length >= 1) {
					return res.status(409).json({
						message: 'Email address already used'
					})
				} else {
					bcrypt.hash(req.body.password, 10, (err, hash) => {
						if (err) {
							return res.status(500).json({
								error: err
							})
						} else {
							const user = new User({
								_id: new mongoose.Types.ObjectId(),
								email: req.body.email,
								password: hash,
								role: 'USER',
								address: '',
								streamAmount: '',
								subscribedCauses: []
							})
							let collection = mongoose.connection.collection('users')
							collection.insertOne(user, (erreur, result) => {
								if (erreur) {
									res.status(500).json({
										error: erreur
									})
								}
								res.status(201).json({
									message: 'User created'
								})
							})
						}
					})
				}
			})
	})
})

router.post('/login', (req, res, next) => {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		User.find({ email: req.body.email })
			.exec()
			.then(user => {
				if (user.length <1) {
					return res.status(401).json({
						message: 'Auth failed'
					})
				}
				bcrypt.compare(req.body.password, user[0].password, (err, result) => {
					if (err) {
						return res.status(401).json({
							message: 'Auth failed'
						})
					}
					if (result) {
						const token = jwt.sign({
							email: user[0].email,
							userId: user[0]._id
							},
							process.env.JWT_KEY,
							{
								expiresIn: "1h"
							}
						)
						return res.status(200).json({
							message: 'Auth successful',
							token: token
						})
					}
					return res.status(401).json({
						message: 'Auth failed'
					})
				})
			})
		})
})

router.post('/updateStreamAmount', checkAuth, (req, res, next) => {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		let collection = mongoose.connection.collection('users')
		collection.updateOne({ email: req.body.email }, { $set: {streamAmount: req.body.newStreamAmount } }, (err, result) => {
			if (err) {
				console.log(err)
				res.status(500).json({
					error: err
				})
			}
			res.status(201).json({
				message: 'User streamAmount updated'
			})
		})
	})
})

router.delete('/:userId', (req, res, next) => {
	let collection = mongoose.connection.collection('users')
	collection.deleteOne({ _id: req.params.userId }, (err, result) => {
		if (err) {
			console.log(err)
			res.status(500).json({
				error: err
			})
		}
		console.log(result)
		res.status(201).json({
			message: 'User deleted'
		})
	})
})

router.post('/data', checkAuth, (req, res, next) => {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		let collection = mongoose.connection.collection('users')
		collection.find({ email: req.body.email	}).toArray((err, data) => {
			if (err) throw err
			res.json(data)
		})
	})
})


module.exports = router