module.exports = {
  options: {
    version: 0,
    syntax: null,
    commands: [
      "ass", "uwu", "owo",
      "cum", "sex", "boobs",
      "horny", "tits", "titties",
      "boob"
    ]
  },
  config: require('../../../config.js'),
  async execute(client, message, args) {
    message.reply("🍑")
  }
}