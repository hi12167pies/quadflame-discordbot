let session_logs = []
const fs = require('fs')

module.exports = (text) => {
  let t = text
  const date = new Date().toLocaleString()
  if (typeof text == "object") t = JSON.stringify(text, null, "  ")
  session_logs.push({
    timestamp: Date.now(),
    time: date,
    event: t
  })
  console.log(`[${date}] ${t}`)
}
const path = require('path')
process.on("SIGINT", () => {
  fs.writeFileSync(path.join(__dirname, `../logs/${Date.now()}.log`), JSON.stringify(session_logs, null, "  "))
  process.exit()
})