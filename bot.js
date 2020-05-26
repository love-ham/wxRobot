// bot.js

 

const { Wechaty } = require("wechaty") // Wechaty核心包
const { ScanStatus } = require("wechaty-puppet") // padplus协议包
const { PuppetPadplus } = require("wechaty-puppet-padplus") // Wechaty核心包
const  QrcodeTerminal  = require("qrcode-terminal") // padplus协议包

const token = 'puppet_padplus_ab5b3df337639111'
 
const puppet = new PuppetPadplus({
  token,
})
 
const name  = 'your-bot-name'
 
const bot = new Wechaty({
  puppet,
  name, // generate xxxx.memory-card.json and save login data for the next login
})
 
bot
  .on('scan', (qrcode, status) => {
    if (status === ScanStatus.Waiting) {
      QrcodeTerminal.generate(qrcode, {
        small: true
      })
    }
  })
  .on('message', msg => {
    console.log(`msg : ${msg}`)
  })
  .start()