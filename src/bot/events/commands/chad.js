const fs = require('fs')
module.exports = {
  options: {
    version: 0,
    syntax: null,
    commands: [
      "truegamer", "chad", "willem", "willemface", "exposed"
    ]
  },
  config: require('../../../config.js'),
  async execute(client, message, args) {
    message.reply({
      files: [{
        attachment: "https://ftp.hipies.repl.co/f/chad.webp",
        name: 'chad.png'
      }]
    })
  }
}