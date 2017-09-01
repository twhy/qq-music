const express = require('express')
const request = require('request-promise')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4000

const HEADERS = {
  'accept': 'application/json',
  'authority': 'c.y.qq.com',
  'origin': 'https://m.y.qq.com',
  'referer': 'https://m.y.qq.com/',
  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
}

app.use(cors())

app.get('/', async (req, res) => {
  const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`
  try {
    res.json(await request({
      uri: url,
      json: true,
      headers: HEADERS
    }))
  } catch(e) {
    res.json({ error: e.message })
  }
})

app.get('/search', async (req, res) => {
  const { keyword, page = 1 } = req.query
  const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${+new Date()}`
  try {
    res.json(await request({
      uri: url,
      json: true,
      headers: HEADERS
    }))
  } catch(e) {
    res.json({ error: e.message })
  }
})

app.get('/hotkey', async (req, res) => {
  const url = `https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+new Date()}`
  try {
    res.json(await request({
      uri: url,
      json: true,
      headers: HEADERS
    }))
  } catch(e) {
    res.json({ error: e.message })
  }
})

app.listen(PORT)