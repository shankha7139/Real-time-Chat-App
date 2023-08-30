const express = require('express')
const { protect } = require('../midleware/authMiddleware')
const { sendMessage, allMessage } = require('../controllers/messageControllers')
const Router = express.Router()

Router.route('/').post(protect,sendMessage)
Router.route('/:chatId').get(protect, allMessage)

module.exports = Router