const config = require("./config")
const schedule = require('node-schedule')
const fs = require('fs');
const request = require("request")

async function setTime(bot) {
  console.log(`已经设定每日任务`);

  let logFolder = config.logFolder;

  schedule.scheduleJob('0 10 8 * * *', async () => {
    getWorkDays().then((resolve) => {
      console.log('记得打上班卡')
      if (resolve === true) {  //打卡
        fs.readFile(logFolder, 'utf8', function (err, data) {
          if (err) {
            console.log('打卡读取文件错误', err)
          } else {
            if (data) {
              let logObj = JSON.parse(data);
              logObj.workList && logObj.workList != 0 && typeof logObj.workList == "object" ?
                logObj.workList.forEach(element => {
                  let nowRoom = bot.Room.load(element);
                  nowRoom.say('记得打上班卡')
                }) : 0;
            } else {
              return
            }

          }
        })
      } else if (resolve === false) {

      }
    })


  });

  schedule.scheduleJob('0 0 18 * * *', async () => {
    getWorkDays().then((resolve) => {
      console.log('记得打下班卡')
      if (resolve === true) {  //打卡
        fs.readFile(logFolder, 'utf8', function (err, data) {
          if (err) {
            console.log('打卡读取文件错误', err)
          } else {
            data = data.trim();
            if (data) {
    
              let logObj = JSON.parse(data);
              logObj.workList && logObj.workList != 0 && typeof logObj.workList == "object" ?
                logObj.workList.forEach(element => {
                  let nowRoom = bot.Room.load(element);
                 
                  nowRoom.say('记得打下班卡')
                }) : 0;
            } else {
              return
            }
    
          }
        })
      } else if (resolve === false) {

      }
    })

  });
}

/**
 * @description 访问天行的接口，是否为工作日
 * @return {Promise} true-是 false-不是  function接口不同再次发送
 */
function getWorkDays() {
  return new Promise((resolve, reject) => {
    let url = `http://api.tianapi.com/txapi/jiejiari/index?key=${config.TXAPIKEY}`
    console.log('地址', url)
    request(
      url
      , (error, response, body) => {
        console.log(error)
        if (!error && response.statusCode == 200) {
          try {
            let res = JSON.parse(body)
            if (res.msg == 'success') {
              if (res.newslist[0].isnotwork == 1) {  //是休息日，不用打卡
                resolve(false);
              } else {
                resolve(true);
              }

            } else {
              console.log('工作日接口返回失败')
              resolve(false);  //失败，返回函数再次调用
            }
          } catch (error) {
            console.log('工作日接口返回失败', error)
            resolve(false);  //失败，返回函数再次调用
          }

        } else {
          console.log('工作日接口返回失败', error)
          resolve(false);  //失败，返回函数再次调用
        }
      })
  })
}
module.exports = setTime


//时间参数：
//其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解    *代表通配符
//
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'