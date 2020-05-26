

module.exports = {
  token: "",  //申请的token
  
  name: "小助手",  // 机器人名字
  // 房间/群聊
  room: {
    // 管理群组列表
    roomList: {
      // 群名(用于展示，最好是群名，可随意) : 群id(这个可不能随意)
      Web圈: "*****@chatroom",   //id可以把群二维码用草料二维码 解析一下就是id了
      男神群: "*****@chatroom"
    },
    // 加入房间回复
    roomJoinReply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`
  },
  // 私人
  personal: {
    // 好友验证自动通过关键字
    addFriendKeywords: ["加群", "前端"],
    // 是否开启加群
    addRoom: true
  },
  baseFolder: './File', //文件存放路径
  TXAPIKEY: '',  //天行appid            https://www.tianapi.com/list/   免费的接口，自己申请
  logFolder : './log/config.log'  //运行时部分数据存放的地址
}
