// This file is not used, this is to add more than 1 init process

const config = require('./config.js')

require('./bot/index')(config.bot, config)