module.exports = async (config, conf) => {
  const fs = require('fs')
  const discord = require('discord.js')
  const client = new discord.Client({ intents: config.intents })
  client.on('ready', () => {
    conf.logger(`Bot logged in and ready as ${client.user.tag}`)
  })
  const handler = require('./events/message.js')
  client.on('messageCreate', msg => {
    handler.execute(client, msg, config, conf)
  })
  client.login(config.token)
}