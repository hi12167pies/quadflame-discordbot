const {MessageEmbed} = require('discord.js')
module.exports = {
  async execute(client, message, config, conf) {
    if (message.author.bot || !message.content.startsWith(config.prefix)) return
    // COMMAND MAIN
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    config.files.forEach(file => {
      const f = require(`./commands/${file}`)
      if (f.options.commands.includes(cmd)) {
        if (f.options.syntax != null) {
          const syntax = f.options.syntax.split(', ')
          if (syntax.length != args.length) {
            let syn = []
            syntax.forEach(e => {
              syn.push(`<${e}>`)
            })
            message.reply(`Invaild syntax try: ${syn.join(" ")}`)
            return
          }
        }
        f.execute(client, message, args)
      }
    })
  }
}