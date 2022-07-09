import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import axios from 'axios'

const PORT = 2000

axios.defaults.baseURL = process.env.MC_SERVER_URL
axios.defaults.headers.common['key'] = process.env.API_KEY

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('にゃ')
})

const allowedGets = [
  '/ping',
  '/scoreboard',
  '/server',
  '/worlds',
  '/worlds/1ffd8169-5763-495d-9634-b1ae4747400e',
  '/server/whitelist',
  '/plugins',
  // '/players',
  //'/players/all',
]

const allowedPosts = []

app.get('/players/all', (req, res) => {
  console.log(`get /players/all (filtered) from ${req.ip}`)
  axios.get('/players/all').then((r) => {
    res.send(r.data.map((player) => {
        delete player.uuid
        return player
      }))
  })
})

app.get('/players', (req, res) => {
  console.log(`get /players (filtered) from ${req.ip}`)
  axios.get('/players').then((r) => {
    /**
     * dimension
     * - NORMAL
     * - NETHER
     */
    res.send(r.data.map((player) => {
        delete player.uuid
        delete player.address
        delete player.port
        return player
      }))
  })
})

for (let a of allowedGets) {
  app.get(a, (req, res) => {
    console.log(`get ${a} from ${req.ip}`)
    axios
      .get(a)
      .then((r) => {
        res.send(r.data)
      })
      .catch((e) => {
        console.log(e)
      })
  })
}

for (let a of allowedPosts) {
  app.post(a, (req, res) => {
    console.log(`post ${a} from ${req.ip}`)
    axios.get(a).then((r) => {
      res.send(r.data)
    })
  })
}

app.post('/server/exec/set-morning', (req, res) => {
  console.log(`post /server/exec/set-morning from ${req.ip}`)
  const params = new URLSearchParams({ command: 'time set 0', time: '1' })
  axios
    .post('/server/exec', params)
    .then((r) => {
      res.send(r.data)
    })
    .catch((e) => {
      console.log(e)
    })
})

app.post('/server/exec/weather-clear', (req, res) => {
  console.log(`post /server/exec/weather-clear from ${req.ip}`)
  const params = new URLSearchParams({ command: 'weather clear', time: '1' })
  axios
    .post('/server/exec', params)
    .then((r) => {
      res.send(r.data)
    })
    .catch((e) => {
      console.log(e)
    })
})

app.post('/server/exec/weather-rain', (req, res) => {
  console.log(`post /server/exec/weather-clear from ${req.ip}`)
  const params = new URLSearchParams({ command: 'weather rain', time: '1' })
  axios
    .post('/server/exec', params)
    .then((r) => {
      res.send(r.data)
    })
    .catch((e) => {
      console.log(e)
    })
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
