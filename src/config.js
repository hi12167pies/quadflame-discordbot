const fs = require('fs')
const config = {
  bot: {
    token: 'SuperSecrectToken',
    prefix: '=',
    intents: [ 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILDS' ],
    files: fs.readdirSync('./src/bot/events/commands/').filter(f => f.endsWith(".js"))
  },
  fastbridge: {
    path: "../server/plugins/Skript/variables.csv"
  },
  msgs: {
    no_cmd: "Could not find that command."
  },
  logger: require('./log.js')
}
module.exports = config