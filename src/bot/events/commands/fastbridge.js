const fs = require('fs')
const path = require('path')
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
module.exports = {
  options: {
    version: 0,
    syntax: "player, mode",
    commands: [
      "fb",
      "fastbridger",
      "fastbridge"
    ]
  },
  config: require('../../../config.js'),
  async execute(client, message, args) {
    try {
      const uuid = await this.getId(args[0], message)
      const res = await this.findUser(uuid, args[1], message)
      const plain = res[0]
      if (typeof plain == "string") {
        const pb = await Buffer.from(plain.slice(1), "hex").toString("utf-8").slice(2)
        this.config.logger({
          type: "DATABASE_QUERY",
          from: message.author.tag,
          player: args[0],
          uuid: uuid,
          data: { mode: res[1], pb: pb }
        })
        message.reply({embeds:[
          new MessageEmbed()
            .setTitle(`${args[0]}'s Personal best`)
            .setDescription(`Mode: ${res[1]}\nBest: ${this.convertInt(pb)}`)
            .setThumbnail(`https://crafatar.com/avatars/${uuid}`)
            .setColor('BLURPLE')
        ]})
      }
    } catch (e) { console.log(e) }
  },
  findUser(uuid, mode, message) {
    const promise = new Promise((resolve, reject) => {
      const p = path.join(__dirname, "../../../../" + this.config.fastbridge.path)
      fs.readFile(p, 'utf-8', (err, data) => {
        if (err) {
          reject(err)
          return
        }
        const ln = data.split('\r\n')
        let final = ln.filter(l => l.includes(`fbstr::${uuid}::${mode}`))
        if (final.length == 0 || !final[final.length-1]) {
          reject()
          return message.reply({ embeds: [ new MessageEmbed().setTitle('Player does not have a personal best for that mode.').setColor('RED') ] })
        }
        const f = final[final.length-1]
        const split = f.split(',')[2]
        if (split == undefined) {
          reject()
          return message.reply({ embeds: [ new MessageEmbed().setTitle('Player does not have a personal best for that mode.').setColor('RED') ] })
        }
        let mo = f.split(',')[0].split("::")[2]
        resolve([split, mo])
      })
    })
    return promise
  },
  dashUUID(uuid) {
    let c1 = uuid.split('')
    c1.splice(8, 0, "-")
    c1.splice(13, 0, "-")
    c1.splice(18, 0, "-")
    c1.splice(23, 0, "-")
    return c1.join('')
  },
  getId(playername, message) {
    const dashUUID = this.dashUUID
    return new Promise((resolve, reject) => {
      axios.get(`https://api.mojang.com/users/profiles/minecraft/${playername}`).then(function (res) {
        const data = res.data
        if (!data) {
          message.reply({ embeds: [ new MessageEmbed().setTitle('Could not find that player.').setColor('RED') ] })
          reject()
          return
        }
        resolve(dashUUID(data.id))
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  convertInt(number) {
    let n = `${number}`
    if (n.length == 3) {
      n += "0"
    } else if (n.length == 2) {
      n += "00"
    } else {
      n += ".00" 
    }
    return n
  }
}